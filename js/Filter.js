function filterRecipes() {
    const container = document.getElementById("recipes-container");
    container.innerHTML = "";

    let filteredRecipes;

    if (selectedFilters.length === 0) {
        filteredRecipes = recipes;
    } else {
        filteredRecipes = recipes.filter((recipe) => {
            return selectedFilters.every((selectedFilter) => {
                const hasIngredient = recipe.ingredients.some((ing) => ing.ingredient.toLowerCase() === selectedFilter.toLowerCase());

                const hasAppliance = recipe.appliance.toLowerCase() === selectedFilter.toLowerCase();

                const hasUstensil = recipe.ustensils.some((ust) => ust.toLowerCase() === selectedFilter.toLowerCase());

                return hasIngredient || hasAppliance || hasUstensil;
            });
        });
    }

    filteredRecipes.forEach((recipe) => {
        const card = createRecipeCard(recipe);
        container.appendChild(card);
    });

    document.querySelector(".recipes-count").textContent = `${filteredRecipes.length} recettes`;
}
