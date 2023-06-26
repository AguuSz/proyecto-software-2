var userId;

var user;
var user_wr;

window.onload = async () => {
	current_user = getFromCookies("userId");
	const params = new URLSearchParams(window.location.search);
	if (params.get("userId")) {
		userId = params.get("userId");
	} else {
		userId = current_user;
	}

	if (userId == null) {
		const modalLoggedOut = new bootstrap.Modal(
			document.getElementById("loggedOutModal")
		);
		modalLoggedOut.show();
	}

	user = await getUserById(userId);

	if (current_user == userId && current_user != null) {
		createSettingsButton();
	}

	switchTab(0);

	user_wr = getUserWR();
};

function switchTab(index) {
	const buttons = document.querySelectorAll(".col-2 .btn");
	buttons.forEach((button, i) => {
		if (i === index) {
			button.classList.remove("btn-secondary");
			button.classList.add("btn-primary");
		} else {
			button.classList.remove("btn-primary");
			button.classList.add("btn-secondary");
		}
	});

	const tab = document.getElementById("tab");

	switch (index) {
		case 0:
			getQuickProfile();
			tab.innerHTML =
				`
            <div> Region: ` +
				user.region +
				`
            </div>
            <div>Rank: ` +
				user.rank +
				`
            </div>
            `;
			break;

		case 2:
			getQuickProfile();
			tab.innerHTML =
				`
        <div>
            <table class="table table-stripped">
                <thead class="thead-dark">
                    <h3>Carreer Stats</h3>
                </thead>
                <tbody>
                    <tr>
                        <th>Total Wins</th>
                        <th>Total losses</th>
                        <th>Total Played</th>
                    </tr>
                    <tr>
                        <td id="wins">` +
				user.wins +
				`</td>
                        <td id="losses">` +
				user.loses +
				`</td>
                        <td id="played">` +
				(parseInt(user.wins) + parseInt(user.loses)) +
				`</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="rounded text-center">
            <table class="table table-stripped">
                <thead class="thead-dark">
                    <h3>Rank Stats</h3>
                </thead>
                <tbody>
                    <tr>
                        <th>Rank</th>
                        <th>Elo</th>
                        <th>Winrate</th>
                    </tr>
                    <tr>
                        <td id="rank">` +
				user.rank +
				`</td>
                        <td id="elo">` +
				user.mmr +
				`</td>
                        <td id="winrate">` +
				user_wr +
				`%</td>
                    </tr>
                </tbody>
            </table>
        `;
			break;
		case 3:
			try {
				document.getElementById("quick_prof").remove();
			} catch {
				console.log("No existe el quick profile");
			}

			tab.innerHTML =
				`
            <h3>
					Edit Your Profile
			</h3>
            <div class=">
                <form id="editProfileForm">
					<form class="settings100-form validate-form ">
						<div>
							<div class="mb-3">
								<label for="nickname" class="form-label">Change your nickname</label>
								<input type="text" class="form-control" id="nickname" placeholder="` +
				user.nickname +
				`">
							</div>
							<span class="focus-input100"></span>
							<span class="symbol-input100">
								<i class="fa fa-envelope" aria-hidden="true"></i>
							</span>
						</div>

						<div class="mb-3">
							<label for="email" class="form-label">Email address</label>
							<input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="` +
				user.email +
				`">
							<div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
						</div>

                    <div>

                <h3>
					Change your password
				</h3>

				<div class="row">
					<div class="col-4">
						<div class="mb-3">
						<label for="new_password" class="form-label">New password</label>
						<input type="password" class="form-control" id="new_password" oninput="showPasswordIndicator(this.value.match(/^(?=.*[A-Z]).{8,}$/))">
						</div>
						<div id="password-indicator"></div>
					</div>

					<div class="col-4">
						<div class="mb-3">
						<label for="old_password" class="form-label">Current password</label>
						<input type="password" class="form-control" id="old_password">
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-4">
						<div class="mb-3">
						<label for="new_password2" class="form-label">Repeat new password password</label>
						<input type="password" class="form-control" id="new_password2">
						</div>
					</div>
				</div>

				<div class="d-flex justify-content-end">
					<button type="button" class="btn btn-success" id="save-button">
						Save
					</button>
				</div>
				
                </form>
		    </div>
            `;
			const save_button = document.getElementById("save-button");
			save_button.addEventListener("click", editProfile);
			break;
	}
}

