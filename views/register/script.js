function validateForm() {
  var nickname = document.getElementById("nickname").value;
  var email = document.getElementById("email").value;
  var password1 = document.getElementById("password1").value;
  var password2 = document.getElementById("password2").value;

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var passwordRegex = /^(?=.*[A-Z]).{8,}$/;

  var registerButton = document.getElementById("register-button");
  registerButton.disabled = true;

  if (nickname.trim() === "") {
    alert("Please enter a nickname.");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (password1 === password2) {
    if (passwordRegex.test(password1)) {
      showPasswordIndicator(true);
      registerButton.disabled = false;
      alert("Passwords match and meet the requirements!");
    } else {
      showPasswordIndicator(false);
      alert("The password must have at least 8 characters and one uppercase letter.");
    }
  } else {
    showPasswordIndicator(false);
    alert("Passwords do not match. Please try again.");
  }
}

function showPasswordIndicator(valid) {
  var indicator = document.getElementById("password-indicator");
  
  if (valid) {
    indicator.style.color = "green";
    indicator.textContent = "Password meets the requirements.";
  } else {
    indicator.style.color = "red";
    indicator.textContent = "Password must have at least 8 characters and one uppercase letter.";
  }
}
