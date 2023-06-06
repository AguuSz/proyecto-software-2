const toastTrigger = document.getElementById("createLobbyBtn");
const toastModalSuccess = document.getElementById("successToast");
const toastModalError = document.getElementById("errorToast");

const toastSucess = bootstrap.Toast.getOrCreateInstance(toastModalSuccess);
const toastError = bootstrap.Toast.getOrCreateInstance(toastModalError);
const myModal = new bootstrap.Modal(document.getElementById("newLobbyModal"));

function onCloseButtonClick(lobbyId) {
	console.log("Se ha clickeado " + lobbyId);
}

if (toastTrigger) {
	toastTrigger.addEventListener("click", () => {
		event.preventDefault();
		if (isNewLobbyFormValid()) {
			createLobby();
			myModal.hide();
			toastSucess.show();
		} else {
			toastError.show();
		}
	});
}

function isNewLobbyFormValid() {
	var platform = document.forms["newLobbyModalForm"]["platform"].value;
	var region = document.forms["newLobbyModalForm"]["region"].value;

	return platform != "Choose..." && region != "Choose...";
}

// Funcion que se llama cuando el usuario clickea en "Create new Lobby" en el Modal.
async function createLobby() {
	// Obtenemos los valores del form
	var platform =
		document.forms["newLobbyModalForm"]["platform"].value.toUpperCase();
	var region =
		document.forms["newLobbyModalForm"]["region"].value.toUpperCase();

	var user = await getUserById(getFromCookies("userId"));
	let newLobby = {
		userId: user.id,
		platform: platform,
		region: region,
		isFull: false,
		blueTeam: [],
		redTeam: [],
	};

	try {
		await storeLobby(newLobby);
		// Para poder agregar el lobby es necesario que tenga informacion del usuario (para saber rank y division), pero esta info no esta presente en el lobby que se guarda en DB, por eso se setea
		let tempLobby = newLobby;
		tempLobby.user = user;
		appendLobby(tempLobby);
	} catch (error) {
		console.log(error);
	}
}

function appendLobby(lobby) {
	let user = lobby.user;

	// Obtiene donde insertar el div
	const lobbys = document.getElementById("lobbys");

	// Crear el elemento div con la clase "col-2"
	const divCol2 = document.createElement("div");
	divCol2.classList.add("col-2");

	// Crear el elemento div con la clase "card text-center px-0"
	const divCard = document.createElement("div");
	divCard.classList.add("card", "text-center", "px-0");

	// Crear el elemento div con la clase "card-header" y texto "nickname's lobby"
	const divCardHeader = document.createElement("div");
	divCardHeader.classList.add("card-header", "pe-1");
	divCardHeader.textContent = user.nickname + "'s lobby";

	const closeButton = document.createElement("button");
	closeButton.addEventListener("click", () => {
		onCloseButtonClick(lobby.id);
	});
	closeButton.setAttribute("type", "button");
	closeButton.classList.add("btn-close", "float-end", "show-if-admin");
	divCardHeader.appendChild(closeButton);

	// Crear el elemento div con la clase "card-body"
	const divCardBody = document.createElement("div");
	divCardBody.classList.add("card-body");

	// Crear el elemento h6 con la clase "card-subtitle mb-3 text-body-secondary" y texto "SAM"
	const h6CardSubtitleRegion = document.createElement("h6");
	h6CardSubtitleRegion.classList.add(
		"card-subtitle",
		"mb-3",
		"text-body-secondary"
	);
	h6CardSubtitleRegion.textContent = lobby.region;

	// Crear el elemento h6 con la clase "card-subtitle mb-3 text-body-secondary" para el Rank + Division
	const h6CardSubtitleRank = document.createElement("h6");
	h6CardSubtitleRank.classList.add(
		"card-subtitle",
		"mb-3",
		"text-body-secondary"
	);
	h6CardSubtitleRank.textContent = user.rank + " " + user.division;

	// Crear el elemento img con el atributo src y clase "rounded" para las tres imágenes
	const imgProfilePic = document.createElement("img");
	imgProfilePic.src = "../../src/img/profile_pic_icon.png";
	imgProfilePic.alt = "profile_pic_icon";
	imgProfilePic.classList.add("rounded", "me-1");
	imgProfilePic.width = "40";

	// Crear el elemento h5 con la clase "my-3" y texto "VS"
	const h5VS = document.createElement("h5");
	h5VS.classList.add("my-3");
	h5VS.textContent = "VS";

	// Crear el elemento h6 con la clase "card-subtitle mb-3 text-body-secondary" para mostrar la plataforma
	const h6CardSubtitlePlatform = document.createElement("h6");
	h6CardSubtitlePlatform.classList.add(
		"card-subtitle",
		"my-3",
		"text-body-secondary"
	);
	h6CardSubtitlePlatform.textContent = lobby.platform;

	// Crear el botón "Join lobby!" con la clase "btn btn-primary mt-3" y el elemento a con el atributo href
	const aJoinLobby = document.createElement("a");
	aJoinLobby.href = "#";
	aJoinLobby.classList.add("btn", "btn-primary", "mt-3");
	aJoinLobby.textContent = "Join lobby!";

	// Crear el elemento div con la clase "row mx-auto" y agregar el botón "Join lobby!"
	const divRow = document.createElement("div");
	divRow.classList.add("row", "mx-auto");
	divRow.appendChild(aJoinLobby);

	// Crear el elemento div con la clase "card-footer text-body-secondary"
	const divCardFooter = document.createElement("div");
	divCardFooter.classList.add("card-footer", "text-body-secondary");
	divCardFooter.textContent = "1 second ago";

	// Agregar todos los elementos creados al elemento padre correspondiente
	divCardBody.appendChild(h6CardSubtitleRegion);
	divCardBody.appendChild(h6CardSubtitleRank);
	divCardBody.appendChild(imgProfilePic.cloneNode());
	divCardBody.appendChild(imgProfilePic.cloneNode());
	divCardBody.appendChild(imgProfilePic.cloneNode());
	divCardBody.appendChild(h5VS);
	divCardBody.appendChild(imgProfilePic.cloneNode());
	divCardBody.appendChild(imgProfilePic.cloneNode());
	divCardBody.appendChild(imgProfilePic.cloneNode());
	divCardBody.appendChild(h6CardSubtitlePlatform);
	divCardBody.appendChild(divRow);

	divCard.appendChild(divCardHeader);
	divCard.appendChild(divCardBody);
	divCard.appendChild(divCardFooter);

	divCol2.appendChild(divCard);

	lobbys.appendChild(divCol2);
}

// Funcion que obtiene los lobbies apenas se carga la pagina
window.onload = () => {
	getLobbies();
};

function getLobbies() {
	fetch(`http://localhost:3000/lobbies?_expand=user`)
		.then((response) => response.json())
		.then((responseLobbies) => {
			responseLobbies.forEach((lobby) => {
				appendLobby(lobby);
			});
		})
		.catch((error) => {
			console.log("Error while trying to fetch data:", error);
		});
}

function getUserById(id) {
	return fetch(`http://localhost:3000/users/${id}`)
		.then((response) => response.json())
		.then((user) => {
			if (user) {
				return user;
			} else {
				return null;
			}
		})
		.catch((error) => {
			console.log("Error while trying to fetch data:", error);
		});
}

function storeLobby(lobby) {
	const url = "http://localhost:3000/lobbies";

	return fetch(url, {
		method: "POST",
		body: JSON.stringify(lobby),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => response.json())
		.then((result) => {
			return result;
		})
		.catch((error) => {
			console.error("Error:", error);
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
