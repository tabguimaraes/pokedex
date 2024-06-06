function init() {
  const body = {
    container: document.querySelector("#container"),
    tvBezel: document.querySelector("#tvBezel"),
    pokemonSprite: document.querySelector("#pokemonSprite"),
    pokemonName: document.querySelector("#pokemonName"),
    pokemonType: document.querySelector("#pokemonType"),
    pokemonHeight: document.querySelector("#pokemonHeight"),
    pokemonWeight: document.querySelector("#pokemonWeight"),
    pokemonSearch: document.querySelector("#pokemonSearch"),
    pokemonInput: document.querySelector("#pokemonInput"),
    btnBefore: document.querySelector("#btnBefore"),
    btnNext: document.querySelector("#btnNext"),
    randomField: document.querySelector("#randomField"),
    randomMsg: document.querySelector("#randomMsg"),
    pkSpanIcon: `<span><img src="./assets/img/favicon-16x16.png" alt="ícone de uma pokebola" /></span>&nbsp;`,
    pkMin: 0,
    pkMax: 1025,
  };

  function showContainer(response) {
    response ? searchPokemon(1) : body.container.classList.add("hidden");
  }

  async function checkTVBezel() {
    const fetchTVBezel = await fetch(body.tvBezel.src);
    showContainer(fetchTVBezel.ok);
  }
  checkTVBezel();

  async function searchPokemon(pokemon) {
    body.tvBezel.setAttribute("src", "./assets/img/tv_no_signal.png");
    body.tvBezel.setAttribute("alt", "Figura de uma televisão sem sinal");
    body.pokemonInput.value = "Sintonizando...";
    try {
      const searchResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`.toLowerCase()),
        data = ({
          id: pkID,
          name: pkName,
          types: pkTypes,
          height: pkHeigth,
          weight: pkWeigth,
          sprites: {
            other: {
              "official-artwork": { front_default: pkSprite },
            },
          },
        } = await searchResponse.json());
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
      body.tvBezel.setAttribute("alt", `Figura de uma televisão mostrando o pokemon ${pkName}`);
      body.tvBezel.setAttribute("src", "./assets/img/tv_bezel.png");
    }, 500);
    setTimeout(() => {
      body.pokemonInput.value = "";
    }, 900);
  }

  function notFound() {
    clearFields();
    setPlaceHolder("notReady");
    body.randomField.classList.add("hidden");
    body.tvBezel.setAttribute("src", "./assets/img/tv_no_signal.png");
    body.tvBezel.setAttribute("alt", "Figura de uma televisão sem sinal");
    setTimeout(() => {
      setPlaceHolder("ready");
    }, 3000);
  }

  function clearFields() {
    body.pokemonName.innerText = "";
    body.pokemonType.innerText = "";
    body.pokemonHeight.innerText = "";
    body.pokemonWeight.innerText = "";
    body.pokemonSprite.setAttribute("alt", "");
    body.pokemonSprite.setAttribute("src", "");
  }

  function setPlaceHolder(type) {
    if (type === "ready") {
      body.pokemonInput.value = "";
      body.pokemonInput.setAttribute("placeholder", "Nome Ou Número");
    }
    if (type === "notReady") {
      body.pokemonInput.value = "Sintonizando...";
      setTimeout(() => {
        body.pokemonInput.setAttribute("placeholder", "Fora do Ar");
        body.pokemonInput.value = "";
      }, 500);
    }
  }

  function insertSprite() {
    if (pkSprite === null) {
      body.pokemonSprite.setAttribute("src", "./assets/img/pkball.png");
      body.pokemonSprite.setAttribute("alt", pkName);
    } else {
      body.pokemonSprite.setAttribute("alt", pkName);
      body.pokemonSprite.setAttribute("src", pkSprite);
    }
  }

  function insertData() {
    if (pkID === 778) {
      body.pokemonName.innerHTML = `${body.pkSpanIcon}${pkID} - Mimikyu`;
    } else {
      body.pokemonName.innerHTML = `${body.pkSpanIcon}${pkID} - ${pkName}`;

      const typeID0 = pkTypes["0"]["type"]["name"];

      function insertType1(typeName) {
        body.pokemonType.innerHTML = `<span class='types ${typeID0}'>${typeName}</span>`;
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

      if (pkTypes.length > 1) {
        const typeID1 = pkTypes["1"]["type"]["name"];

        function insertType2(typeName) {
          body.pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${typeName}</span>`;
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
      body.pokemonHeight.innerText = `${pkHeigth * 10}cm`;
      body.pokemonWeight.innerText = `${pkWeigth / 10}Kg`;
    }
  }

  function missingNo() {
    body.tvBezel.setAttribute("src", "./assets/img/tv_bezel.png");
    body.randomField.classList.remove("hidden");
    body.pokemonSprite.src = "./assets/img/missingno.png";
    pkID = body.pkMin;
    body.pokemonName.innerHTML = `${body.pkSpanIcon}${pkID} - MissingNo.`;
    body.pokemonType.innerText = "Tipo: ???";
    body.pokemonHeight.innerText = `${10 * 10}cm`;
    body.pokemonWeight.innerText = `${(3507.2 / 10).toFixed(1)}Kg`;
    body.pokemonInput.value = "!@#ERR0R";
    setPlaceHolder("ready");
    setTimeout(() => {
      body.pokemonInput.value = "";
    }, 3000);
  }

  function formSearch() {
    body.pokemonSearch.addEventListener("submit", (event) => {
      event.preventDefault();

      if (+body.pokemonInput.value === body.pkMin || body.pokemonInput.value === "?") {
        missingNo();
      } else if (+body.pokemonInput.value < body.pkMin || +body.pokemonInput.value > body.pkMax) {
        notFound();
      } else {
        body.randomField.classList.remove("hidden");
        clearFields();
        searchPokemon(body.pokemonInput.value);
      }
    });
  }
  formSearch();

  function btnSearch() {
    body.btnBefore.addEventListener("click", () => {
      if (pkID >= 2) {
        pkID--;
        body.randomField.classList.remove("hidden");
        clearFields();
        searchPokemon(pkID);
      }
    });

    body.btnNext.addEventListener("click", () => {
      pkID++;
      if (pkID > body.pkMax) {
        pkID--;
      } else {
        body.randomField.classList.remove("hidden");
        clearFields();
        searchPokemon(pkID);
      }
    });
  }

  btnSearch();

  function randomPokemon() {
    body.randomField.addEventListener("mouseenter", () => {
      body.randomMsg.style.opacity = "1";
      body.randomMsg.style.transition = ".5s";
    });

    body.randomField.addEventListener("mouseleave", () => {
      body.randomMsg.style.opacity = "0";
      body.randomMsg.style.transition = ".5s";
    });

    body.randomField.addEventListener("click", () => {
      body.randomMsg.style.opacity = "0";
      pkID = Math.floor(Math.random() * (body.pkMax - body.pkMin) + body.pkMin);
      clearFields();
      searchPokemon(pkID);
    });
  }
  randomPokemon();
}
init();
