import {savePokemon} from "./savedPokemon.mjs";

export function gameResults(results, pokemon1 = null, pokemon2=null) {
    var modal = document.getElementById('resultsModal');
    var message = document.getElementById('resultMessage');
    var closeButton = document.getElementById('close-button');
    
    switch (results) {
        case "winner":
            message.textContent = "Winner!!";
            savePokemon(pokemon1, pokemon2);
            break;
        case "loser":
            message.textContent = "Sorry you lost, please try again!";
            break;
        case "tie":
            message.textContent = "It was a tie! Please try again!";
            break;
        default:
            message.textContent = "results unknown";
            
    }
    
    setTimeout(function(){
        modal.style.display = "flex";
    }, 350)
    
    
    closeButton.onclick = function () {
        modal.style.display = "none";
        
        if (results === "winner"){
            location.reload();
        }
    }
    
    window.onclick = function (event){
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}

