const messageLink = `/message`;
const emailVerificationLink = `/user`;
const allUsers = `/user`;

const messageInput = document.getElementById("messageInput");
const chatMessages = document.getElementById("chatMessages");
const userBox = document.getElementById("users-box");
const chatHeaderTitle = document.querySelector('.chat-header h2');
const fileInput = document.getElementById("file-input");
const filePreviewContainer = document.getElementById("file-preview-container");
const filePreview = document.getElementById("file-preview");
const removeFileBtn = document.getElementById("remove-file-btn");
const backBtn = document.getElementById("back-btn");

if (backBtn) {
  backBtn.addEventListener("click", () => {
    document.body.classList.remove("mobile-chat-active");
    // currentChatType = null; // Uncomment if you want to disconnect socket room logic
  });
}

function showMobileChat() {
  document.body.classList.add("mobile-chat-active");
}

let selectedFile = null;

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    selectedFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      filePreview.src = e.target.result;
      filePreviewContainer.style.display = "flex";
    };
    reader.readAsDataURL(file);
  }
});

removeFileBtn.addEventListener("click", () => {
  selectedFile = null;
  fileInput.value = "";
  filePreview.src = "";
  filePreviewContainer.style.display = "none";
});

async function handleSubmit(event) {
  event.preventDefault();

  const message = messageInput.value.trim();
  if (!currentChatType) {
    alert("Please select a user or group to chat with.");
    return;
  }
  if (!message && !selectedFile) return;

  try {
    let attachmentUrl = null;

    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const uploadRes = await axios.post(`/file/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      attachmentUrl = uploadRes.data.fileUrl;
    }

    const payload = {
      message: message || null,
      attachmentUrl: attachmentUrl || null
    };

    if (currentChatType === 'private') {
      payload.receiverId = currentReceiverId;
    } else {
      payload.groupId = currentGroupId;
    }

    await axios.post(
      `${messageLink}/send`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const socketPayload = {
      message: message || null,
      attachmentUrl: attachmentUrl || null,
      roomName: currentRoomName,
      groupName: currentGroupId
    };

    if (currentChatType === 'private') {
      socket.emit("new-message", socketPayload);
    } else {
      socket.emit("group-messages", socketPayload);
    }

    addMessage(message, "Sent", null, attachmentUrl);

    selectedFile = null;
    fileInput.value = "";
    filePreviewContainer.style.display = "none";
    messageInput.value = "";

  } catch (error) {
    console.log(error);
    alert("Failed to send message/file");
  }
}

let currentChatType = null;
let currentReceiverId = null;
let currentReceiverUsername = null;
let currentRoomName = null;

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "../signIn/signin.html";
}

const socket = io(window.location.origin, { auth: { token } });

socket.on("new-message", (data) => {
  addMessage(data.message, "Received", data.username, data.attachmentUrl);
});

socket.on("group-messages", (data) => {
  if (currentChatType === 'group') {
    addMessage(data.message, "Received", data.username, data.attachmentUrl);
  }
});

let onlineUserIds = new Set();

socket.on("active-users", (onlineIds) => {
  onlineIds.forEach(id => {
    onlineUserIds.add(id);
    updateUserStatus(id, "online");
  });
});

socket.on("user-status", ({ userId, status }) => {
  if (status === 'online') onlineUserIds.add(userId);
  else onlineUserIds.delete(userId);

  updateUserStatus(userId, status);
});

socket.on("typing", ({ userId, groupId }) => {
  if (groupId && currentChatType === 'group') {
    showTypingIndicator(userId, true);
  } else if (currentChatType === 'private' && userId === currentReceiverId) {
    showTypingIndicator(userId, false);
  }
});

socket.on("stop-typing", ({ userId, groupId }) => {
  if (groupId && currentChatType === 'group') {
    hideTypingIndicator();
  } else if (currentChatType === 'private' && userId === currentReceiverId) {
    hideTypingIndicator();
  }
});

socket.on("new-group-invite", () => {
  fetchMyGroups();
});

function updateUserStatus(userId, status) {
  const userCard = document.querySelector(`.users-cards[data-id="${userId}"]`);
  if (userCard) {
    const dot = userCard.querySelector('.status-dot');
    if (dot) {
      dot.className = `status-dot ${status}`;
    }
  }

  if (currentChatType === 'private' && userId === currentReceiverId) {
    const headerStatus = document.getElementById('header-status');
    if (headerStatus) {
      headerStatus.textContent = status.charAt(0).toUpperCase() + status.slice(1);
      headerStatus.className = `header-status ${status}`;
    }
  }
}

function showTypingIndicator(userId, isGroup) {
  const headerStatus = document.getElementById('header-status');
  if (!headerStatus) return;

  if (isGroup) {
    headerStatus.textContent = "Someone is typing...";
  } else {
    headerStatus.textContent = "Typing...";
  }
  headerStatus.classList.add('typing');
}

function hideTypingIndicator() {
  const headerStatus = document.getElementById('header-status');
  if (!headerStatus) return;

  headerStatus.classList.remove('typing');

  if (currentChatType === 'private') {
    const isOnline = onlineUserIds.has(currentReceiverId);
    const status = isOnline ? 'online' : 'offline';
    headerStatus.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    headerStatus.className = `header-status ${status}`;
  } else {
    headerStatus.textContent = '';
    headerStatus.className = `header-status`;
  }
}

let typingTimeout = null;

messageInput.addEventListener('input', () => {
  if (!currentChatType) return;

  if (currentChatType === 'private') {
    socket.emit('typing', { receiverId: currentReceiverId });
  } else {
    socket.emit('typing', { groupId: currentGroupId || 'public-group-chat' });
  }

  if (typingTimeout) clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    if (currentChatType === 'private') {
      socket.emit('stop-typing', { receiverId: currentReceiverId });
    } else {
      socket.emit('stop-typing', { groupId: currentGroupId || 'public-group-chat' });
    }
  }, 1000);
});

async function fetchMessages() {
  const loader = document.getElementById("loading-spinner");
  if (loader) {
    loader.style.display = "flex";
    if (window.lucide) window.lucide.createIcons(); // Initialize the loader icon if needed
  }

  try {
    let url = `${messageLink}/receive`;
    if (currentChatType === 'private') {
      url += `?receiverId=${currentReceiverId}`;
    } else {
      const groupId = currentGroupId || 'public-group-chat';
      url += `?groupId=${groupId}`;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // Artificial delay to ensure loader is visible (better UX)
    await new Promise(resolve => setTimeout(resolve, 500));

    const messages = response.data.messages || [];
    const aiReplies = response.data.aiReplies || [];

    chatMessages.innerHTML = '';

    messages.forEach((msg) => {
      const type = (msg.userId === localStorage.getItem('userId')) ? 'Sent' : 'Received';
      const username = msg.User ? msg.User.username : (msg.username || 'Unknown');
      addMessage(msg.message, type, username, msg.attachmentUrl);
    });

    // Re-init icons for messages
    if (window.lucide) window.lucide.createIcons();

  } catch (error) {
    console.log(error);
  } finally {
    if (loader) loader.style.display = "none";
  }
}

function addMessage(text, type, username, attachmentUrl) {
  const messageDiv = document.createElement("div");
  const className = (type === 'Sent' || type === 'Received') ? type : 'Received';

  messageDiv.classList.add("message", className);

  let userBadge = '';
  if (currentChatType === 'group' && username) {
    userBadge = `<span class="user-badge">${username}</span>`;
  }

  let imageHtml = '';
  if (attachmentUrl) {
    imageHtml = `<img src="${attachmentUrl}" alt="image" onclick="window.open(this.src)">`;
  }

  let textHtml = '';
  if (text) {
    textHtml = `<p>${text}</p>`;
  }

  messageDiv.innerHTML = `
    ${userBadge}
    ${imageHtml}
    ${textHtml}
  `;

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

window.addEventListener("DOMContentLoaded", async () => {

  if (!document.getElementById('typing-indicator')) {
    const headerDiv = document.querySelector('.chat-header div');
    const typingSpan = document.createElement('span');
    typingSpan.id = 'typing-indicator';
    typingSpan.style.fontSize = '12px';
    typingSpan.style.color = '#888';
    typingSpan.style.fontStyle = 'italic';
    typingSpan.style.visibility = 'hidden';
    typingSpan.textContent = 'Typing...';
    headerDiv.appendChild(typingSpan);
  }

  const chatTitle = document.getElementById('chat-title') || document.querySelector('.chat-header h2');
  if (chatTitle) chatTitle.textContent = "Select a Chat";

  const headerStatus = document.getElementById('header-status');
  if (headerStatus) headerStatus.textContent = "";

  chatMessages.innerHTML = '';

  try {
    const response = await axios.get(`${allUsers}/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const users = response.data.users;
    userBox.innerHTML = '';

    users.forEach((user) => {
      if (user.username === localStorage.getItem("username")) {
        localStorage.setItem('userId', user.id);
        return;
      }

      let pTag = document.createElement("div");
      pTag.classList.add("users-cards");
      pTag.dataset.id = user.id;

      const initialStatus = onlineUserIds.has(user.id) ? 'online' : 'offline';
      pTag.innerHTML = `<span class="status-dot ${initialStatus}"></span> ${user.username}`;

      pTag.addEventListener('click', () => {
        startPrivateChat(user.id, user.email, user.username);
      });

      userBox.appendChild(pTag);
    });
  } catch (error) {
    console.log(error);
  }

  const usernameIndicator = document.getElementById("username-indicator");
  usernameIndicator.textContent = `${localStorage.getItem("username")}`;

  fetchMyGroups();
});

