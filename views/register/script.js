function validateForm() {
  event.preventDefault();
  const toastModalSuccess = document.getElementById("successToast");
  const toastSuccess = bootstrap.Toast.getOrCreateInstance(toastModalSuccess);

  if(validateFields()){
    const newUser = {
      "nickname": getNickname(),
      "email": getEmail(),
      "password": getPassword1(),
      "mmr": 1000,
      "region": "SAM",
      "rank": "Silver",
      "division": "5"
    };
    toastSuccess.show();
    storeUser(newUser);
  }
}

function validateFields() {
  let errores = 0;

  if(validateNickname()){
    const toastModalNicknameError = document.getElementById("errorNicknameToast");
    const toastNicknameError = bootstrap.Toast.getOrCreateInstance(toastModalNicknameError);
    toastNicknameError.show();
    errores++;
  }

  if(validateEmail()){
    const toastModalEmailError = document.getElementById("errorEmailToast");
    const toastEmailError = bootstrap.Toast.getOrCreateInstance(toastModalEmailError);
    toastEmailError.show();
    errores++;
  }

  if(!validatePassword()){
    const toastModalPasswordError = document.getElementById("errorPasswordToast");
    const toastPasswordError = bootstrap.Toast.getOrCreateInstance(toastModalPasswordError);
    toastPasswordError.show();
    errores++;
  }

  return errores == 0;
}

function validateNickname(){
    return (getNickname().trim() === "");
}

function validateEmail(){
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (!emailRegex.test(getEmail()));
}

function validatePassword(){
  var passwordRegex = /^(?=.*[A-Z]).{8,}$/;

  if(passwordRegex.test(getPassword1())){
    showPasswordIndicator(true);
    if(getPassword1() === getPassword2()){
      return true;
    }else{
      return false;
    }

  }else{
    showPasswordIndicator(false);
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

function storeUser(newUser){
  const url = 'http://localhost:3000/users'
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
    .then(response => response.json())
    .then(result => {
      // Manejo de la respuesta del servidor
      console.log(result);
    })
    .catch(error => {
      // Manejo de errores
      console.error('Error:', error);
    });
}

function getNickname(){
  return document.getElementById("nickname").value;
}

function getEmail(){
  return document.getElementById("email").value;
}

function getPassword1(){
  return document.getElementById("password1").value;
}

function getPassword2(){
  return document.getElementById("password2").value;
}
