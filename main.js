let rollsThisRound = 0;
let goalPoints = 100;
let playerCount = 2;
let players = [];
let currentPlayerI = 0;

var restartbtn = document.getElementById("restartbtn")
var rollbtn = document.getElementById("rollbtn")

restartbtn.setAttribute("disabled", " ")

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
            displayFirstDice()
            updateCurrentPlayerDisplay()
            displayPoints()
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
                players.push({id : `p${i}`, name : playerName, points: 0, currentroundpoints: 0})
            }
        }
        splash2FadeOut()
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

let diceImgcontainer1 = document.getElementById("dice-container-1")
let diceImgcontainer2 = document.getElementById("dice-container-2")

function nextPlayer(){
    rollsThisRound = 0
    currentPlayerI = (currentPlayerI + 1) % players.length;
    updateCurrentPlayerDisplay()
};

function updateCurrentPlayerDisplay(){
    const currentPlayer = players[currentPlayerI]
    document.getElementById("playerturn").textContent = `Pelaajan vuoro: ${currentPlayer.name}`
}

function displayFirstDice(){
    const firstRandomNum = Math.floor(Math.random() * 6) + 1;
    const firstDiceImage = "images/dice" +  firstRandomNum + ".png";
    
    const firstRandomNum2 = Math.floor(Math.random() * 6) + 1;
    const firstDiceImage2 = "images/dice" +  firstRandomNum2 + ".png";
    
    diceImgcontainer1.src = firstDiceImage
    diceImgcontainer2.src = firstDiceImage2
}

function displayPoints(){
    document.getElementById("rolls").textContent = `Heitot: ${rollsThisRound}`
    const pointsContainer = document.getElementById('points-container') || document.createElement("div")
    pointsContainer.id = "points-container"
    pointsContainer.innerHTML = ""
    players.forEach(player => {
        const playerPoints = document.createElement("div")
        playerPoints.id = `points-${player.id}`
        playerPoints.textContent = `${player.name}: ${player.points} pistettä (Pisteet tässä kierroksessa: ${player.currentroundpoints})`
        pointsContainer.appendChild(playerPoints)
    });
    document.getElementById("gamecontent").appendChild(pointsContainer);
}

const currentPlayer = [currentPlayerI]

function rollDice(){
    rollsThisRound += 1
    let doublesIndex = 0
    const randomNum1 = Math.floor(Math.random() * 6) + 1;
    const diceImg1 = "images/dice" + randomNum1 + ".png"
    const randomNum2 = Math.floor(Math.random() * 6) + 1;
    const diceImg2 = "images/dice" + randomNum2 + ".png"

    let doubles = (randomNum1 + randomNum2) * 2;
    let number = randomNum1 + randomNum2

    diceImgcontainer1.src = diceImg1
    diceImgcontainer2.src = diceImg2
    
    

    if(randomNum1 > 1 && randomNum2 == 1 || randomNum1 == 1 && randomNum2 > 1){
        currentPlayer.points -= currentPlayer.currentroundpoints
        currentPlayer.currentroundpoints == 0
        nextPlayer()

    } else if (randomNum1 == randomNum2){
        doublesIndex += 1
        currentPlayer.points += doubles
        currentPlayer.currentroundpoints += doubles

        if (doublesIndex == 3){
            doublesIndex = 0
            currentPlayer.points -= currentPlayer.currentroundpoints
            currentPlayer.currentroundpoints = 0
            nextPlayer()

        }

    } else if(randomNum1 == 1 && randomNum2 == 1){
        currentPlayer.points += 25
        currentPlayer.currentroundpoints += 25
        displayPoints()

    } else if(currentPlayer.points >= goalPoints){
        
        document.getElementById("result").textContent = `${currentPlayer.name} Voitti!`
        buttons()
    } else {
        currentPlayer.points += number
        currentPlayer.currentroundpoints += number
    }
    displayPoints()
    
};

function stopTurn(){
    currentPlayer.currentroundpoints = 0
    nextPlayer()
}

function buttons(){
    rollbtn.setAttribute("disabled", " ")
    restartbtn.removeAttribute("disabled")
}
