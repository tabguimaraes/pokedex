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
    pokemonCries: document.querySelector("#pokemonCries"),
    btnBefore: document.querySelector("#btnBefore"),
    btnNext: document.querySelector("#btnNext"),
    randomField: document.querySelector("#randomField"),
    randomMsg: document.querySelector("#randomMsg"),
    pkSpanIcon: `<span><img src="./assets/img/favicon-16x16.png" alt="ícone de uma pokebola" /></span>&nbsp;`,
    pkMin: 0,
    pkMax: 1025,
    switchAudio: document.querySelector("#switchAudio"),
    failAudio: document.querySelector("#failAudio"),
    btnVolumeOn: document.querySelector(".fa-volume-high"),
    btnVolumeOff: document.querySelector(".fa-volume-xmark"),
    volMSG: document.querySelector("#volMSG"),
  };

  const typeNames = {
    bug: "Inseto",
    dark: "Sombrio",
    dragon: "Dragão",
    electric: "Elétrico",
    fairy: "Fada",
    fighting: "Lutador",
    fire: "Fogo",
    flying: "Voador",
    ghost: "Fantasma",
    grass: "Grama",
    ground: "Terra",
    ice: "Gelo",
    normal: "Normal",
    poison: "Veneno",
    psychic: "Psíquico",
    rock: "Pedra",
    steel: "Metal",
    water: "Água",
  };

  async function checkTVBezel() {
    const fetchTVBezel = await fetch(body.tvBezel.src);
    fetchTVBezel.ok ? searchPokemon(1) : addClass(body.container, "hidden");

    function tuneIn() {
      body.failAudio.pause();
      body.randomField.classList.toggle("hidden");
      body.tvBezel.setAttribute("src", "./assets/img/tv_no_signal.png");
      body.tvBezel.setAttribute("alt", "Figura de uma televisão sem sinal");
      body.pokemonInput.value = "Sintonizando...";
      body.switchAudio.play();
    }

    async function searchPokemon(pokemon) {
      tuneIn();
      removeClass(body.container, "hidden");
      try {
        const searchResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`.toLowerCase()),
          data = ({
            id: pkID,
            name: pkName,
            types: pkTypes,
            height: pkHeigth,
            weight: pkWeigth,
            cries: { latest: pkCries },
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
        body.switchAudio.pause();
        setPlaceHolder("ready");
        body.tvBezel.setAttribute("alt", `Figura de uma televisão mostrando o pokemon ${pkName}`);
        body.tvBezel.setAttribute("src", "./assets/img/tv_bezel.png");
        body.randomField.classList.toggle("hidden");
        insertData();
        insertSprite();
      }, 500);
      setTimeout(() => {
        body.pokemonInput.value = "";
      }, 900);
    }

    function notFound() {
      body.failAudio.play();
      clearFields();
      setPlaceHolder("notReady");
      body.randomField.classList.toggle("hidden");
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
      setTimeout(() => {
        if (pkSprite === null) {
          body.pokemonSprite.setAttribute("src", "./assets/img/pkball.png");
          body.pokemonSprite.setAttribute("alt", pkName);
        } else {
          body.pokemonSprite.setAttribute("alt", pkName);
          body.pokemonSprite.setAttribute("src", pkSprite);
          setPokemonCries();
        }
      }, 100);
    }

    function insertData() {
      if (pkID === 778) {
        body.pokemonName.innerHTML = `${body.pkSpanIcon}${pkID} - Mimikyu`;
      } else {
        body.pokemonName.innerHTML = `${body.pkSpanIcon}${pkID} - ${pkName}`;

        const typeID0 = pkTypes["0"]["type"]["name"];

        function insertType1(typeID0) {
          const typeName = typeNames[typeID0];
          if (typeName) {
            body.pokemonType.innerHTML = `<span class='types ${typeID0}'>${typeName}</span>`;
          }
        }
        insertType1(typeID0);

        if (pkTypes.length > 1) {
          const typeID1 = pkTypes["1"]["type"]["name"];

          function insertType2(typeID1) {
            const typeName = typeNames[typeID1];
            if (typeName) {
              body.pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${typeName}</span>`;
            }
          }
          insertType2(typeID1);
        }
        body.pokemonHeight.innerText = `${pkHeigth * 10}cm`;
        body.pokemonWeight.innerText = `${pkWeigth / 10}Kg`;
      }
    }

    function missingNo() {
      clearFields();
      tuneIn();
      setTimeout(() => {
        body.switchAudio.pause();
        body.tvBezel.setAttribute("src", "./assets/img/tv_bezel.png");
        body.pokemonSprite.src = "./assets/img/missingno.png";
        pkID = body.pkMin;
        body.pokemonName.innerHTML = `${body.pkSpanIcon}${pkID} - MissingNo.`;
        body.pokemonType.innerText = "Tipo: ???";
        body.pokemonHeight.innerText = `${10 * 10}cm`;
        body.pokemonWeight.innerText = `${(3507.2 / 10).toFixed(1)}Kg`;
        body.pokemonInput.value = "!@#ERR0R";
        setPokemonCries();
        body.randomField.classList.toggle("hidden");
      }, 1000);
      setTimeout(() => {
        setPlaceHolder("ready");
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
          removeClass(body.randomField, "hidden");
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
          addClass(body.randomField, "hidden");
          clearFields();
          searchPokemon(pkID);
          body.randomField.classList.toggle("hidden");
        }
      });

      body.btnNext.addEventListener("click", () => {
        pkID++;
        if (pkID > body.pkMax) {
          pkID--;
        } else {
          addClass(body.randomField, "hidden");
          clearFields();
          searchPokemon(pkID);
          body.randomField.classList.toggle("hidden");
        }
      });
    }
    btnSearch();

    function randomPokemon() {
      body.randomField.addEventListener("click", () => {
        hideSpan(body.randomMsg);
        pkID = Math.floor(Math.random() * (body.pkMax - body.pkMin) + body.pkMin);
        clearFields();
        searchPokemon(pkID);
      });
      eventListener(body.randomField, "mouseenter", () => showSpan(body.randomMsg));
      eventListener(body.randomField, "mouseleave", () => hideSpan(body.randomMsg));
    }
    randomPokemon();

    function setPokemonCries() {
      if (body.btnVolumeOn.classList.contains("hidden")) {
      } else {
        body.pokemonCries.setAttribute("src", pkCries);
        body.pokemonCries.volume = 0.25;
        body.pokemonCries.play();
      }
    }

    function setVolume() {
      body.btnVolumeOn.addEventListener("click", () => {
        body.switchAudio.setAttribute("src", "");
        body.failAudio.setAttribute("src", "");
        body.pokemonCries.setAttribute("src", "");
        body.btnVolumeOn.classList.toggle("hidden");
        body.btnVolumeOff.classList.toggle("hidden");
        body.volMSG.innerHTML = "Off";
      });
      body.btnVolumeOff.addEventListener("click", () => {
        body.switchAudio.setAttribute("src", "./assets/audio/switch.ogg");
        body.failAudio.setAttribute("src", "./assets/audio/fail.ogg");
        body.btnVolumeOn.classList.toggle("hidden");
        body.btnVolumeOff.classList.toggle("hidden");
        body.volMSG.innerHTML = "On";
      });
    }
    setVolume();

    function eventListener(element, event, fctn) {
      element.addEventListener(event, fctn);
    }

    eventListener(body.btnVolumeOn, "mouseenter", () => showSpan(body.volMSG));
    eventListener(body.btnVolumeOn, "mouseleave", () => hideSpan(body.volMSG));
    eventListener(body.btnVolumeOff, "mouseenter", () => showSpan(body.volMSG));
    eventListener(body.btnVolumeOff, "mouseleave", () => hideSpan(body.volMSG));

    function showSpan(element) {
      element.style.transition = "1s";
      element.style.opacity = "1";
    }

    function hideSpan(element) {
      element.style.transition = "1s";
      element.style.opacity = "0";
    }

    function addClass(element, classe) {
      element.classList.add(classe);
    }

    function removeClass(element, classe) {
      element.classList.remove(classe);
    }
  }
  checkTVBezel();
}
init();
