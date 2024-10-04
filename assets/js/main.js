function init() {
  const state = {
    view: {
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
    },
    type: {
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
    },
    values: {
      id: null,
      name: null,
      types: null,
      height: null,
      weight: null,
      cries: { latest: null },
      sprites: {
        other: {
          "official-artwork": { front_default: null },
        },
      },
      fetchTVBezel: null,
      searchResponse: null,
    },
  };

  async function checkTVBezel() {
    state.values.fetchTVBezel = await fetch(state.view.tvBezel.src);
    state.values.fetchTVBezel.ok ? searchPokemon(1) : addClass(state.view.container, "hidden");

    function tuneIn() {
      state.view.failAudio.pause();
      state.view.randomField.classList.toggle("hidden");
      state.view.tvBezel.setAttribute("src", "./assets/img/tv_no_signal.png");
      state.view.tvBezel.setAttribute("alt", "Figura de uma televisão sem sinal");
      state.view.pokemonInput.value = "Sintonizando...";
      state.view.switchAudio.play();
    }

    async function searchPokemon(pokemon) {
      tuneIn();
      removeClass(state.view.container, "hidden");
      try {
        state.values.searchResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`.toLowerCase());
        state.values = {
          id,
          name,
          types,
          height,
          weight,
          cries: { latest },
          sprites: {
            other: {
              "official-artwork": { front_default },
            },
          },
        } = await state.values.searchResponse.json();
        searchFound();
      } catch {
        notFound();
      }
    }

    function searchFound() {
      setTimeout(() => {
        state.view.switchAudio.pause();
        setPlaceHolder("ready");
        state.view.tvBezel.setAttribute("alt", `Figura de uma televisão mostrando o pokemon ${state.values.name}`);
        state.view.tvBezel.setAttribute("src", "./assets/img/tv_bezel.png");
        state.view.randomField.classList.toggle("hidden");
        insertData();
        insertSprite();
      }, 500);
      setTimeout(() => {
        state.view.pokemonInput.value = "";
      }, 900);
    }

    function notFound() {
      state.view.failAudio.play();
      clearFields();
      setPlaceHolder("notReady");
      state.view.randomField.classList.toggle("hidden");
      state.view.tvBezel.setAttribute("src", "./assets/img/tv_no_signal.png");
      state.view.tvBezel.setAttribute("alt", "Figura de uma televisão sem sinal");
      setTimeout(() => {
        setPlaceHolder("ready");
      }, 3000);
    }

    function clearFields() {
      state.view.pokemonName.innerText = "";
      state.view.pokemonType.innerText = "";
      state.view.pokemonHeight.innerText = "";
      state.view.pokemonWeight.innerText = "";
      state.view.pokemonSprite.setAttribute("alt", "");
      state.view.pokemonSprite.setAttribute("src", "");
    }

    function setPlaceHolder(type) {
      if (type === "ready") {
        state.view.pokemonInput.value = "";
        state.view.pokemonInput.setAttribute("placeholder", "Nome Ou Número");
      }
      if (type === "notReady") {
        state.view.pokemonInput.value = "Sintonizando...";
        setTimeout(() => {
          state.view.pokemonInput.setAttribute("placeholder", "Fora do Ar");
          state.view.pokemonInput.value = "";
        }, 500);
      }
    }

    function insertSprite() {
      setTimeout(() => {
        if (state.values.sprites.other["official-artwork"].front_default === null) {
          state.view.pokemonSprite.setAttribute("src", "./assets/img/pkball.png");
          state.view.pokemonSprite.setAttribute("alt", state.values.name);
        } else {
          state.view.pokemonSprite.setAttribute("alt", state.values.name);
          state.view.pokemonSprite.setAttribute("src", state.values.sprites.other["official-artwork"].front_default);
          setPokemonCries();
        }
      }, 100);
    }

    function insertData() {
      if (state.values.id === 778) {
        state.view.pokemonName.innerHTML = `${state.view.pkSpanIcon}${state.values.id} - Mimikyu`;
      } else {
        state.view.pokemonName.innerHTML = `${state.view.pkSpanIcon}${state.values.id} - ${state.values.name}`;

        const typeID0 = state.values.types["0"]["type"]["name"];

        function insertType1(typeID0) {
          const typeName = state.type[typeID0];
          if (typeName) {
            state.view.pokemonType.innerHTML = `<span class='types ${typeID0}'>${typeName}</span>`;
          }
        }
        insertType1(typeID0);

        if (state.values.types.length > 1) {
          const typeID1 = state.values.types["1"]["type"]["name"];

          function insertType2(typeID1) {
            const typeName = state.type[typeID1];
            if (typeName) {
              state.view.pokemonType.innerHTML += `&nbsp;<span class='types ${typeID1}'>${typeName}</span>`;
            }
          }
          insertType2(typeID1);
        }
        state.view.pokemonHeight.innerText = `${state.values.height * 10}cm`;
        state.view.pokemonWeight.innerText = `${state.values.weight / 10}Kg`;
      }
    }

    function missingNo() {
      clearFields();
      tuneIn();
      setTimeout(() => {
        state.view.switchAudio.pause();
        state.view.tvBezel.setAttribute("src", "./assets/img/tv_bezel.png");
        state.view.pokemonSprite.src = "./assets/img/missingno.png";
        state.values.id = state.view.pkMin;
        state.view.pokemonName.innerHTML = `${state.view.pkSpanIcon}${state.values.id} - MissingNo.`;
        state.view.pokemonType.innerText = "Tipo: ???";
        state.view.pokemonHeight.innerText = `${10 * 10}cm`;
        state.view.pokemonWeight.innerText = `${(3507.2 / 10).toFixed(1)}Kg`;
        state.view.pokemonInput.value = "!@#ERR0R";
        setPokemonCries();
        state.view.randomField.classList.toggle("hidden");
      }, 1000);
      setTimeout(() => {
        setPlaceHolder("ready");
      }, 3000);
    }

    function formSearch() {
      state.view.pokemonSearch.addEventListener("submit", (event) => {
        event.preventDefault();

        if (+state.view.pokemonInput.value === state.view.pkMin || state.view.pokemonInput.value === "?") {
          missingNo();
        } else if (+state.view.pokemonInput.value < state.view.pkMin || +state.view.pokemonInput.value > state.view.pkMax) {
          notFound();
        } else {
          removeClass(state.view.randomField, "hidden");
          clearFields();
          searchPokemon(state.view.pokemonInput.value);
        }
      });
    }
    formSearch();

    function btnSearch() {
      state.view.btnBefore.addEventListener("click", () => {
        if (state.values.id >= 2) {
          state.values.id--;
          addClass(state.view.randomField, "hidden");
          clearFields();
          searchPokemon(state.values.id);
          state.view.randomField.classList.toggle("hidden");
        }
      });

      state.view.btnNext.addEventListener("click", () => {
        state.values.id++;
        if (state.values.id > state.view.pkMax) {
          state.values.id--;
        } else {
          addClass(state.view.randomField, "hidden");
          clearFields();
          searchPokemon(state.values.id);
          state.view.randomField.classList.toggle("hidden");
        }
      });
    }
    btnSearch();

    function randomPokemon() {
      state.view.randomField.addEventListener("click", () => {
        hideSpan(state.view.randomMsg);
        state.values.id = Math.floor(Math.random() * (state.view.pkMax - state.view.pkMin) + state.view.pkMin);
        clearFields();
        searchPokemon(state.values.id);
      });
      eventListener(state.view.randomField, "mouseenter", () => showSpan(state.view.randomMsg));
      eventListener(state.view.randomField, "mouseleave", () => hideSpan(state.view.randomMsg));
    }
    randomPokemon();

    function setPokemonCries() {
      if (state.view.btnVolumeOn.classList.contains("hidden")) {
      } else {
        state.view.pokemonCries.setAttribute("src", state.values.cries.latest);
        state.view.pokemonCries.volume = 0.25;
        state.view.pokemonCries.play();
      }
    }

    function setVolume() {
      state.view.btnVolumeOn.addEventListener("click", () => {
        state.view.switchAudio.setAttribute("src", "");
        state.view.failAudio.setAttribute("src", "");
        state.view.pokemonCries.setAttribute("src", "");
        state.view.btnVolumeOn.classList.toggle("hidden");
        state.view.btnVolumeOff.classList.toggle("hidden");
        state.view.volMSG.innerHTML = "Off";
      });
      state.view.btnVolumeOff.addEventListener("click", () => {
        state.view.switchAudio.setAttribute("src", "./assets/audio/switch.ogg");
        state.view.failAudio.setAttribute("src", "./assets/audio/fail.ogg");
        state.view.btnVolumeOn.classList.toggle("hidden");
        state.view.btnVolumeOff.classList.toggle("hidden");
        state.view.volMSG.innerHTML = "On";
      });
    }
    setVolume();

    function eventListener(element, event, fctn) {
      element.addEventListener(event, fctn);
    }

    eventListener(state.view.btnVolumeOn, "mouseenter", () => showSpan(state.view.volMSG));
    eventListener(state.view.btnVolumeOn, "mouseleave", () => hideSpan(state.view.volMSG));
    eventListener(state.view.btnVolumeOff, "mouseenter", () => showSpan(state.view.volMSG));
    eventListener(state.view.btnVolumeOff, "mouseleave", () => hideSpan(state.view.volMSG));

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
