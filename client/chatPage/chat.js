const messageLink = `http://localhost:3000/message`;
const emailVerificationLink = `http://localhost:3000/user`;

const messageInput = document.getElementById("messageInput");
const chatMessages = document.getElementById("chatMessages");

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "../signIn/signin.html";
}

const socket = io("ws://localhost:3000", { auth: { token } });

// receive messages via socket.io
socket.on("new-message", (data) => {
  addMessage(data.message, "Received");
});

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
    // Send via socket.io
    socket.emit("new-message", { message, roomName: window.roomName });
    addMessage(message, "Sent");
    alert(response.data.message);
  } catch (error) {
    console.log(error.response);
  }
  event.target.reset();
}
window.addEventListener("DOMContentLoaded", async () => {
  // async function fetchdata() {
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
      addMessage(msg.message, messageType); // type = 'sent' or 'received'
    });
  } catch (error) {
    console.log(error.response);
  }
});

function addMessage(text, type, username = "Ritesh") {
  const name = username.split("")[1];
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", type);

  messageDiv.innerHTML = `
    <p>${text}</p>
  `;

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ************ Search Input *****************//
async function handleSearch(event) {
  event.preventDefault();

  const myEmail = localStorage.getItem("email");
  const meetingEmail = event.target.search.value.trim();

  const roomName = [myEmail, meetingEmail].sort().join("-");

  try {
    const response = await axios.post(
      `${emailVerificationLink}/all`,
      { email: meetingEmail },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    window.roomName = roomName;
    socket.emit("join-room", { roomName });
    alert("Room we join: " + roomName);
    console.log(response?.data?.verifiedEmail?.email);
  } catch (error) {
    alert("Error facing joinig Room: " + error.response.data.message);
    console.log(error.response.data.message);
  }

  event.target.reset();
}