function switchToGroupChat() {
  currentChatType = 'group';
  currentReceiverId = null;
  currentReceiverUsername = null;

  const chatTitle = document.getElementById('chat-title') || document.querySelector('.chat-header h2');
  if (chatTitle) chatTitle.textContent = "Global Group Chat";

  const headerStatus = document.getElementById('header-status');
  if (headerStatus) {
    headerStatus.textContent = "";
    headerStatus.className = "header-status";
  }

  fetchMessages();
}

function startPrivateChat(id, email, username) {
  currentChatType = 'private';
  currentReceiverId = id;
  currentReceiverUsername = username;
  currentGroupId = null;

  const myEmail = localStorage.getItem("email");
  const roomName = [myEmail, email].sort().join("-");
  currentRoomName = roomName;

  const chatTitle = document.getElementById('chat-title') || document.querySelector('.chat-header h2');
  if (chatTitle) chatTitle.textContent = `Chat with ${username}`;

  const headerStatus = document.getElementById('header-status');
  if (headerStatus) {
    const isOnline = onlineUserIds.has(id);
    const status = isOnline ? 'online' : 'offline';
    headerStatus.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    headerStatus.className = `header-status ${status}`;
  }

  socket.emit("join-room", { roomName });
  showMobileChat();
  fetchMessages();
}

