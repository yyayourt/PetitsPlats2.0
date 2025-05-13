function createRecipeCard(recipe) {
    const card = document.createElement("article");
    card.className = "recipe-card";

    const imageContainer = document.createElement("div");
    imageContainer.className = "recipe-image";

    const img = document.createElement("img");
    img.src = `JSON recipes/${recipe.image}`;
    img.alt = recipe.name;

    const time = document.createElement("span");
    time.className = "recipe-time";
    time.textContent = `${recipe.time} min`;

    imageContainer.appendChild(img);
    imageContainer.appendChild(time);

    const content = document.createElement("div");
    content.className = "recipe-content";

    const title = document.createElement("h2");
    title.className = "recipe-title";
    title.textContent = recipe.name;

    const recipeSubtitle = document.createElement("h3");
    recipeSubtitle.className = "recipe-subtitle";
    recipeSubtitle.textContent = "RECETTE";

    const description = document.createElement("p");
    description.className = "recipe-description";
    description.textContent = recipe.description;

    const ingredientsSubtitle = document.createElement("h3");
    ingredientsSubtitle.className = "recipe-subtitle";
    ingredientsSubtitle.textContent = "INGRÉDIENTS";

    const ingredientsContainer = document.createElement("div");
    ingredientsContainer.className = "recipe-ingredients";

    recipe.ingredients.forEach((ingredient) => {
        const ingredientDiv = document.createElement("div");
        ingredientDiv.className = "ingredient";

        const name = document.createElement("div");
        name.className = "ingredient-name";
        name.textContent = ingredient.ingredient;

        const quantity = document.createElement("div");
        quantity.className = "ingredient-quantity";
        quantity.textContent = ingredient.quantity + (ingredient.unit ? ingredient.unit : "");

        ingredientDiv.appendChild(name);
        ingredientDiv.appendChild(quantity);
        ingredientsContainer.appendChild(ingredientDiv);
    });

    content.appendChild(title);
    content.appendChild(recipeSubtitle);
    content.appendChild(description);
    content.appendChild(ingredientsSubtitle);
    content.appendChild(ingredientsContainer);

    card.appendChild(imageContainer);
    card.appendChild(content);

    return card;
}

function displayRecipes() {
    const container = document.getElementById("recipes-container");
    recipes.forEach((recipe) => {
        const card = createRecipeCard(recipe);
        container.appendChild(card);
    });
    document.querySelector(".recipes-count").textContent = `${recipes.length} recettes`;
}

document.addEventListener("DOMContentLoaded", displayRecipes);
