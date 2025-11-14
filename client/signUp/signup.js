const signUpAPI = ``;
function handleSignupForm(event) {
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

  window.location.href = "/client/signIn/signin.html";

  console.log(signUpData);
}
