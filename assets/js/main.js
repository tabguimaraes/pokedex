function init() {
  const pokemonName = document.querySelector("#pokemonName");
  const pokemonType = document.querySelector("#pokemonType");
  const pokemonHeight = document.querySelector("#pokemonHeight");
  const pokemonWeight = document.querySelector("#pokemonWeight");
  const pokemonSprite = document.querySelector("#pokemonSprite");
  const pokemonSearch = document.querySelector("#pokemonSearch");
  const pokemonInput = document.querySelector("#pokemonInput");
  const btnBefore = document.querySelector("#btnBefore");
  const btnNext = document.querySelector("#btnNext");
  const randomField = document.querySelector("#randomField");
  const randomMsg = document.querySelector("#randomMsg");
  const pkMin = 0;
  const pkMax = 1025;
  const pkSpanIcon = `<span><img src="./assets/img/favicon-16x16.png" alt="ícone de uma pokebola" /></span>&nbsp;`;

  let pkName;
  let pkSprite;
  let pkID = 1;
  let pkTypes;
  let pkTypeName;
  let pkHeigth;
  let pkWeigth;

  function searchPokemon(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`.toLowerCase()).then(async (pokemon) => {
      if (pokemon.status != 200) {
        pokemonInput.setAttribute("placeholder", "Não encontrado");
        pokemonInput.value = "";
      } else {
        await pokemon.json().then((pokemon) => {
          pkID = pokemon["id"];
          pkName = pokemon["name"];
          pkTypes = pokemon["types"];
          pkHeigth = pokemon["height"];
          pkWeigth = pokemon["weight"];
          pkSprite = pokemon["sprites"]["other"]["official-artwork"]["front_default"];

          pokemonInput.setAttribute("placeholder", "Nome ou número");
          pokemonInput.value = "";

          insertSprite(pokemon);
          insertData(pokemon);
          return;
        });
      }
    });
    return;
  }
  searchPokemon(pkID);

  function insertSprite(pokemon) {
    if (pkSprite === null) {
      pokemonSprite.src = "./assets/img/pkball.png";
      pokemonSprite.setAttribute("alt", pkName);
    } else {
      pokemonSprite.setAttribute("alt", pkName);
      pokemonSprite.setAttribute("src", pkSprite);
    }

    return;
  }

  function insertData(pokemon) {
    if (pkID == "778") {
      pokemonName.innerHTML = `${pkSpanIcon}${pkID} - Mimikyu`;
    } else {
      pokemonName.innerHTML = `${pkSpanIcon}${pkID} - ${pkName}`;

      const typeID0 = pokemon["types"]["0"]["type"]["name"];

      switch (typeID0) {
        case "bug":
          pkTypeName = "Inseto";
          pokemonType.innerHTML = `<span class='types ${typeID0}'>${pkTypeName}</span>`;
          break;
        case "dark":
          pkTypeName = "Sombrio";
          pokemonType.innerHTML = `<span class='types ${typeID0}'>${pkTypeName}</span>`;
          break;
        case "dragon":
          pkTypeName = "Dragão";
          pokemonType.innerHTML = `<span class='types ${typeID0}'>${pkTypeName}</span>`;
          break;
        case "electric":
          pkTypeName = "Elétrico";
          pokemonType.innerHTML = `<span class='types ${typeID0}'>${pkTypeName}</span>`;
          break;
        case "fairy":
          pkTypeName = "Fada";
          pokemonType.innerHTML = `<span class='types ${typeID0}'>${pkTypeName}</span>`;
          break;
        case "fighting":
          pkTypeName = "Lutador";
          pokemonType.innerHTML = `<span class='types ${typeID0}'>${pkTypeName}</span>`;
          break;
        case "fire":
          pkTypeName = "Fogo";
          pokemonType.innerHTML = `<span class='types ${typeID0}'>${pkTypeName}</span>`;
          break;
        case "flying":
          pkTypeName = "Voador";
          pokemonType.innerHTML = `<span class='types ${typeID0}'>${pkTypeName}</span>`;
          break;
        case "ghost":
          pkTypeName = "Fantasma";
          pokemonType.innerHTML = `<span class='types ${typeID0}'>${pkTypeName}</span>`;
          break;
        case "grass":
          pkTypeName = "Grama";
          pokemonType.innerHTML = `<span class='types ${typeID0}'>${pkTypeName}</span>`;
          break;
        case "ground":
          pkTypeName = "Terra";
          pokemonType.innerHTML = `<span class='types ${typeID0}'>${pkTypeName}</span>`;
          break;
        case "ice":
          pkTypeName = "Gelo";
          pokemonType.innerHTML = `<span class='types ${typeID0}'>${pkTypeName}</span>`;
          break;
        case "normal":
          pkTypeName = "Normal";
          pokemonType.innerHTML = `<span class='types ${typeID0}'>${pkTypeName}</span>`;
          break;
        case "poison":
          pkTypeName = "Veneno";
          pokemonType.innerHTML = `<span class='types ${typeID0}'>${pkTypeName}</span>`;
          break;
        case "psychic":
          pkTypeName = "Psíquico";
          pokemonType.innerHTML = `<span class='types ${typeID0}'>${pkTypeName}</span>`;
          break;
        case "rock":
          pkTypeName = "Pedra";
          pokemonType.innerHTML = `<span class='types ${typeID0}'>${pkTypeName}</span>`;
          break;
        case "steel":
          pkTypeName = "Metal";
          pokemonType.innerHTML = `<span class='types ${typeID0}'>${pkTypeName}</span>`;
          break;
        case "water":
          pkTypeName = "Água";
          pokemonType.innerHTML = `<span class='types ${typeID0}'>${pkTypeName}</span>`;
          break;

        default:
          break;
      }

      if (pkTypes.length < 2) {
      } else {
        const typeID1 = pokemon["types"]["1"]["type"]["name"];

        switch (typeID1) {
          case "bug":
            pkTypeName = "Inseto";
            pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${pkTypeName}</span>`;
            break;
          case "dark":
            pkTypeName = "Sombrio";
            pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${pkTypeName}</span>`;
            break;
          case "dragon":
            pkTypeName = "Dragão";
            pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${pkTypeName}</span>`;
            break;
          case "electric":
            pkTypeName = "Elétrico";
            pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${pkTypeName}</span>`;
            break;
          case "fairy":
            pkTypeName = "Fada";
            pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${pkTypeName}</span>`;
            break;
          case "fighting":
            pkTypeName = "Lutador";
            pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${pkTypeName}</span>`;
            break;
          case "fire":
            pkTypeName = "Fogo";
            pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${pkTypeName}</span>`;
            break;
          case "flying":
            pkTypeName = "Voador";
            pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${pkTypeName}</span>`;
            break;
          case "ghost":
            pkTypeName = "Fantasma";
            pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${pkTypeName}</span>`;
            break;
          case "grass":
            pkTypeName = "Grama";
            pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${pkTypeName}</span>`;
            break;
          case "ground":
            pkTypeName = "Terra";
            pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${pkTypeName}</span>`;
            break;
          case "ice":
            pkTypeName = "Gelo";
            pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${pkTypeName}</span>`;
            break;
          case "normal":
            pkTypeName = "Normal";
            pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${pkTypeName}</span>`;
            break;
          case "poison":
            pkTypeName = "Veneno";
            pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${pkTypeName}</span>`;
            break;
          case "psychic":
            pkTypeName = "Psíquico";
            pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${pkTypeName}</span>`;
            break;
          case "rock":
            pkTypeName = "Pedra";
            pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${pkTypeName}</span>`;
            break;
          case "steel":
            pkTypeName = "Metal";
            pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${pkTypeName}</span>`;
            break;
          case "water":
            pkTypeName = "Água";
            pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${pkTypeName}</span>`;
            break;

          default:
            break;
        }
      }
      pokemonHeight.innerText = `${pkHeigth * 10}cm`;
      pokemonWeight.innerText = `${pkWeigth / 10}Kg`;
      return;
    }
  }

  function formSearch() {
    pokemonSearch.addEventListener("submit", (event) => {
      event.preventDefault();
      let pkMissingNo = +pokemonInput.value;
      if (pkMissingNo === 0 || pokemonInput.value === "?") {
        pokemonSprite.src = "./assets/img/missingno.png";
        pkID = 0;
        pokemonName.innerHTML = `${pkSpanIcon}${pkID} - MissingNo.`;
        pokemonType.innerText = "Tipo: ???";
        pokemonHeight.innerText = `${10 * 10}cm`;
        pokemonWeight.innerText = `${(3507.2 / 10).toFixed(1)}Kg`;
        pokemonInput.value = "";
        pokemonInput.setAttribute("placeholder", "Nome Ou Número");
      } else if (pkMissingNo < 0) {
        pokemonInput.setAttribute("placeholder", "Não encontrado");
        pokemonInput.value = "";
        setTimeout(() => {
          pokemonInput.setAttribute("placeholder", "Nome Ou Número");
        }, 3000);
      } else {
        if (+pokemonInput.value > pkMax) {
          pokemonName.innerText = "";
          pokemonType.innerText = "";
          pokemonHeight.innerText = "";
          pokemonWeight.innerText = "";
          pokemonInput.value = "";
          pokemonInput.setAttribute("placeholder", "Não encontrado");

          setTimeout(() => {
            pokemonInput.setAttribute("placeholder", "Nome Ou Número");
          }, 3000);
        } else {
          pkID = +pokemonInput.value;
          searchPokemon(pokemonInput.value);
        }
      }
    });
    return;
  }
  formSearch();

  function btnSearch() {
    btnBefore.addEventListener("click", () => {
      if (pkID <= 1 || pkID > pkMax) {
      } else {
        pkID--;
        searchPokemon(pkID);
      }
    });

    btnNext.addEventListener("click", () => {
      pkID++;
      if (pkID > pkMax) {
        pkID--;
      } else {
        searchPokemon(pkID);
      }
    });

    return;
  }

  btnSearch();

  function randomPokemon() {
    randomField.addEventListener("mouseover", () => {
      randomMsg.style.opacity = "1";
      randomMsg.style.transition = ".5s";
      setTimeout(() => {
        randomMsg.style.opacity = "0";
        randomMsg.style.transition = ".5s";
      }, 1000);
    });

    randomField.addEventListener("click", () => {
      pkID = Math.floor(Math.random() * (pkMax - pkMin) + pkMin);
      searchPokemon(pkID);
      return;
    });
  }
  randomPokemon();
}
init();
