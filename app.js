// Get references to the input elements and the container for recipe cards
const ingredientInput = document.getElementById('ingredient-input');
const getRecipesButton = document.getElementById('get-recipes-button');
const recipesContainer = document.getElementById('recipes-container');

// Base URL for the Spoonacular API
const spoonacularBaseUrl = 'https://api.spoonacular.com/recipes/findByIngredients';

// Your Spoonacular API key
// const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
// console.log("api key", SPOONACULAR_API_KEY);
const SPOONACULAR_API_KEY = 'e20378718dfd444d98d7c4f3f10318d3';

// Function to fetch recipes and display them as recipe cards
async function getRecipesAndDisplay() {
  // Clear previous recipe cards
  recipesContainer.innerHTML = '';

  // Get user-entered ingredients
  const ingredients = ingredientInput.value.split(',').map(ingredient => ingredient.trim());

  // Create the URL for the Spoonacular API request
  const apiUrl = `${spoonacularBaseUrl}?apiKey=${SPOONACULAR_API_KEY}&ingredients=${ingredients.join(',')}`;

  try {
    // Fetch data from the Spoonacular API
    const response = await fetch(apiUrl);
    const recipes = await response.json();

    // Iterate through the recipes and create recipe cards
    recipes.forEach(recipe => {
      // console.log("recipe response", recipe)
      // Create a recipe card container
      const recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card');

      // Create an image element
      const recipeImage = document.createElement('img');
      recipeImage.src = recipe.image;
      recipeImage.alt = recipe.title;
      recipeCard.appendChild(recipeImage);

      // Create a title element
      const recipeTitle = document.createElement('h2');
      recipeTitle.textContent = recipe.title;
      recipeCard.appendChild(recipeTitle);

      // Append the recipe card to the container
      recipesContainer.appendChild(recipeCard);
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}

// Add event listener to the "Get Recipes" button
getRecipesButton.addEventListener('click', getRecipesAndDisplay);