function startGroupChat(groupId, groupName) {
  currentChatType = 'group';
}

const groupModal = document.getElementById("group-modal");
const createGroupBtn = document.getElementById("create-group-btn");
const closeBtn = document.querySelector(".close-btn");
const submitGroupBtn = document.getElementById("submit-group-btn");
const groupNameInput = document.getElementById("group-name-input");
const modalUsersList = document.getElementById("modal-users-list");

createGroupBtn.addEventListener("click", () => {
  groupModal.style.display = "block";
  populateUserCheckboxes();
});

closeBtn.onclick = () => groupModal.style.display = "none";
window.onclick = (event) => {
  if (event.target == groupModal) groupModal.style.display = "none";
};

async function populateUserCheckboxes() {
  try {
    const response = await axios.get(`${allUsers}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const users = response.data.users;
    modalUsersList.innerHTML = '';

    users.forEach(user => {
      if (user.username === localStorage.getItem("username")) return;

      const div = document.createElement("div");
      div.className = "user-checkbox-item";
      div.innerHTML = `
                <input type="checkbox" value="${user.id}" id="user-${user.id}">
                <label for="user-${user.id}">${user.username}</label>
            `;
      modalUsersList.appendChild(div);
    });
  } catch (e) {
    console.error(e);
  }
}

submitGroupBtn.addEventListener("click", async () => {
  const name = groupNameInput.value.trim();
  const checkboxes = modalUsersList.querySelectorAll('input[type="checkbox"]:checked');
  const memberIds = Array.from(checkboxes).map(box => box.value);

  if (!name || memberIds.length === 0) {
    alert("Please enter a name and select at least one member.");
    return;
  }

  try {
    await axios.post('/group/create', { name, memberIds }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    socket.emit("add-members", { memberIds });

    groupModal.style.display = "none";
    groupNameInput.value = "";

    fetchMyGroups();
    alert("Group created successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to create group");
  }
});

async function fetchMyGroups() {
  try {
    const response = await axios.get('/group/getmygroups', {
      headers: { Authorization: `Bearer ${token}` }
    });

    const groups = response.data.groups;
    const groupsBox = document.getElementById("groups-box");

    groupsBox.innerHTML = '';

    groups.forEach(group => {
      const div = document.createElement("div");
      div.classList.add("users-cards", "custom-group-card");
      div.style.display = "flex";
      div.style.justifyContent = "space-between";
      div.style.alignItems = "center";

      div.innerHTML = `<span># ${group.name}</span>`;

      const myId = localStorage.getItem('userId');
      if (group.creatorId === myId) {
        // Use innerHTML for icon
        deleteBtn.innerHTML = '<i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>';
        deleteBtn.className = "group-delete-btn"; // Add class for styling if needed
        deleteBtn.style.background = "none";
        deleteBtn.style.border = "none";
        deleteBtn.style.cursor = "pointer";
        deleteBtn.style.color = "#ef4444";
        deleteBtn.title = "Delete Group";
        deleteBtn.onclick = (e) => {
          e.stopPropagation();
          if (confirm(`Delete group "${group.name}"?`)) {
            deleteGroup(group.id);
          }
        };
        div.appendChild(deleteBtn);
      }

      div.addEventListener("click", () => {
        joinCustomGroup(group.id, group.name);
      });
      groupsBox.appendChild(div);
    });

    // re-initialize icons for the new delete buttons
    if (window.lucide) window.lucide.createIcons();

  } catch (error) {
    console.error(error);
  }
}

async function deleteGroup(groupId) {
  try {
    await axios.delete(`/group/delete/${groupId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Group deleted");
    fetchMyGroups();
    if (currentGroupId === groupId) {
      switchToGroupChat();
    }
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Failed to delete group");
  }
}

let currentGroupId = null;

function joinCustomGroup(groupId, groupName) {
  currentChatType = 'group';
  currentGroupId = groupId;
  currentReceiverId = null;
  currentReceiverUsername = null;

  const chatTitle = document.getElementById('chat-title') || document.querySelector('.chat-header h2');
  if (chatTitle) chatTitle.textContent = `${groupName}`;

  const headerStatus = document.getElementById('header-status');
  if (headerStatus) {
    headerStatus.textContent = "";
    headerStatus.className = "header-status";
  }

  socket.emit("join-group", { groupId });

  socket.emit("group-chat", { groupName: groupId });
  showMobileChat();
  fetchMessages();
}
