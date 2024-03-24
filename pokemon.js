function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
   }
   

// Function to fetch Pokémon data from the API
async function fetchPokemon(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      // Obtain the div element to append the Pokémon details
      const pokemonsDiv = document.getElementById('pokemons');
  
      // Create a div element for each Pokémon
      const pokemonDiv = document.createElement('div');
      pokemonDiv.id = data.name;
      pokemonDiv.classList.add('pokemon');
  
      // Create the element for Pokémon ID
      const idElement = document.createElement('p');
      idElement.classList.add('pid');
      idElement.textContent = String(data.id).padStart(3, '0');
      pokemonDiv.appendChild(idElement);
  
      // Create the image element
      const imageElement = document.createElement('img');
      imageElement.src = data.sprites.front_default;
      pokemonDiv.appendChild(imageElement);
  
      // Create the element for Pokémon name
      const nameElement = document.createElement('p');
      nameElement.classList.add('name');
      nameElement.textContent = data.name.toUpperCase();
      pokemonDiv.appendChild(nameElement);
  
      // Create the element for Pokémon types
      const typeElement = document.createElement('p');
      typeElement.classList.add('type');
      typeElement.textContent = data.types
        .map(type => type.type.name)
        .join(', ')
        .toUpperCase();
      pokemonDiv.appendChild(typeElement);
  
      // Append the Pokémon div to the main container
      pokemonsDiv.appendChild(pokemonDiv);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    }
  }
  
  // Function to fetch a list of Pokémon
  async function fetchPokemons() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
      const data = await response.json();
  
      // Iterate through the list of Pokémon
      for (const pokemon of data.results) {
        await fetchPokemon(pokemon.url);
      }
    } catch (error) {
      console.error('Error fetching Pokémon list:', error);
    }
  }
  
  // Call the fetchPokemons function to populate the web page
  fetchPokemons();

