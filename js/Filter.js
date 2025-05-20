function filterRecipes() {
    const container = document.getElementById("recipes-container");
    container.innerHTML = "";

    const searchInput = document.querySelector(".search-input input");
    const searchTerm = searchInput.value.toLowerCase();

    let filteredRecipes;

    if (searchTerm === "" && selectedFilters.length === 0) {
        filteredRecipes = recipes;
    } else {
        filteredRecipes = recipes.filter((recipe) => {
            const nameMatch = recipe.name.toLowerCase().includes(searchTerm);
            const descriptionMatch = recipe.description.toLowerCase().includes(searchTerm);
            const ingredientMatch = recipe.ingredients.some((ing) => ing.ingredient.toLowerCase().includes(searchTerm));

            const tagMatch =
                selectedFilters.length > 0
                    ? selectedFilters.every((selectedFilter) => {
                          const hasIngredient = recipe.ingredients.some((ing) => ing.ingredient.toLowerCase() === selectedFilter.toLowerCase());
                          const hasAppliance = recipe.appliance.toLowerCase() === selectedFilter.toLowerCase();
                          const hasUstensil = recipe.ustensils.some((ust) => ust.toLowerCase() === selectedFilter.toLowerCase());
                          return hasIngredient || hasAppliance || hasUstensil;
                      })
                    : true;

            return (nameMatch || descriptionMatch || ingredientMatch) && tagMatch;
        });
    }

    filteredRecipes.forEach((recipe) => {
        const card = createRecipeCard(recipe);
        container.appendChild(card);
    });

    document.querySelector(".recipes-count").textContent = `${filteredRecipes.length} recettes`;

    if (typeof updateAllDropdowns === "function") {
        updateAllDropdowns(filteredRecipes);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search-input input");
    searchInput.addEventListener("input", filterRecipes);
});
