function handleSubmit(event) {
  event.preventDefault();

  const chatMessages = document.getElementById("chatMessages");
  const messageInput = document.getElementById("messageInput");

  const msg = messageInput.value.trim();
  if (!msg) return;
  //   simulate sender or receiser
  var msgType;
  if (Math.random() > 0.5) {
    msgType = "sent";
  } else {
    msgType = "received";
  }

  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", `${msgType}`);
  messageDiv.innerHTML = `
    <p>${msg}</p>
    <span class="timestamp">
      ${new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </span>
  `;

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  messageInput.value = "";
}
