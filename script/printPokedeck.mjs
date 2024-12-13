
function printPokedeck() {
   const winnerData = JSON.parse(localStorage.getItem("winnerPokemonList")) || [];
   
   const winnerContainer = document.getElementById("winner-container");
   
   if (winnerData.length === 0) {
       winnerContainer.innerHTML = "<p>You have not caught any pokémon yet! <a href='game.html'>Play the game </a>and catch 'em all!!</p>";
   } else {
       winnerData.forEach((entry, index) => {
          const pokemonCard = document.createElement("div");
          pokemonCard.classList.add("pokemon-card");
          
          pokemonCard.innerHTML = `
            <div>
                <h4>${entry.pokemon1.name}</h4>
                <img src="${entry.pokemon1.sprite}"
                 alt="${entry.pokemon1.name}">
            </div>
            <div>
                <h4>${entry.pokemon2.name}</h4>
                <img src="${entry.pokemon2.sprite}"
                alt="${entry.pokemon2.name}">
            </div>`;
          
          winnerContainer.appendChild(pokemonCard);
       });
   }
   
}

printPokedeck();