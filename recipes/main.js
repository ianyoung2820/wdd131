// main.js
import recipes from './recipes.mjs';

// 02. Random functions
function random(max) {
  return Math.floor(Math.random() * max);
}
function getRandomListEntry(list) {
  return list[random(list.length)];
}

// 03. Template generators
function tagsTemplate(tags) {
  return tags
    .map(tag => `<button type="button" class="tag">${tag}</button>`)
    .join('');
}

function ratingTemplate(rating) {
  let html = `
    <span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">
  `;
  for (let i = 1; i <= 5; i++) {
    html += i <= rating
      ? `<span aria-hidden="true" class="icon-star">⭐</span>`
      : `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
  }
  html += `</span>`;
  return html;
}

function recipeTemplate(recipe) {
  return `
    <article class="recipe-card">
      <img src="${recipe.image}" alt="${recipe.name}">

      <div class="tags">
        ${tagsTemplate(recipe.tags)}
      </div>

      <h2 class="recipe-title">${recipe.name}</h2>

      ${ratingTemplate(recipe.rating)}

      <p class="recipe-description">
        ${recipe.description}
      </p>
    </article>
  `;
}

// 04. Render & init
function renderRecipes(list) {
  const container = document.querySelector('main');
  container.innerHTML = list.map(r => recipeTemplate(r)).join('');
}

function init() {
  const randomRecipe = getRandomListEntry(recipes);
  renderRecipes([randomRecipe]);
}
init();

// 05. Filtering via search
function filterRecipes(query) {
  const lower = query.toLowerCase();
  return recipes
    .filter(recipe => {
      const inName = recipe.name.toLowerCase().includes(lower);
      const inDesc = recipe.description.toLowerCase().includes(lower);
      const inTags = recipe.tags.some(t => t.toLowerCase().includes(lower));
      // use the correct field name here:
      const inIngredients = recipe.recipeIngredient.some(i =>
        i.toLowerCase().includes(lower)
      );
      return inName || inDesc || inTags || inIngredients;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

function searchHandler(e) {
  e.preventDefault();
  const query = document.querySelector('#search-input').value.trim();
  const results = filterRecipes(query);
  renderRecipes(results);
}

document
  .querySelector('.search-form')
  .addEventListener('submit', searchHandler);
