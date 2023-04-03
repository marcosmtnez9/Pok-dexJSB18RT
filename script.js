const inputBusqueda = document.getElementById("input-busqueda");
const resultadosBusqueda = document.getElementById("resultados-busqueda");
const fichaPokemon = document.getElementById("ficha-pokemon");
const url = "pokemon.json";
let listaPokemon = [];
let ultimoPokemonSeleccionado = null;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    listaPokemon = data.results.map((pokemon) => pokemon.name);
  });

const tiposTraducidos = {
  normal: "Normal",
  fighting: "Lucha",
  flying: "Volador",
  poison: "Veneno",
  ground: "Tierra",
  rock: "Roca",
  bug: "Bicho",
  ghost: "Fantasma",
  steel: "Acero",
  fire: "Fuego",
  water: "Agua",
  grass: "Planta",
  electric: "Eléctrico",
  psychic: "Psíquico",
  ice: "Hielo",
  dragon: "Dragón",
  dark: "Siniestro",
  fairy: "Hada"
};

const mostrarResultados = (listaResultados) => {
  const resultadosHTML = listaResultados
    .map((resultado) => `<li class="resultado" data-pokemon="${resultado}">${capitalize(resultado)}</li>`)
    .join("");
  resultadosBusqueda.innerHTML = `<ul>${resultadosHTML}</ul>`;

  const listaResultadosItems = resultadosBusqueda.querySelectorAll(".resultado");
  listaResultadosItems.forEach((item) => {
    item.addEventListener("click", () => {
      const pokemonBuscado = item.getAttribute("data-pokemon");
      mostrarFichaPokemonSeleccionado(pokemonBuscado);
    });
  });
};

const ocultarResultadosBusqueda = () => {
  resultadosBusqueda.innerHTML = "";
};

const mostrarFichaPokemonSeleccionado = (pokemonBuscado) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonBuscado}`)
    .then((response) => response.json())
    .then((data) => {
      if (ultimoPokemonSeleccionado !== pokemonBuscado) {
        ocultarResultadosBusqueda();
        mostrarFichaPokemon(data);
        ultimoPokemonSeleccionado = pokemonBuscado;
      }
    });
};

inputBusqueda.addEventListener("input", () => {
  const textoBusqueda = inputBusqueda.value.toLowerCase();
  if (textoBusqueda === "") {
    ocultarResultadosBusqueda();
  } else {
    const resultadosFiltrados = listaPokemon.filter((pokemon) => pokemon.includes(textoBusqueda)).slice(0, 10); // limita los resultados a 10 nombres
    if (resultadosFiltrados.length === 1) {
      // Si solo hay un resultado, muestra directamente la ficha de ese Pokémon
      mostrarFichaPokemonSeleccionado(resultadosFiltrados[0]);
    } else {
      mostrarResultados(resultadosFiltrados);
    }
  }
});



const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};


const mostrarFichaPokemon = (pokemon) => {
  const { height, weight, types, abilities, stats, sprites, id } = pokemon;
  const habilidades = abilities.map((ability) => capitalize(ability.ability.name)).join(", ");
  const tipo = types.map((tipo) => tiposTraducidos[tipo.type.name]).join(", ");
  const vida = stats[0].base_stat;
  const ataque = stats[1].base_stat;
  const defensa = stats[2].base_stat;
  const ataqueEspecial = stats[3].base_stat;
  const defensaEspecial = stats[4].base_stat;
  const velocidad = stats[5].base_stat;
  const alturaEnMetros = height / 10;
  const pesoEnKg = weight / 10;

  fichaPokemon.innerHTML = `
    <h2>${id} - ${pokemon.name.toUpperCase()}</h2>
    <img id="sprite-pokemon" src="${sprites.other['official-artwork'].front_default}" alt="sprite del pokemon">
    <img id="sprite-pokemon" src="${sprites.front_default}" alt="sprite del pokemon">
    <img id="sprite-pokemon" src="${sprites.back_default}" alt="sprite del pokemon">
    <ul>
      <li>Altura: ${alturaEnMetros} m</li>
      <li>Peso: ${pesoEnKg} kg</li>
      <li>Tipo: ${tipo}</li>
      <li>Habilidades: ${habilidades}</li>
      <li>PS: ${vida}</li>
      <li>Ataque: ${ataque}</li>
      <li>Defensa: ${defensa}</li>
      <li>Ataque Especial: ${ataqueEspecial}</li>
      <li>Defensa Especial: ${defensaEspecial}</li>
      <li>Velocidad: ${velocidad}</li>
    </ul>
  `;
};


