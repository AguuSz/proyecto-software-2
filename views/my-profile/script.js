function switchTab(index){

    const buttons = document.querySelectorAll('.col-2 .btn')
       buttons.forEach((button, i) => {
        if (i === index) {
            button.classList.remove('btn-secondary');
            button.classList.add('btn-primary')
        } else {
            button.classList.remove('btn-primary');
            button.classList.add('btn-secondary')
        
        }
    }); 

    const tab = document.getElementById('tab')

    switch(index){
        case 0: tab.innerHTML = `
            <div>
            a
            </div>
        ` 
        break;

        case 1: tab.innerHTML = `
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
                        <td id="wins">336</td>
                        <td id="losses">337</td>
                        <td id="played">670</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="border border-info rounded text-center">
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
                        <td id="rank">S</td>
                        <td id="elo">2200</td>
                        <td id="winrate">66%</td>
                    </tr>
                </tbody>
            </table>
        `
        break;
        case 2: tab.innerHTML = `
        <div>
					<form class="settings100-form validate-form ">
					<span class="settings100-form-title"> Change Your Nickname </span>

					<div class="wrap-input100 validate-input">
						<input
							class="input100"
							type="text"
							name="nickname"
							placeholder="iClown32"
							id="nickname"
						/>
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>
					<div>	
						<a href="#" class="btn btn-primary btn-block active " role="button" aria-pressed="false">Change Nickname</a>
					</div>
					<div>	
						<a href="password.html" class="btn btn-secondary btn-block active " role="button" aria-pressed="false">Change Password</a>
					</div>

				</div>
				

					

		</div>
        `
        break;

    }

}