function getFromCookies(key) {
	return localStorage.getItem(key);
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

function getUserWR() {
	wins = parseInt(user.wins);
	loses = parseInt(user.loses);
	return (wins / (wins + loses)) * 100;
}

function getQuickProfile() {
	if (!document.getElementById("quick_prof")) {
		const container = document.getElementById("profile-container");
		const quick_prof = document.createElement("div");
		quick_prof.setAttribute("id", "quick_prof");
		quick_prof.classList.add(
			"shadow",
			"p-3",
			"mb-3",
			"bg-body-tertiary",
			"rounded"
		);
		const username = document.createElement("div");
		username.classList.add("text-left", "fs-4");
		username.textContent = user.nickname;
		const joindate = document.createElement("div");
		joindate.classList.add("text-sm-left", "fs-6");
		joindate.textContent = "Joined on 30th February 2009";
		const premium_status = document.createElement("div");
		premium_status.classList.add("text-sm-left", "fs-6");
		premium_status.textContent = "Premium User";
		quick_prof.appendChild(username);
		quick_prof.appendChild(joindate);
		quick_prof.appendChild(premium_status);
		container.prepend(quick_prof);
	}
}

function logOut() {
	localStorage.removeItem("userId");
	localStorage.removeItem("userEmail");
	localStorage.removeItem("userName");
	localStorage.removeItem("isAdmin");
	window.location.href = "../index/index.html";
}

function createSettingsButton() {
	const profile_menu = document.getElementById("profile-menu");
	const settings_btn = document.createElement("button");
	settings_btn.classList.add("btn", "btn-secondary", "w-100");
	settings_btn.textContent = "Settings";
	settings_btn.addEventListener("click", () => switchTab(3));
	profile_menu.appendChild(settings_btn);
}

async function editProfile(event) {
	event.preventDefault();
	let tempUser = { ...user };
	var changesMade = false;

	newNickname = document.getElementById("nickname").value;
	newEmail = document.getElementById("email").value;
	oldPassword = document.getElementById("old_password").value;
	newPassword = document.getElementById("new_password").value;
	newPassword2 = document.getElementById("new_password2").value;

	if (Boolean(newNickname)) {
		if (await validateDuplicatedNickname(newNickname)) {
			const toastModalNicknameDuplicatedError = document.getElementById(
				"errorNicknameDuplicatedToast"
			);
			const toastNicknameDuplicatedError = bootstrap.Toast.getOrCreateInstance(
				toastModalNicknameDuplicatedError
			);
			toastNicknameDuplicatedError.show();
		} else {
			tempUser.nickname = newNickname;
			console.log("New Nickname");
			changesMade = true;
		}
	}
	if (Boolean(newEmail)) {
		switch (await validateEmail(newEmail)) {
			case 0:
				tempUser.email = newEmail;
				changesMade = true;
				break;

			case 1:
				const toastModalDuplicatedEmailError = document.getElementById(
					"errorEmailDuplicatedToast"
				);
				const toastDuplicatedEmailError = bootstrap.Toast.getOrCreateInstance(
					toastModalDuplicatedEmailError
				);
				toastDuplicatedEmailError.show();
				break;
			case 2:
				const toastModalEmailError = document.getElementById("errorEmailToast");
				const toastEmailError =
					bootstrap.Toast.getOrCreateInstance(toastModalEmailError);
				toastEmailError.show();
				break;

			case 3:
				console.log("Unhandled error");
		}
	}

	if (Boolean(newPassword) && Boolean(oldPassword)) {
		console.log(newPassword);
		console.log(newPassword2);
		if (!validatePassword(newPassword, newPassword2)) {
			console.log("GOD");
			const toastModalPasswordError =
				document.getElementById("errorPasswordToast");
			const toastPasswordError = bootstrap.Toast.getOrCreateInstance(
				toastModalPasswordError
			);
			toastPasswordError.show();
		} else {
			if (await checkPassword(oldPassword)) {
				tempUser.password = newPassword;
				changesMade = true;
			}
		}
	}

	if (changesMade) {
		storeChanges(tempUser);
		const toastModalSuccess = document.getElementById("successToast");
		const toastSuccess = bootstrap.Toast.getOrCreateInstance(toastModalSuccess);
		var currentToast = toastSuccess;
		location.reload();
	} else {
		const toastModalNoChangesMade = document.getElementById("NoChangesMade");
		const toastNoChangesMade = bootstrap.Toast.getOrCreateInstance(
			toastModalNoChangesMade
		);
		var currentToast = toastNoChangesMade;
	}
	currentToast.show();
}

async function validateDuplicatedNickname(newNickname) {
	const nickname = newNickname;

	return fetch("http://localhost:3000/users")
		.then((response) => response.json())
		.then((users) => {
			const foundUser = users.find((user) => user.nickname === nickname);
			if (foundUser) {
				return true; // El nickname ya existe
			} else {
				return false; // El nickname no existe
			}
		})
		.catch((error) => {
			console.error("Error:", error);
			return true;
		});
}

async function validateEmail(newEmail) {
	var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (emailRegex.test(newEmail)) {
		return fetch("http://localhost:3000/users")
			.then((response) => response.json())
			.then((users) => {
				const foundUser = users.find((user) => user.email === newEmail);
				if (foundUser) {
					return 1; // El email ya existe
				} else {
					return 0; // El email no existe
				}
			})
			.catch((error) => {
				console.error("Error:", error);
				return 3;
			});
	} else {
		return 2;
	}
}

async function checkPassword(old_password) {
	return fetch("http://localhost:3000/users")
		.then((response) => response.json())
		.then((users) => {
			const user1 = users.find((u) => u.email === getFromCookies("userEmail"));

			const toastModalError = document.getElementById("errorToast");
			const toastError = bootstrap.Toast.getOrCreateInstance(toastModalError);
			console.log(user1);
			if (user1 && user1.password === old_password) {
				console.log("Password changed succesfully");
				return true;
			} else {
				const toastModalOldPasswordError = document.getElementById(
					"errorOldPasswordToast"
				);
				const toastOldPasswordError = bootstrap.Toast.getOrCreateInstance(
					toastModalOldPasswordError
				);
				toastOldPasswordError.show();
				return false;
			}
		});
}

async function validatePassword(new_password, new_password2) {
	var passwordRegex = /^(?=.*[A-Z]).{8,}$/;

	if (passwordRegex.test(new_password)) {
		showPasswordIndicator(true);
		if (new_password === new_password2) {
			return true;
		} else {
			return false;
		}
	} else {
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
		indicator.textContent =
			"Password must have at least 8 characters and one uppercase letter.";
	}
}
function deleteFromCookies(key) {
	localStorage.removeItem(key);
}

function storeChanges(user) {
	fetch(`http://localhost:3000/users/${user.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((response) => response.json())
		.then((result) => {
			// Manejo de la respuesta del servidor
			console.log(result);
		})
		.catch((error) => {
			// Manejo de errores
			console.error("Error:", error);
		});
}
function goToLogin() {
	window.location.href = "../login/login.html";
}
