function goToHome() {
	console.log("clicked");
	window.location.href = "../matchmaking/matchmaking.html";
}

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const loginButton = document.querySelector('.login100-form-btn');
loginButton.addEventListener('click', loginUser);

function loginUser(event) {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(users => {
      const user = users.find(u => u.email === email);
	  
	const toastModalError = document.getElementById("errorToast");
  	const toastError = bootstrap.Toast.getOrCreateInstance(toastModalError);
      if (user && user.password === password) {
    
        console.log('Inicio de sesión exitoso');
		storeInCookies('userId', user.id);
        storeInCookies('userEmail', user.email);
        storeInCookies('userName', user.nickname);
		goToHome();
       
      } else {
		toastError.show();
        
        console.log('Error: Credenciales inválidas');
        
      }
    })
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



