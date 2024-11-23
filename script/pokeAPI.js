// document.getElementById('fetch-button').addEventListener('click', fetchRandomPokemons);

function fetchRandomPokemons() {
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

function createFetchButton(pokemon) {
    const buttonContainer = document.getElementById("buttons-container");
    const button = document.createElement("button");
    button.classList.add("pokemon-button");
    // button.textContent = `Fetch ${pokemon.name}`;
    button.onclick = () => {
        fetchPokemonData(pokemon);
        buttonContainer.removeChild(button);
    };
    buttonContainer.appendChild(button);
}

function fetchPokemonData(pokemon){
    
    fetch(pokemon.url)  
        .then(response => response.json())
        .then((pokeData) => {
            const name = pokeData.name;
            const types = pokeData.types.map(typeInfo => typeInfo.type.name).join(', ');
            const hp = pokeData.stats.find(stat => stat.stat.name === 'hp').base_stat;
            const sprite = pokeData.sprites.front_default;
            
            displayPokemonData(name,  types,  hp, sprite);
        })
        .catch(error => console.error("Error fetching Pokémon data:", error));
}

function displayPokemonData(name, types, hp, sprite) {
    const container = document.getElementById('pokemon-data');
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('pokemon-clicked');
    pokemonDiv.innerHTML = `<h3>${name}</h3>
                            <img src="${sprite}" alt="${name}"> 
                            <p>Type: ${types}</p>
                            <p>HP: ${hp}</p>`;
    container.appendChild(pokemonDiv);
}

fetchRandomPokemons();