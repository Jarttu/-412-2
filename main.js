let rollsThisRound = 0;
let currentPlayer = 1;
let goalPoints = 100;
let playerCount = 2;
let players = [];
let roundWon = false;

document.addEventListener("DOMContentLoaded", function(){
    const splashContainer = document.getElementById("splash-container");
    const goalForm = document.getElementById("goalform");
    const goalInput = document.getElementById("goalinput");

    const splash2 = document.getElementById("splash2");
    const playerCountForm = document.getElementById("playercountform");
    const playerCountInput = document.getElementById("playercountinput");
    const nameForm = document.getElementById("nameform");
    const playerNameInputs = document.getElementById("playernameinputs")

    const gameContent = document.getElementById("gamecontent");

    function splashFadeOut(){
        splashContainer.classList.add('hidden');
        setTimeout(function(){
            splash2.classList.add('active');
        }, 500);
    }

    function nameFormIn(){
        playerCountForm.classList.add('hidden');
        genNameInputs();
        setTimeout(function(){
            nameForm.classList.add('visible');
            
        }, 500);
    }

    function splash2FadeOut(){
        splash2.classList.remove('active');
        nameForm.classList.remove('visible');
        setTimeout(function(){
            gameContent.classList.add('visible');
        }, 500);
    }

    function genNameInputs(){
        playerNameInputs.innerHTML = ""
        for(let i = 1; i <= playerCount; i++){
            const input = document.createElement("input")
            input.type = "text"
            input.placeholder = `Pelaajan ${i} nimi`
            input.id = `player${i}name`
            input.classList.add("player-name-input")
            playerNameInputs.appendChild(input)
        }
        const startButton = document.createElement("button")
        startButton.textContent = "Aloita peli"
        startButton.type = "button"
        startButton.onclick = startGame
        startButton.classList.add('click')
        playerNameInputs.appendChild(startButton)
    }

    function startGame(){
        players = []
        for(let i = 1; i <= playerCount; i++){
            const playerName = document.getElementById(`player${i}name`).value.trim()
            if (playerName){
                players.push({id : `p${i}`, name : playerName})
            }
        }
        splash2FadeOut()
        displaydefault()
    }

    goalForm.addEventListener("submit", function(event){
        event.preventDefault();

        const goalPointsValue = goalInput.value.trim();

        if (goalPointsValue == ""){
            splashFadeOut();
        } else {
            if (isNaN(goalPointsValue)){
                alert("Syötä numero");
            } else if (goalPointsValue < 10){
                alert("Tavoitteen tulee olla vähintään 10");
            } else if (goalPointsValue > 1000){
                alert("Tavoitteen tulee olla enintään 1000");
            } else {
                goalPoints = parseInt(goalPointsValue);
                splashFadeOut();
            }
        }
    });

    playerCountForm.addEventListener("submit", function(event){
        event.preventDefault();

        const playerCountValue = playerCountInput.value.trim();

        if (playerCountValue == ""){
            nameFormIn()
        } else{
            if (isNaN(playerCountValue)){
                alert("Syötä numero")
            } else if (playerCountValue < 2){
                alert("Pelaajia on oltava vähintään 2")
            } else if (playerCountValue > 10){
                alert("Pelaajia voi olla enintään 10")
            } else {
                playerCount = parseInt(playerCountValue)
                nameFormIn()
            }
        }
    });

});


function displaydefault(){
    const firstRandomNum = Math.floor(Math.random() * 6) + 1;
    const firstDiceImage = "images/dice" +  firstRandomNum + ".png";
    
    const firstRandomNum2 = Math.floor(Math.random() * 6) + 1;
    const firstDiceImage2 = "images/dice" +  firstRandomNum2 + ".png";

    document.getElementById("dice-container-1").setAttribute("src", firstDiceImage)
    document.getElementById("dice-container-2").setAttribute("src", firstDiceImage2)

    document.getElementById("goaltext").textContent = `Tavoite ${goalPoints}`
}