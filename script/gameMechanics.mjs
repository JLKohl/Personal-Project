import { fetchRandomPokemons } from "./pokeAPI.mjs";

console.log("Game Mechanics executing");

fetchRandomPokemons()

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    
    const buttons = document.querySelectorAll(".pokemon-button");

    if (buttons.length === 6){
        console.log(`Buttons are available. Proceeding with 
        game mechanics initialization`);

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                console.log(`Button clicked: ${button.textContent}`)
            });
            });
        } else {
            console.log('No buttons found! Game mechanics initialization will not proceed.')
        }
    
    
    let clickedButtons = [];
    
    function buttonCounter(event){
        if (event.target.tagName.toLowerCase() === "button") {
            clickedButtons.push(event.target);
            
            console.log(`Button clicked: ${event.target.id}`);

            if (clickedButtons.length === 2) {
                
                const firstPokemon = clickedButtons[0].id;
                const secondPokemon = clickedButtons[1].id;
                
                console.log(`Fetching HP for: ${firstPokemon} and ${secondPokemon}`);
                
                Promise.all([
                    fetchPokemonHP(firstPokemon),
                    fetchPokemonHP(secondPokemon)
                ]).then(([hp1, hp2]) => {
                    determineWinner(firstPokemon,  hp1, secondPokemon, hp2);
                    clickedButtons = [];
                }).catch(error =>{
                    console.error("Error fetching HP data:", error)
                });
            }
        }
    }
    
    function determineWinner(firstPokemon, hp1, secondPokemon, hp2) {
        if (hp1 > hp2){
            console.log(`${firstPokemon} is the winner!`);
        } else if (hp1 < hp2){
            console.log(`${secondPokemon} is the winner!`);
        } else {
            console.log("It's a tie!");
        }
    }
    
    
    const buttonsContainer = document.getElementById("buttons-container");
    if (buttonsContainer){
        buttonsContainer.addEventListener("click", buttonCounter);
    } else {
        console.warn("No buttons container found with the specified ID.");
    }


    function fetchPokemonHP(pokemonID) {
        console.log(`Fetching data for ${pokemonID}`);
        return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
            .then(response => response.json())
            .then(data => {
                const hp = data.stats.find(stat => stat.stat.name === 'hp').base_stat;
                console.log(`HP for ${pokemonID}: ${hp}`);
                return hp;
            });
    }
});



