
export function fetchRandomPokemons() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then(response => response.json())
        .then(allPokemon => {
            
            const randomPokemon = selectRandomPokemons(allPokemon.results,  6)
        
            randomPokemon.forEach(pokemon => {
                createFetchButton(pokemon);
            });
            
        })
        
        .catch(error => console.error("Error fetching Pokemon list:", error));

}

 function selectRandomPokemons(pokemonList, count) {
    const shuffled = pokemonList.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

let buttonCounter = 0;

function createFetchButton(pokemon) {
    const buttonContainer = document.getElementById("buttons-container");
    const button = document.createElement("button");
    button.classList.add("pokemon-button");
    
    buttonCounter++;
    button.id = `pokemon-button-${buttonCounter}`;
    
    console.log(button.id)
    
    const img = document.createElement("img");
    img.src = `images/pokeball.png`;
    img.alt = `pokeball`;
    
    button.appendChild(img);
    
    // button.textContent = `Fetch ${pokemon.name}`;
    button.onclick = () => {
        console.log(`Button clicked: ${pokemon.name}`);
        
        fetchPokemonData(pokemon, button);
    };
    buttonContainer.appendChild(button);
    console.log(`Button for ${pokemon.name} created and added to container`);
}

function fetchPokemonData(pokemon, button){
    
    fetch(pokemon.url)  
        .then(response => response.json())
        .then((pokeData) => {
            const name = pokeData.name;
            const types = pokeData.types.map(typeInfo => typeInfo.type.name).join(', ');
            const hp = pokeData.stats.find(stat => stat.stat.name === 'hp').base_stat;
            const sprite = pokeData.sprites.front_default;
            
            displayPokemonData(name,  types,  hp, sprite, button);
        })
        .catch(error => console.error("Error fetching Pokémon data:", error));
}

function displayPokemonData(name, types, hp, sprite, button) {
    button.innerHTML = `<h3>${name}</h3>
                        <img src="${sprite}" 
                        alt="${name}"> `;
    button.classList.remove("pokemon-button");
    button.classList.add("pokemon-clicked");
}
