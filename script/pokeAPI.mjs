
export function fetchRandomPokemons() {
   return fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
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
    if (buttonContainer){
        const button = document.createElement("button");
        button.classList.add("pokemon-button");

        buttonCounter++;
        button.id = `pokemon-button-${buttonCounter}`;
        button.setAttribute('data-id', pokemon.name);
        
        console.log(`Button created for: ${button.textContent} with data-id: ${pokemon.name}`)

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

        console.log(`Button for ${pokemon.name}. With ID:${button.id} created and added to container`);
    }
}

let pokemonsData = [];

function fetchPokemonData(pokemon, button){
    
    fetch(pokemon.url)  
        .then(response => response.json())
        .then((pokeData) => {
            const name = pokeData.name;
            const types = pokeData.types.map(typeInfo => typeInfo.type.name).join(', ');
            const hp = pokeData.stats.find(stat => stat.stat.name === 'hp').base_stat;
            const sprite = pokeData.sprites.front_default;
            
            displayPokemonData(name,  types,  hp, sprite, button);
            
            pokemonsData.push({name, hp});
            
            if (pokemonsData.length === 2){
                determineStrongerPokemon();
            } 
        })
        .catch(error => console.error("Error fetching Pokémon data:", error));
}

function displayPokemonData(name, types, hp, sprite, button) {
    button.innerHTML = `<h3>${name}</h3>
                        <img src="${sprite}" 
                        alt="${name}"> `;

    button.id = `pokemon-${name.toLowerCase().replace(/\s+/g, '-')}`;
    button.classList.remove("pokemon-button");
    button.classList.add("pokemon-clicked");

    console.log(`Updated button ID to ${button.id} with class 'pokemon-clicked'`);
}

function determineStrongerPokemon() {
    if (pokemonsData.length !== 2) return;

    const [pokemon1, pokemon2] = pokemonsData;

    if (pokemon1.hp > pokemon2.hp) {
        console.log(`${pokemon1.name} is stronger with ${pokemon1.hp} HP.`);
    } else if (pokemon1.hp < pokemon2.hp) {
        console.log(`${pokemon2.name} is stronger with ${pokemon2.hp} HP.`);
    } else {
        console.log(`${pokemon1.name} and ${pokemon2.name} have the same HP.`);
    }

    // Clear the comparison state after evaluating
    pokemonsData = [];
}

fetchRandomPokemons();