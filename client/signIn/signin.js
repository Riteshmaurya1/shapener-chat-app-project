const signinAPI = ``;
function handleSigninForm(event) {
  event.preventDefault();

  const email = event.target.email.value.trim();
  const password = event.target.password.value.trim();

  const signInData = {
    email,
    password,
  };

  

  // window.location.href = "";

  console.log(signInData);
}
