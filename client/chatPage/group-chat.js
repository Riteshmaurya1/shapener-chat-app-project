const messageLink = `http://localhost:3000/message`;

const messageInput = document.getElementById("messageInput");
const chatMessages = document.getElementById("chatMessages");

// Find token inside the localstorage
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "../signIn/signin.html";
}

// make variabe for storing groupName for emiting at server
let currentGroupName;

// Asscessing socket from backend
const socket = io("ws://localhost:3000", { auth: { token } });

// it is for the public group chat and listen for group messages
socket.on("group-messages", (data) => {
  console.log(data);
  addMessage(data.message, "Received");
});

// if user is leave room
socket.on("disconnect", () => {
  alert("Disconnected from server");
});

// Send message to the DB and socket backend.
async function handleSubmit(event) {
  event.preventDefault();

  const message = messageInput.value.trim();
  if (!message) return;

  try {
    const response = await axios.post(
      `${messageLink}/send`,
      { message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // it is for the public group chat
    socket.emit("group-messages", {
      message,
      groupName: currentGroupName,
    });

    addMessage(message, "Sent");
    alert(response.data.message);
  } catch (error) {
    console.log(error.response);
  }
  event.target.reset();
}

// get Message from database
async function fetchdata() {
  try {
    const response = await axios.get(`${messageLink}/receive`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const messages = response.data.messages || [];
    const messageType = response.data.message;
    console.log(messageType);

    messages.forEach((msg) => {
      addMessage(msg.message, messageType);
    });
  } catch (error) {
    console.log(error.response);
  }
}
fetchdata();

// Add message to the UI
function addMessage(text, type) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", type);

  messageDiv.innerHTML = `
    <p>${text}</p>
  `;

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Enter the group name
async function handleSearch(event) {
  event.preventDefault();

  const groupName = event.target.search.value.trim();
  if (!groupName) return;
  try {
    // it is for the public group chat
    socket.emit("group-chat", { groupName });
    currentGroupName = groupName;
    alert("Room we join: " + groupName);
  } catch (error) {
    alert("Error facing joinig Room: " + error.response.data.message);
    console.log(error.response.data.message);
  }

  event.target.reset();
}

// ******************* Chat Switcher ***************** //
const chatSwitcher = document.getElementById("chat-switcher");
chatSwitcher.addEventListener("click", () => {
  window.location.href = "./chat.html";
});

// current User
const usernameIndicator = document.getElementById("username-indicator");
usernameIndicator.textContent = `${localStorage.getItem("username")}`;
