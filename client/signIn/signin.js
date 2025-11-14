const signinAPI = `http://localhost:3000`;
async function handleSigninForm(event) {
  event.preventDefault();

  const email = event.target.email.value.trim();
  const password = event.target.password.value.trim();

  const signInData = {
    email,
    password,
  };

  try {
    const response = await axios.post(`${signinAPI}/user/signin`, signInData);
    localStorage.setItem("token", response?.data?.token);

    if (response.status === 200 || response.status === 201) {
      alert(`Sign In Successful! Welcome`);
      window.location.href = "../chatPage/chat.html";
    } else {
      alert("Sign In Failed. Please try again.");
    }
  } catch (error) {
    console.log(error.response);
  }
}
