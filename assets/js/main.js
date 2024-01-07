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
  let typeName;

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
    pokemonName.innerHTML = `<span><img src="./assets/img/favicon-16x16.png" alt="" /></span>&nbsp;${pokemonID} - ${pokemon["name"]}`;

    const typeID0 = pokemon["types"]["0"]["type"]["name"];

    switch (typeID0) {
      case "bug":
        typeName = "Inseto";
        pokemonType.innerHTML = `<span class='types ${typeID0}'>${typeName}</span>`;
        break;
      case "dark":
        typeName = "Sombrio";
        pokemonType.innerHTML = `<span class='types ${typeID0}'>${typeName}</span>`;
        break;
      case "dragon":
        typeName = "Dragão";
        pokemonType.innerHTML = `<span class='types ${typeID0}'>${typeName}</span>`;
        break;
      case "electric":
        typeName = "Elétrico";
        pokemonType.innerHTML = `<span class='types ${typeID0}'>${typeName}</span>`;
        break;
      case "fairy":
        typeName = "Fada";
        pokemonType.innerHTML = `<span class='types ${typeID0}'>${typeName}</span>`;
        break;
      case "fighting":
        typeName = "Lutador";
        pokemonType.innerHTML = `<span class='types ${typeID0}'>${typeName}</span>`;
        break;
      case "fire":
        typeName = "Fogo";
        pokemonType.innerHTML = `<span class='types ${typeID0}'>${typeName}</span>`;
        break;
      case "flying":
        typeName = "Voador";
        pokemonType.innerHTML = `<span class='types ${typeID0}'>${typeName}</span>`;
        break;
      case "ghost":
        typeName = "Fantasma";
        pokemonType.innerHTML = `<span class='types ${typeID0}'>${typeName}</span>`;
        break;
      case "grass":
        typeName = "Grama";
        pokemonType.innerHTML = `<span class='types ${typeID0}'>${typeName}</span>`;
        break;
      case "ground":
        typeName = "Terra";
        pokemonType.innerHTML = `<span class='types ${typeID0}'>${typeName}</span>`;
        break;
      case "ice":
        typeName = "Gelo";
        pokemonType.innerHTML = `<span class='types ${typeID0}'>${typeName}</span>`;
        break;
      case "normal":
        typeName = "Normal";
        pokemonType.innerHTML = `<span class='types ${typeID0}'>${typeName}</span>`;
        break;
      case "poison":
        typeName = "Veneno";
        pokemonType.innerHTML = `<span class='types ${typeID0}'>${typeName}</span>`;
        break;
      case "psychic":
        typeName = "Psíquico";
        pokemonType.innerHTML = `<span class='types ${typeID0}'>${typeName}</span>`;
        break;
      case "rock":
        typeName = "Pedra";
        pokemonType.innerHTML = `<span class='types ${typeID0}'>${typeName}</span>`;
        break;
      case "steel":
        typeName = "Metal";
        pokemonType.innerHTML = `<span class='types ${typeID0}'>${typeName}</span>`;
        break;
      case "water":
        typeName = "Água";
        pokemonType.innerHTML = `<span class='types ${typeID0}'>${typeName}</span>`;
        break;

      default:
        break;
    }

    if (pokemon["types"].length < 2) {
    } else {
      const typeID1 = pokemon["types"]["1"]["type"]["name"];

      switch (typeID1) {
        case "bug":
          typeName = "Inseto";
          pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${typeName}</span>`;
          break;
        case "dark":
          typeName = "Sombrio";
          pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${typeName}</span>`;
          break;
        case "dragon":
          typeName = "Dragão";
          pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${typeName}</span>`;
          break;
        case "electric":
          typeName = "Elétrico";
          pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${typeName}</span>`;
          break;
        case "fairy":
          typeName = "Fada";
          pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${typeName}</span>`;
          break;
        case "fighting":
          typeName = "Lutador";
          pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${typeName}</span>`;
          break;
        case "fire":
          typeName = "Fogo";
          pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${typeName}</span>`;
          break;
        case "flying":
          typeName = "Voador";
          pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${typeName}</span>`;
          break;
        case "ghost":
          typeName = "Fantasma";
          pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${typeName}</span>`;
          break;
        case "grass":
          typeName = "Grama";
          pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${typeName}</span>`;
          break;
        case "ground":
          typeName = "Terra";
          pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${typeName}</span>`;
          break;
        case "ice":
          typeName = "Gelo";
          pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${typeName}</span>`;
          break;
        case "normal":
          typeName = "Normal";
          pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${typeName}</span>`;
          break;
        case "poison":
          typeName = "Veneno";
          pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${typeName}</span>`;
          break;
        case "psychic":
          typeName = "Psíquico";
          pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${typeName}</span>`;
          break;
        case "rock":
          typeName = "Pedra";
          pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${typeName}</span>`;
          break;
        case "steel":
          typeName = "Metal";
          pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${typeName}</span>`;
          break;
        case "water":
          typeName = "Água";
          pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${typeName}</span>`;
          break;

        default:
          break;
      }
    }
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
        pokemonType.innerText = "Tipo: ???";
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
