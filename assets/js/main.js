function init() {
  const elemento = {
    container: document.querySelector("#container"),
    moldura: document.querySelector("#tvBezel"),
    molduraOff: document.querySelector("#tvOffBezel"),
    foto: document.querySelector("#pokemonSprite"),
    nome: document.querySelector("#pokemonName"),
    tipo: document.querySelector("#pokemonType"),
    altura: document.querySelector("#pokemonHeight"),
    peso: document.querySelector("#pokemonWeight"),
    search: document.querySelector("#pokemonSearch"),
    input: document.querySelector("#pokemonInput"),
    anterior: document.querySelector("#btnBefore"),
    proximo: document.querySelector("#btnNext"),
    randomField: document.querySelector("#randomField"),
    randomMsg: document.querySelector("#randomMsg"),
    icon: `<span><img src="./assets/img/favicon-16x16.png" alt="ícone de uma pokebola" /></span>&nbsp;`,
    min: 0,
    max: 1025,
  };

  function showContainer(response) {
    response ? searchPokemon(1) : elemento.container.classList.add("hidden");
  }

  async function checkTVBezel() {
    const fetchTVBezel = await fetch(elemento.moldura.src);
    showContainer(fetchTVBezel.ok);
  }
  checkTVBezel();

  async function searchPokemon(pokemon) {
    elemento.input.value = "Buscando...";
    try {
      const searchResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`.toLowerCase());
      const data = await searchResponse.json();

      id = data["id"];
      nome = data["name"];
      tipos = data["types"];
      altura = data["height"];
      peso = data["weight"];
      sprite = data["sprites"]["other"]["official-artwork"]["front_default"];

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
      elemento.input.value = "";
      elemento.molduraOff.classList.add("hidden");
      elemento.moldura.classList.remove("hidden");
      elemento.moldura.setAttribute("alt", `Figura de uma televisão mostrando o pokemon ${nome}`);
    }, 500);
  }

  function notFound() {
    setPlaceHolder("notReady");
    elemento.input.value = "";
    elemento.nome.innerText = "";
    elemento.tipo.innerText = "";
    elemento.altura.innerText = "";
    elemento.peso.innerText = "";
    elemento.foto.setAttribute("alt", "");
    elemento.foto.setAttribute("src", "");
    elemento.moldura.classList.add("hidden");
    elemento.molduraOff.classList.remove("hidden");
    elemento.randomField.classList.add("hidden");
    setTimeout(() => {
      setPlaceHolder("ready");
    }, 3000);
  }

  function setPlaceHolder(type) {
    if (type === "ready") {
      elemento.input.setAttribute("placeholder", "Nome Ou Número");
    }
    if (type === "notReady") {
      elemento.input.setAttribute("placeholder", "Não encontrado");
    }
  }

  function insertSprite() {
    if (!sprite) {
      elemento.foto.setAttribute("src", "./assets/img/pkball.png");
      elemento.foto.setAttribute("alt", nome);
    } else {
      elemento.foto.setAttribute("alt", nome);
      elemento.foto.setAttribute("src", sprite);
    }
  }

  function insertData() {
    if (id === 778) {
      elemento.nome.innerHTML = `${elemento.icon}${id} - Mimikyu`;
    } else {
      elemento.nome.innerHTML = `${elemento.icon}${id} - ${nome}`;

      const typeID0 = tipos["0"]["type"]["name"];

      switch (typeID0) {
        case "bug":
          tipoPokemon = "Inseto";
          elemento.tipo.innerHTML = `<span class='types ${typeID0}'>${tipoPokemon}</span>`;
          break;
        case "dark":
          tipoPokemon = "Sombrio";
          elemento.tipo.innerHTML = `<span class='types ${typeID0}'>${tipoPokemon}</span>`;
          break;
        case "dragon":
          tipoPokemon = "Dragão";
          elemento.tipo.innerHTML = `<span class='types ${typeID0}'>${tipoPokemon}</span>`;
          break;
        case "electric":
          tipoPokemon = "Elétrico";
          elemento.tipo.innerHTML = `<span class='types ${typeID0}'>${tipoPokemon}</span>`;
          break;
        case "fairy":
          tipoPokemon = "Fada";
          elemento.tipo.innerHTML = `<span class='types ${typeID0}'>${tipoPokemon}</span>`;
          break;
        case "fighting":
          tipoPokemon = "Lutador";
          elemento.tipo.innerHTML = `<span class='types ${typeID0}'>${tipoPokemon}</span>`;
          break;
        case "fire":
          tipoPokemon = "Fogo";
          elemento.tipo.innerHTML = `<span class='types ${typeID0}'>${tipoPokemon}</span>`;
          break;
        case "flying":
          tipoPokemon = "Voador";
          elemento.tipo.innerHTML = `<span class='types ${typeID0}'>${tipoPokemon}</span>`;
          break;
        case "ghost":
          tipoPokemon = "Fantasma";
          elemento.tipo.innerHTML = `<span class='types ${typeID0}'>${tipoPokemon}</span>`;
          break;
        case "grass":
          tipoPokemon = "Grama";
          elemento.tipo.innerHTML = `<span class='types ${typeID0}'>${tipoPokemon}</span>`;
          break;
        case "ground":
          tipoPokemon = "Terra";
          elemento.tipo.innerHTML = `<span class='types ${typeID0}'>${tipoPokemon}</span>`;
          break;
        case "ice":
          tipoPokemon = "Gelo";
          elemento.tipo.innerHTML = `<span class='types ${typeID0}'>${tipoPokemon}</span>`;
          break;
        case "normal":
          tipoPokemon = "Normal";
          elemento.tipo.innerHTML = `<span class='types ${typeID0}'>${tipoPokemon}</span>`;
          break;
        case "poison":
          tipoPokemon = "Veneno";
          elemento.tipo.innerHTML = `<span class='types ${typeID0}'>${tipoPokemon}</span>`;
          break;
        case "psychic":
          tipoPokemon = "Psíquico";
          elemento.tipo.innerHTML = `<span class='types ${typeID0}'>${tipoPokemon}</span>`;
          break;
        case "rock":
          tipoPokemon = "Pedra";
          elemento.tipo.innerHTML = `<span class='types ${typeID0}'>${tipoPokemon}</span>`;
          break;
        case "steel":
          tipoPokemon = "Metal";
          elemento.tipo.innerHTML = `<span class='types ${typeID0}'>${tipoPokemon}</span>`;
          break;
        case "water":
          tipoPokemon = "Água";
          elemento.tipo.innerHTML = `<span class='types ${typeID0}'>${tipoPokemon}</span>`;
          break;

        default:
          break;
      }

      if (tipos.length < 2) {
      } else {
        const typeID1 = tipos["1"]["type"]["name"];

        switch (typeID1) {
          case "bug":
            tipoPokemon = "Inseto";
            elemento.tipo.innerHTML += `&nbsp;<span class='types ${typeID1}'>${tipoPokemon}</span>`;
            break;
          case "dark":
            tipoPokemon = "Sombrio";
            elemento.tipo.innerHTML += `&nbsp;<span class='types ${typeID1}'>${tipoPokemon}</span>`;
            break;
          case "dragon":
            tipoPokemon = "Dragão";
            elemento.tipo.innerHTML += `&nbsp;<span class='types ${typeID1}'>${tipoPokemon}</span>`;
            break;
          case "electric":
            tipoPokemon = "Elétrico";
            elemento.tipo.innerHTML += `&nbsp;<span class='types ${typeID1}'>${tipoPokemon}</span>`;
            break;
          case "fairy":
            tipoPokemon = "Fada";
            elemento.tipo.innerHTML += `&nbsp;<span class='types ${typeID1}'>${tipoPokemon}</span>`;
            break;
          case "fighting":
            tipoPokemon = "Lutador";
            elemento.tipo.innerHTML += `&nbsp;<span class='types ${typeID1}'>${tipoPokemon}</span>`;
            break;
          case "fire":
            tipoPokemon = "Fogo";
            elemento.tipo.innerHTML += `&nbsp;<span class='types ${typeID1}'>${tipoPokemon}</span>`;
            break;
          case "flying":
            tipoPokemon = "Voador";
            elemento.tipo.innerHTML += `&nbsp;<span class='types ${typeID1}'>${tipoPokemon}</span>`;
            break;
          case "ghost":
            tipoPokemon = "Fantasma";
            elemento.tipo.innerHTML += `&nbsp;<span class='types ${typeID1}'>${tipoPokemon}</span>`;
            break;
          case "grass":
            tipoPokemon = "Grama";
            elemento.tipo.innerHTML += `&nbsp;<span class='types ${typeID1}'>${tipoPokemon}</span>`;
            break;
          case "ground":
            tipoPokemon = "Terra";
            elemento.tipo.innerHTML += `&nbsp;<span class='types ${typeID1}'>${tipoPokemon}</span>`;
            break;
          case "ice":
            tipoPokemon = "Gelo";
            elemento.tipo.innerHTML += `&nbsp;<span class='types ${typeID1}'>${tipoPokemon}</span>`;
            break;
          case "normal":
            tipoPokemon = "Normal";
            elemento.tipo.innerHTML += `&nbsp;<span class='types ${typeID1}'>${tipoPokemon}</span>`;
            break;
          case "poison":
            tipoPokemon = "Veneno";
            elemento.tipo.innerHTML += `&nbsp;<span class='types ${typeID1}'>${tipoPokemon}</span>`;
            break;
          case "psychic":
            tipoPokemon = "Psíquico";
            elemento.tipo.innerHTML += `&nbsp;<span class='types ${typeID1}'>${tipoPokemon}</span>`;
            break;
          case "rock":
            tipoPokemon = "Pedra";
            elemento.tipo.innerHTML += `&nbsp;<span class='types ${typeID1}'>${tipoPokemon}</span>`;
            break;
          case "steel":
            tipoPokemon = "Metal";
            elemento.tipo.innerHTML += `&nbsp;<span class='types ${typeID1}'>${tipoPokemon}</span>`;
            break;
          case "water":
            tipoPokemon = "Água";
            elemento.tipo.innerHTML += `&nbsp;<span class='types ${typeID1}'>${tipoPokemon}</span>`;
            break;

          default:
            break;
        }
      }
      elemento.altura.innerText = `${altura * 10}cm`;
      elemento.peso.innerText = `${peso / 10}Kg`;
    }
  }

  function missingNo() {
    elemento.moldura.setAttribute("src", "./assets/img/tv_bezel.png");
    elemento.randomField.classList.remove("hidden");
    elemento.foto.src = "./assets/img/missingno.png";
    id = elemento.min;
    elemento.nome.innerHTML = `${elemento.icon}${id} - MissingNo.`;
    elemento.tipo.innerText = "Tipo: ???";
    elemento.altura.innerText = `${10 * 10}cm`;
    elemento.peso.innerText = `${(3507.2 / 10).toFixed(1)}Kg`;
    elemento.input.value = "";
    setPlaceHolder("ready");
  }

  function formSearch() {
    elemento.search.addEventListener("submit", (event) => {
      event.preventDefault();

      if (+elemento.input.value === elemento.min || elemento.input.value === "?") {
        missingNo();
      } else if (+elemento.input.value < elemento.min || +elemento.input.value > elemento.max) {
        notFound();
      } else {
        elemento.randomField.classList.remove("hidden");
        searchPokemon(elemento.input.value);
      }
    });
  }
  formSearch();

  function btnSearch() {
    elemento.anterior.addEventListener("click", () => {
      if (id <= 1 || id > elemento.max) {
      } else {
        elemento.randomField.classList.remove("hidden");
        id--;
        searchPokemon(id);
      }
    });

    elemento.proximo.addEventListener("click", () => {
      id++;
      if (id > elemento.max) {
        id--;
      } else {
        elemento.randomField.classList.remove("hidden");
        searchPokemon(id);
      }
    });
  }

  btnSearch();

  function randomPokemon() {
    elemento.randomField.addEventListener("mouseenter", () => {
      elemento.randomMsg.style.opacity = "1";
      elemento.randomMsg.style.transition = ".5s";
    });

    elemento.randomField.addEventListener("mouseleave", () => {
      elemento.randomMsg.style.opacity = "0";
      elemento.randomMsg.style.transition = ".5s";
    });

    elemento.randomField.addEventListener("click", () => {
      id = Math.floor(Math.random() * (elemento.max - elemento.min) + elemento.min);
      searchPokemon(id);
    });
  }
  randomPokemon();
}
init();
