const messageLink = `http://localhost:3000/message`;
const messageInput = document.getElementById("messageInput");
const chatMessages = document.getElementById("chatMessages");

// Web socket server link
const socket = new WebSocket("ws://localhost:3000");

// confirm web socket connection successfull.
socket.onopen = () => {
  console.log("WebSocket connected");
};

// get message from web socket
socket.onmessage = async (event) => {
  const data = await event.data.text();
  addMessage(data, "Received");
};

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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // Send message to the socket
    socket.send(message);

    addMessage(message, "Sent");
    alert(response.data.message);
  } catch (error) {
    console.log(error.response);
  }
  event.target.reset();
}
// window.addEventListener("DOMContentLoaded", async () => {
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
      addMessage(msg.message, messageType); // type = 'sent' or 'received'
    });
  } catch (error) {
    console.log(error.response);
  }
}

function addMessage(text, type) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", type);

  messageDiv.innerHTML = `
    <p>${text}</p>
  `;

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
