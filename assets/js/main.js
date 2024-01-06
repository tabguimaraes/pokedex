function initPokemon() {
  const pokemonName = document.querySelector("#pokemonName");
  const pokemonType = document.querySelector("#pokemonType");
  const pokemonHeight = document.querySelector("#pokemonHeight");
  const pokemonWeight = document.querySelector("#pokemonWeight");
  const pokemonSprite = document.querySelector("#pokemonSprite");
  const pokemonSearch = document.querySelector("#pokemonSearch");
  const pokemonInput = document.querySelector("#pokemonInput");
  const btnBefore = document.querySelector("#btnBefore");
  const btnNext = document.querySelector("#btnNext");
  let pokemonID;

  function searchPokemon(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`.toLowerCase()).then(async (pokemon) => {
      if (pokemon.status != 200) {
        pokemonInput.setAttribute("placeholder", "Não encontrado");
        pokemonInput.value = "";
      } else {
        await pokemon.json().then((pokemon) => {
          pokemonInput.setAttribute("placeholder", "Nome ou número");
          pokemonInput.value = "";
          insertSprite(pokemon);
          insertData(pokemon);
          return;
        });
      }
    });
  }
  searchPokemon("1");

  function insertSprite(pokemon) {
    const image = pokemon["sprites"]["other"]["official-artwork"]["front_default"];
    return pokemonSprite.setAttribute("src", image);
  }

  function insertData(pokemon) {
    pokemonID = pokemon["id"];
    pokemonName.innerHTML = `<span><img src="./assets/img/favicon-16x16.png" alt="" /></span>&nbsp;${pokemon["id"]} - ${pokemon["name"]}`;
    pokemonType.innerText = pokemon["types"]["0"]["type"]["name"];
    pokemonHeight.innerText = `${pokemon["height"] * 10}cm`;
    pokemonWeight.innerText = `${pokemon["weight"] / 10}Kg`;
    return;
  }

  function formSearch() {
    pokemonSearch.addEventListener("submit", (event) => {
      event.preventDefault();

      if (pokemonInput.value == 0 || pokemonInput.value === "?") {
        pokemonSprite.src = "./assets/img/missingno_.png";
        pokemonID = 0;
        pokemonName.innerHTML = `<span><img src="./assets/img/favicon-16x16.png" alt="" /></span>&nbsp;${pokemonID} - MissingNo.`;
        pokemonType.innerText = `Tipo: ???`;
        pokemonHeight.innerText = `${10 * 10}cm`;
        pokemonWeight.innerText = `${(3507.2 / 10).toFixed(1)}Kg`;
        pokemonInput.value = "";
        pokemonInput.setAttribute("placeholder", "Nome Ou Número");
      }

      if (pokemonInput.value < 0) {
        pokemonInput.setAttribute("placeholder", "Não encontrado");
        pokemonInput.value = "";
        setTimeout(() => {
          pokemonInput.setAttribute("placeholder", "Nome Ou Número");
        }, 3000);
      } else {
        searchPokemon(pokemonInput.value);
      }
    });
  }
  formSearch();

  function btnSearch() {
    btnBefore.addEventListener("click", () => {
      if (pokemonID <= 1) {
      } else {
        pokemonID = pokemonID - 1;
        searchPokemon(pokemonID);
      }
    });
    btnNext.addEventListener("click", () => {
      pokemonID = pokemonID + 1;
      searchPokemon(pokemonID);
    });
  }

  btnSearch();
}
initPokemon();
