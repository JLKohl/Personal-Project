
document.addEventListener("DOMContentLoaded", function() {
    
    let clickedButtons = [];
    
    function buttonCounter(event){
        clickedButtons.push(event.target.id);
        
        if (clickedButtons.length === 2){
            
            console.log(`First Button Clicked: 
            ${clickedButtons[0]}`);
            console.log(`Second Button Clicked:
             ${clickedButtons[1]}`);
            
            clickedButtons = [];
        }
    }
    
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("click", buttonCounter);
    })
})


// function compareData(){
//     if (buttonOne.hp === buttonTwo.hp){
//         return alert ("You have the same HP! Both Pokemon escaped. " +
//             "Please try again")
//     } else if (buttonOne.hp > buttonTwo.hp){
//         return alert("You have won! Both Pokemon will be added to your PokeDeck.")
//     } else if (buttonOne.hp < buttonTwo.hp) {
//         return alert("Sorry! You have lost and no pokemon " +
//             "will be added to you PokeDeck." +
//             " Please try again.")
//     }
// }

function displayWinnerOrLoser(){
    
}