const mainView = document.getElementById('main-view');
const detailView = document.getElementById('detail-view');
const pokemonGrid = document.getElementById('pokemon-grid');
const pokemonDetail = document.getElementById('pokemon-detail');
const backBtn = document.getElementById('back-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let pokemonList = [];
let currentIndex = 0;

async function loadPokemon() {
  for (let i = 1; i <= 151; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await res.json();
    pokemonList.push(data);
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.innerHTML = `
      <img src="${data.sprites.front_default}" alt="${data.name}" />
      <p>#${data.id} ${capitalize(data.name)}</p>
    `;
    card.addEventListener('click', () => showDetail(data.id));
    pokemonGrid.appendChild(card);
  }
}

function showDetail(id) {
  const data = pokemonList.find(p => p.id === id);
  currentIndex = pokemonList.indexOf(data);
  mainView.classList.add('hidden');
  detailView.classList.remove('hidden');
  renderDetail(data);
}

function renderDetail(data) {
  pokemonDetail.innerHTML = `
    <h2>#${data.id} ${capitalize(data.name)}</h2>
    <img src="${data.sprites.front_default}" alt="${data.name}" />
    <p>Peso: ${data.weight / 10} kg</p>
    <p>Altura: ${data.height / 10} m</p>
    <p>Tipo: ${data.types.map(t => t.type.name).join(', ')}</p>
  `;
}

backBtn.addEventListener('click', () => {
  detailView.classList.add('hidden');
  mainView.classList.remove('hidden');
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderDetail(pokemonList[currentIndex]);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < pokemonList.length - 1) {
    currentIndex++;
    renderDetail(pokemonList[currentIndex]);
  }
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

loadPokemon();