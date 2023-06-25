window.onload = () => {
	let id = getFromCookies("userId");
	let email = getFromCookies("userEmail");
	let userName = getFromCookies("userName");
  
	if (id != null && email != null && userName != null) {
	  goToHome();
	}
  }
  
  function goToHome() {
	window.location.href = "../matchmaking/matchmaking.html";
  }
  
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  
  const loginButton = document.querySelector(".login100-form-btn");
  loginButton.addEventListener("click", loginUser);
  
  function loginUser(event) {
	event.preventDefault();
  
	const email = emailInput.value.toLowerCase(); // Convertir a minúsculas
	const password = passwordInput.value;
  
	fetch("http://localhost:3000/users")
	  .then((response) => response.json())
	  .then((users) => {
		const user = users.find((u) => u.email.toLowerCase() === email); // Convertir a minúsculas
  
		const toastModalError = document.getElementById("errorToast");
		const toastError = bootstrap.Toast.getOrCreateInstance(toastModalError);
		const toastModalBan = document.getElementById("banToast");
		const toastBan = bootstrap.Toast.getOrCreateInstance(toastModalBan);
  
		if (user) {
		  if (user.isBanned) {
			toastBan.show();
		  } else if (user.password === password) {
			storeInCookies("userId", user.id);
			storeInCookies("userEmail", user.email);
			storeInCookies("userName", user.nickname);
			storeInCookies("isAdmin", user.isAdmin);
			goToHome();
		  } else {
			toastError.show();
		  }
		} else {
		  toastError.show();
		}
	  });
  }
  
  function storeInCookies(key, value) {
	localStorage.setItem(key, value);
  }
  
  function getFromCookies(key) {
	return localStorage.getItem(key);
  }
  
  function deleteFromCookies(key) {
	localStorage.removeItem(key);
  }
  