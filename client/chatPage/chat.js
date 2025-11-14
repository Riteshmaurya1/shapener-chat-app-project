const messageLink = `http://localhost:3000/message`;

async function handleSubmit(event) {
  event.preventDefault();

  const messageInput = document.getElementById("messageInput");

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
    alert(response.data.message);
  } catch (error) {
    console.log(error.response);
  }
  event.target.reset();
}
