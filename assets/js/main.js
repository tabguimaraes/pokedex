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
  const type1 = document.querySelector("#type1");
  const type2 = document.querySelector("#type2");
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
    switch (pokemon["types"]["0"]["type"]["name"]) {
      case "grass":
        pokemonType.innerHTML = `<span class='types grass'>Grama</span>`;
        break;
      case "normal":
        pokemonType.innerText = "Normal";
        break;
      case "poison":
        pokemonType.innerText = "Veneno";
        break;
      case "fire":
        pokemonType.innerHTML = `<span class='types fire'>Fogo</span>`;
        break;
      case "fly":
        pokemonType.innerText = "Voador";
        break;
      case "water":
        pokemonType.innerHTML = `<span class='types water'>Água</span>`;
        break;
      case "bug":
        pokemonType.innerText = "Inseto";
        break;
      case "ground":
        pokemonType.innerText = "Terra";
        break;
      case "psychic":
        pokemonType.innerText = "Psíquico";
        break;
      case "ghost":
        pokemonType.innerText = "Fantasma";
        break;
      case "rock":
        pokemonType.innerText = "Pedra";
        break;
      case "electric":
        pokemonType.innerText = "Elétrico";
        break;
      case "fairy":
        pokemonType.innerText = "Fada";
        break;
      case "fighting":
        pokemonType.innerText = "Lutador";
        break;
      case "ice":
        pokemonType.innerText = "Gelo";
        break;
      case "steel":
        pokemonType.innerText = "Metal";
        break;
      case "dragon":
        pokemonType.innerText = "Dragão";
        break;
      case "dark":
        pokemonType.innerText = "Sombrio";
        break;

      default:
        break;
    }
    switch (pokemon["types"]["1"]["type"]["name"]) {
      case "poison":
        pokemonType.innerHTML += `&nbsp;<span class='types poison'>Veneno</span>`;
        break;

      //   case "grass":
      //     // pokemonType.innerText += " | Grama";
      //     pokemonType.innerHTML += `<span class='grass'>Grama</span>`;

      //     break;
      //   case "normal":
      //     pokemonType.innerText += " | Normal";
      //     break;
      //   case "poison":
      //     pokemonType.innerText += " | Veneno";
      //     break;
      //   case "fire":
      //     pokemonType.innerText += " | Fogo";
      //     break;
      //   case "flying":
      //     pokemonType.innerText += " | Voador";
      //     break;
      //   case "water":
      //     pokemonType.innerText += " | Água";
      //     break;
      //   case "bug":
      //     pokemonType.innerText += " | Inseto";
      //     break;
      //   case "ground":
      //     pokemonType.innerText += " | Terra";
      //     break;
      //   case "psychic":
      //     pokemonType.innerText += " | Psíquico";
      //     break;
      //   case "ghost":
      //     pokemonType.innerText += " | Fantasma";
      //     break;
      //   case "rock":
      //     pokemonType.innerText += " | Pedra";
      //     break;
      //   case "electric":
      //     pokemonType.innerText += " | Elétrico";
      //     break;
      //   case "fairy":
      //     pokemonType.innerText += " | Fada";
      //     break;
      //   case "fighting":
      //     pokemonType.innerText += " | Lutador";
      //     break;
      //   case "ice":
      //     pokemonType.innerText += " | Gelo";
      //     break;
      //   case "steel":
      //     pokemonType.innerText += " | Metal";
      //     break;
      //   case "dragon":
      //     pokemonType.innerText += " | Dragão";
      //     break;
      //   case "dark":
      //     pokemonType.innerText += " | Sombrio";
      //     break;

      default:
        break;
    }
    pokemonHeight.innerText = `${pokemon["height"] * 10}cm`;
    pokemonWeight.innerText = `${pokemon["weight"] / 10}Kg`;
    return;
  }

  function formSearch() {
    pokemonSearch.addEventListener("submit", (event) => {
      event.preventDefault();

      if (pokemonInput.value == 0) {
        pokemonSprite.src = "./assets/img/missingno_.png";
        pokemonID = 0;
        pokemonName.innerHTML = `<span><img src="./assets/img/favicon-16x16.png" alt="" /></span>&nbsp;${pokemonID} - MissingNo.`;
        pokemonType.innerText = `Bird | Normal`;
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
