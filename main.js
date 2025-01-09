let goalPoints = 100;

document.addEventListener("DOMContentLoaded", function(){
    const splashContainer = document.querySelector(".splash-container");
    const goalForm = document.getElementById("goalform");
    const splash2 = document.getElementById("splash2");
    const goalInput = document.getElementById("goalinput");

    function splashFadeOut(){
        splashContainer.classList.add('hidden');
        setTimeout(function(){
            splash2.classList.add('active');
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
});

