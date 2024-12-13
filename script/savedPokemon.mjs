
export function savePokemon(winnerPokemon1, winnerPokemon2) {
    
    const existingWinners = JSON.parse(localStorage.getItem("winnerPokemonList")) || [];
    
    const winnerData = {
        pokemon1: {
            name: winnerPokemon1.name,
            sprite: winnerPokemon1.sprite,
        },
        pokemon2: {
            name: winnerPokemon2.name,
            sprite: winnerPokemon2.sprite,
        },
        date: new Date().toISOString() //adding stamp
     };
    
    existingWinners.push(winnerData);
    
    
    
    localStorage.setItem("winnerPokemonList", JSON.stringify(existingWinners));
}

const savedWinners = JSON.parse(localStorage.getItem("winnerPokemonList")) || [];
console.log(savedWinners);
