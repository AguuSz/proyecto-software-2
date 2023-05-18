const toastTrigger = document.getElementById("createLobbyBtn");
const toastModalSuccess = document.getElementById("successToast");
const toastModalError = document.getElementById("errorToast");

if (toastTrigger) {
	const toastSucess = bootstrap.Toast.getOrCreateInstance(toastModalSuccess);
	const toastError = bootstrap.Toast.getOrCreateInstance(toastModalError);
	const myModal = new bootstrap.Modal(document.getElementById("newLobbyModal"));
	toastTrigger.addEventListener("click", () => {
		if (isNewLobbyFormValid()) {
			appendLobby("SharkyMid");
			myModal.hide();
			toastSucess.show();
		} else {
			toastError.show();
		}
	});
}

function isNewLobbyFormValid() {
	var platform = document.forms["newLobbyModalForm"]["platform"].value;
	var rank = document.forms["newLobbyModalForm"]["rank"].value;
	var division = document.forms["newLobbyModalForm"]["division"].value;
	var region = document.forms["newLobbyModalForm"]["region"].value;
	var mmr = document.forms["newLobbyModalForm"]["mmr"].value;

	return (
		platform != "" && rank != "" && division != "" && region != "" && mmr != ""
	);
}

function appendLobby(username) {
	var platform = document.forms["newLobbyModalForm"]["platform"].value;
	var rank = document.forms["newLobbyModalForm"]["rank"].value;
	var division = document.forms["newLobbyModalForm"]["division"].value;
	var region =
		document.forms["newLobbyModalForm"]["region"].value.toUpperCase();
	var mmr = document.forms["newLobbyModalForm"]["mmr"].value;

	// Hacemos esto para que se ponga la primer letra en mayúscula
	rank = rank.charAt(0).toUpperCase() + rank.slice(1);

	const lobbys = document.getElementById("lobbys");

	// Crear el elemento div con la clase "col-2"
	const divCol2 = document.createElement("div");
	divCol2.classList.add("col-2");

	// Crear el elemento div con la clase "card text-center px-0"
	const divCard = document.createElement("div");
	divCard.classList.add("card", "text-center", "px-0");

	// Crear el elemento div con la clase "card-header" y texto "AguuSz's lobby"
	const divCardHeader = document.createElement("div");
	divCardHeader.classList.add("card-header", "pe-1");
	divCardHeader.textContent = username + "'s lobby";
	const closeButton = document.createElement("button");
	closeButton.setAttribute("type", "button");
	closeButton.classList.add("btn-close", "float-end", "show-if-admin");
	divCardHeader.appendChild(closeButton);

	// Crear el elemento div con la clase "card-body"
	const divCardBody = document.createElement("div");
	divCardBody.classList.add("card-body");

	// Crear el elemento h6 con la clase "card-subtitle mb-3 text-body-secondary" y texto "SAM"
	const h6CardSubtitleSAM = document.createElement("h6");
	h6CardSubtitleSAM.classList.add(
		"card-subtitle",
		"mb-3",
		"text-body-secondary"
	);
	h6CardSubtitleSAM.textContent = region;

	// Crear el elemento h6 con la clase "card-subtitle mb-3 text-body-secondary" y texto "Diamond I"
	const h6CardSubtitleDiamondI = document.createElement("h6");
	h6CardSubtitleDiamondI.classList.add(
		"card-subtitle",
		"mb-3",
		"text-body-secondary"
	);
	h6CardSubtitleDiamondI.textContent = rank + " " + division;

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

	// Crear el botón "Join lobby!" con la clase "btn btn-primary mt-3" y el elemento a con el atributo href

	const aJoinLobby = document.createElement("a");
	aJoinLobby.href = "#";
	aJoinLobby.classList.add("btn", "btn-primary", "mt-3");
	aJoinLobby.textContent = "Join lobby!";

	// Crear el elemento div con la clase "row mx-auto" y agregar el botón "Join lobby!"
	const divRow = document.createElement("div");
	divRow.classList.add("row", "mx-auto");
	divRow.appendChild(aJoinLobby);

	// Crear el elemento div con la clase "card-footer text-body-secondary" y texto "5 minutes ago"
	const divCardFooter = document.createElement("div");
	divCardFooter.classList.add("card-footer", "text-body-secondary");
	divCardFooter.textContent = "1 second ago";

	// Agregar todos los elementos creados al elemento padre correspondiente
	divCardBody.appendChild(h6CardSubtitleSAM);
	divCardBody.appendChild(h6CardSubtitleDiamondI);
	divCardBody.appendChild(imgProfilePic.cloneNode());
	divCardBody.appendChild(imgProfilePic.cloneNode());
	divCardBody.appendChild(imgProfilePic.cloneNode());
	divCardBody.appendChild(h5VS);
	divCardBody.appendChild(imgProfilePic.cloneNode());
	divCardBody.appendChild(imgProfilePic.cloneNode());
	divCardBody.appendChild(imgProfilePic.cloneNode());
	divCardBody.appendChild(divRow);

	divCard.appendChild(divCardHeader);
	divCard.appendChild(divCardBody);
	divCard.appendChild(divCardFooter);

	divCol2.appendChild(divCard);

	lobbys.appendChild(divCol2);
}
