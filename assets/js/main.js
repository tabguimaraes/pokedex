function init() {
  const container = document.querySelector("#container"),
    tvBezel = document.querySelector("#tvBezel"),
    pokemonSprite = document.querySelector("#pokemonSprite"),
    pokemonName = document.querySelector("#pokemonName"),
    pokemonType = document.querySelector("#pokemonType"),
    pokemonHeight = document.querySelector("#pokemonHeight"),
    pokemonWeight = document.querySelector("#pokemonWeight"),
    pokemonSearch = document.querySelector("#pokemonSearch"),
    pokemonInput = document.querySelector("#pokemonInput"),
    btnBefore = document.querySelector("#btnBefore"),
    btnNext = document.querySelector("#btnNext"),
    randomField = document.querySelector("#randomField"),
    randomMsg = document.querySelector("#randomMsg"),
    pkSpanIcon = `<span><img src="./assets/img/favicon-16x16.png" alt="ícone de uma pokebola" /></span>&nbsp;`,
    pkMin = 0,
    pkMax = 1025;

  let pkID = 1,
    pkName,
    pkTypes,
    pkHeigth,
    pkWeigth,
    pkSprite;

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
      const searchResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`.toLowerCase()),
        data = await searchResponse.json();

      const {
        id,
        name,
        types,
        height,
        weight,
        sprites: {
          other: {
            "official-artwork": { front_default },
          },
        },
      } = data;

      pkID = id;
      pkName = name;
      pkTypes = types;
      pkHeigth = height;
      pkWeigth = weight;
      pkSprite = front_default;

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

      function insertType1(typeName) {
        pokemonType.innerHTML = `<span class='types ${typeID0}'>${typeName}</span>`;
      }

      switch (typeID0) {
        case "bug":
          insertType1("Inseto");
          break;
        case "dark":
          insertType1("Sombrio");
          break;
        case "dragon":
          insertType1("Dragão");
          break;
        case "electric":
          insertType1("Elétrico");
          break;
        case "fairy":
          insertType1("Fada");
          break;
        case "fighting":
          insertType1("Lutador");
          break;
        case "fire":
          insertType1("Fogo");
          break;
        case "flying":
          insertType1("Voador");
          break;
        case "ghost":
          insertType1("Fantasma");
          break;
        case "grass":
          insertType1("Grama");
          break;
        case "ground":
          insertType1("Terra");
          break;
        case "ice":
          insertType1("Gelo");
          break;
        case "normal":
          insertType1("Normal");
          break;
        case "poison":
          insertType1("Veneno");
          break;
        case "psychic":
          insertType1("Psíquico");
          break;
        case "rock":
          insertType1("Pedra");
          break;
        case "steel":
          insertType1("Metal");
          break;
        case "water":
          insertType1("Água");
          break;

        default:
          break;
      }

      if (pkTypes.length < 2) {
      } else {
        const typeID1 = pkTypes["1"]["type"]["name"];

        function insertType2(typeName) {
          pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${typeName}</span>`;
        }

        switch (typeID1) {
          case "bug":
            insertType2("Inseto");
            break;
          case "dark":
            insertType2("Sombrio");
            break;
          case "dragon":
            insertType2("Dragão");
            break;
          case "electric":
            insertType2("Elétrico");
            break;
          case "fairy":
            insertType2("Fada");
            break;
          case "fighting":
            insertType2("Lutador");
            break;
          case "fire":
            insertType2("Fogo");
            break;
          case "flying":
            insertType2("Voador");
            break;
          case "ghost":
            insertType2("Fantasma");
            break;
          case "grass":
            insertType2("Grama");
            break;
          case "ground":
            insertType2("Terra");
            break;
          case "ice":
            insertType2("Gelo");
            break;
          case "normal":
            insertType2("Normal");
            break;
          case "poison":
            insertType2("Veneno");
            break;
          case "psychic":
            insertType2("Psíquico");
            break;
          case "rock":
            insertType2("Pedra");
            break;
          case "steel":
            insertType2("Metal");
            break;
          case "water":
            insertType2("Água");
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
