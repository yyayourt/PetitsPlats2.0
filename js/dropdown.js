const filters = [{ name: "Ingrédients" }, { name: "Appareils" }, { name: "Ustensiles" }];

function createDropdowns() {
    filters.forEach((filter) => {
        const dropdown = document.createElement("div");
        dropdown.className = "filter-ingredients";
        dropdown.innerHTML = filter.name + '<i class="fa-solid fa-chevron-down"></i>';

        if (filter.name === "Ingrédients") {
            const dropdownContent = document.createElement("div");
            dropdownContent.className = "dropdown-content";

            const searchContainer = document.createElement("div");
            searchContainer.className = "search-container";

            const searchInput = document.createElement("input");
            searchInput.type = "text";
            searchInput.className = "dropdown-search";

            searchInput.addEventListener("input", (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const ingredientItems = ingredientsList.querySelectorAll(".ingredient-item");

                ingredientItems.forEach((item) => {
                    const ingredientName = item.textContent.toLowerCase();
                    item.style.display = ingredientName.includes(searchTerm) ? "block" : "none";
                });
            });

            const searchIcon = document.createElement("i");
            searchIcon.className = "fa-solid fa-magnifying-glass search-icon";

            searchContainer.appendChild(searchInput);
            searchContainer.appendChild(searchIcon);

            dropdownContent.appendChild(searchContainer);

            const ingredientsList = document.createElement("div");
            ingredientsList.className = "ingredients-list";

            getIngredients().map((ingredient) => {
                const ingredientItem = document.createElement("div");
                ingredientItem.className = "ingredient-item";
                ingredientItem.textContent = ingredient;
                let selectedIngredients = [];

                ingredientItem.addEventListener("click", () => {
                    document.querySelector(".selected-tags").appendChild(createSelectedIngredient(ingredient));
                    selectedIngredients.push(ingredient);
                });

                ingredientsList.appendChild(ingredientItem);
            });

            dropdownContent.appendChild(ingredientsList);
            dropdown.appendChild(dropdownContent);

            dropdown.addEventListener("click", (e) => {
                if (e.target !== searchInput) {
                    if (dropdownContent.style.display === "block") {
                        dropdownContent.style.display = "none";
                    } else {
                        dropdownContent.style.display = "block";
                    }
                }
            });
        }

        const container = document.querySelector(".filters");
        container.appendChild(dropdown);
    });
}

const getIngredients = () => [...new Set(recipes.flatMap((recipe) => recipe.ingredients.map((item) => item.ingredient.toLowerCase())))];

console.log(getIngredients());

document.addEventListener("DOMContentLoaded", createDropdowns);
