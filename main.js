let goalPoints = 100;
let playerCount = 2;

document.addEventListener("DOMContentLoaded", function(){
    const splashContainer = document.getElementById("splash-container");
    const goalForm = document.getElementById("goalform");
    const goalInput = document.getElementById("goalinput");

    const splash2 = document.getElementById("splash2");
    const playerCountForm = document.getElementById("playercountform");
    const playerCountInput = document.getElementById("playercountinput");
    const nameForm = document.getElementById("nameform");

    const gameContent = document.getElementById("game-content");

    function splashFadeOut(){
        splashContainer.classList.add('hidden');
        setTimeout(function(){
            splash2.classList.add('active');
        }, 500);
    }

    function nameFormIn(){
        playerCountForm.classList.add('hidden');
        setTimeout(function(){
            nameForm.classList.add('visible');
        }, 500);
    }

    function splash2FadeOut(){
        splash2.classList.remove('acvtive');
        nameForm.classList.remove('visible');
        setTimeout(function(){
            gameContent.classList.add('visible');
        }, 500);
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

