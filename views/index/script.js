function handleGoBtn() {
	event.preventDefault();

	// TODO: Agregar checkeo de coockies para saber si esta conectado o no el usuario
	// Caso encuentre: vaya al matchmaking
	// Caso que no encuentre: vaya al login -> este es el default

	window.location.href = "../login/login.html";
}
