const form = document.getElementById('ingredient-form');
const resultsDiv = document.getElementById('recipe-results');

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const ingredients = document.getElementById('ingredients').value;
    // const apiKey = 'e20378718dfd444d98d7c4f3f10318d3';
    // require('dotenv').config();
    const apiKey = process.env['SPOONACULAR_API_KEY'];
    const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length > 0) {
            const recipes = data.map(recipe => `
                <div class="recipe">
                    <h2>${recipe.title}</h2>
                    <img src="${recipe.image}" alt="${recipe.title}">
                </div>
            `).join('');

            resultsDiv.innerHTML = recipes;
        } else {
            resultsDiv.innerHTML = 'No recipes found for the given ingredients.';
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
});