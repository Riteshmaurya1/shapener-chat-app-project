const signUpAPI = `http://localhost:3000`;
async function handleSignupForm(event) {
  event.preventDefault();

  const username = event.target.username.value.trim();
  const email = event.target.email.value.trim();
  const phoneNumber = event.target.phoneNumber.value.trim();
  const password = event.target.password.value.trim();

  const signUpData = {
    username,
    email,
    phoneNumber,
    password,
  };

  try {
    const response = await axios.post(`${signUpAPI}/user/signup`, signUpData);
    if (response.status === 200 || response.status === 201) {
      alert(`Sign Up Successful! Welcome`);
      window.location.href = "../signIn/signin.html";
    } else {
      alert("Sign Up Failed. Please try again.");
    }
  } catch (error) {
    console.log(error);
  }
}
