function init() {
  const container = document.querySelector("#container");
  const tvBezel = document.querySelector("#tvBezel");
  const pokemonSprite = document.querySelector("#pokemonSprite");
  const pokemonName = document.querySelector("#pokemonName");
  const pokemonType = document.querySelector("#pokemonType");
  const pokemonHeight = document.querySelector("#pokemonHeight");
  const pokemonWeight = document.querySelector("#pokemonWeight");
  const pokemonSearch = document.querySelector("#pokemonSearch");
  const pokemonInput = document.querySelector("#pokemonInput");
  const btnBefore = document.querySelector("#btnBefore");
  const btnNext = document.querySelector("#btnNext");
  const randomField = document.querySelector("#randomField");
  const randomMsg = document.querySelector("#randomMsg");
  const pkSpanIcon = `<span><img src="./assets/img/favicon-16x16.png" alt="ícone de uma pokebola" /></span>&nbsp;`;
  const pkMin = 0;
  const pkMax = 1025;

  let pkID = 1;
  let pkName;
  let pkTypes;
  let pkTypeName;
  let pkHeigth;
  let pkWeigth;
  let pkSprite;

  function showContainer(response) {
    response ? searchPokemon(pkID) : container.classList.add("hidden");
  }

  async function checkTVBezel() {
    const fetchTVBezel = await fetch(tvBezel.src);
    showContainer(fetchTVBezel.ok);
  }
  checkTVBezel();

  async function searchPokemon(pokemon) {
    pokemonInput.value = "Buscando...";
    try {
      const searchResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`.toLowerCase());
      const data = await searchResponse.json();

      pkID = data["id"];
      pkName = data["name"];
      pkTypes = data["types"];
      pkHeigth = data["height"];
      pkWeigth = data["weight"];
      pkSprite = data["sprites"]["other"]["official-artwork"]["front_default"];

      searchFound();
    } catch {
      notFound();
    }
  }
  function searchFound() {
    setTimeout(() => {
      insertSprite();
      insertData();
      setPlaceHolder("ready");
      pokemonInput.value = "";
      tvBezel.setAttribute("src", "./assets/img/tv_bezel.png");
      tvBezel.setAttribute("alt", `Figura de uma televisão mostrando o pokemon ${pkName}`);
    }, 500);
  }

  function notFound() {
    setPlaceHolder("notReady");
    pokemonInput.value = "";
    pokemonName.innerText = "";
    pokemonType.innerText = "";
    pokemonHeight.innerText = "";
    pokemonWeight.innerText = "";
    pokemonSprite.setAttribute("alt", "");
    pokemonSprite.setAttribute("src", "");
    tvBezel.setAttribute("src", "./assets/img/tv_no_signal.png");
    tvBezel.setAttribute("alt", "Figura de uma televisão sem sinal");
    randomField.classList.add("hidden");
    setTimeout(() => {
      setPlaceHolder("ready");
    }, 3000);
  }

  function setPlaceHolder(type) {
    if (type === "ready") {
      pokemonInput.setAttribute("placeholder", "Nome Ou Número");
    }
    if (type === "notReady") {
      pokemonInput.setAttribute("placeholder", "Não encontrado");
    }
  }

  function insertSprite() {
    if (pkSprite === null) {
      pokemonSprite.setAttribute("src", "./assets/img/pkball.png");
      pokemonSprite.setAttribute("alt", pkName);
    } else {
      pokemonSprite.setAttribute("alt", pkName);
      pokemonSprite.setAttribute("src", pkSprite);
    }
  }

  function insertData() {
    if (pkID === 778) {
      pokemonName.innerHTML = `${pkSpanIcon}${pkID} - Mimikyu`;
    } else {
      pokemonName.innerHTML = `${pkSpanIcon}${pkID} - ${pkName}`;

      const typeID0 = pkTypes["0"]["type"]["name"];

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
        const typeID1 = pkTypes["1"]["type"]["name"];

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
    }
  }

  function missingNo() {
    tvBezel.setAttribute("src", "./assets/img/tv_bezel.png");
    randomField.classList.remove("hidden");
    pokemonSprite.src = "./assets/img/missingno.png";
    pkID = pkMin;
    pokemonName.innerHTML = `${pkSpanIcon}${pkID} - MissingNo.`;
    pokemonType.innerText = "Tipo: ???";
    pokemonHeight.innerText = `${10 * 10}cm`;
    pokemonWeight.innerText = `${(3507.2 / 10).toFixed(1)}Kg`;
    pokemonInput.value = "";
    setPlaceHolder("ready");
  }

  function formSearch() {
    pokemonSearch.addEventListener("submit", (event) => {
      event.preventDefault();

      if (+pokemonInput.value === pkMin || pokemonInput.value === "?") {
        missingNo();
      } else if (+pokemonInput.value < pkMin || +pokemonInput.value > pkMax) {
        notFound();
      } else {
        randomField.classList.remove("hidden");
        searchPokemon(pokemonInput.value);
      }
    });
  }
  formSearch();

  function btnSearch() {
    btnBefore.addEventListener("click", () => {
      if (pkID <= 1 || pkID > pkMax) {
      } else {
        randomField.classList.remove("hidden");
        pkID--;
        searchPokemon(pkID);
      }
    });

    btnNext.addEventListener("click", () => {
      pkID++;
      if (pkID > pkMax) {
        pkID--;
      } else {
        randomField.classList.remove("hidden");
        searchPokemon(pkID);
      }
    });
  }

  btnSearch();

  function randomPokemon() {
    randomField.addEventListener("mouseenter", () => {
      randomMsg.style.opacity = "1";
      randomMsg.style.transition = ".5s";
    });

    randomField.addEventListener("mouseleave", () => {
      randomMsg.style.opacity = "0";
      randomMsg.style.transition = ".5s";
    });

    randomField.addEventListener("click", () => {
      pkID = Math.floor(Math.random() * (pkMax - pkMin) + pkMin);
      searchPokemon(pkID);
    });
  }
  randomPokemon();
}
init();
