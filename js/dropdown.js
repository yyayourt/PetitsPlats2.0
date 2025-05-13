const filters = [
    { name: "Ingrédients", type: "ingredients" },
    { name: "Appareils", type: "appliances" },
    { name: "Ustensiles", type: "ustensils" },
];

let selectedFilters = [];

function createDropdowns() {
    filters.forEach((filter) => {
        const dropdown = document.createElement("div");
        dropdown.className = "filter-ingredients";
        dropdown.innerHTML = filter.name + '<i class="fa-solid fa-chevron-down"></i>';

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

        let items = [];

        if (filter.type === "ingredients") {
            items = getIngredients();
        } else if (filter.type === "appliances") {
            items = getAppliance();
        } else if (filter.type === "ustensils") {
            items = getUstensils();
        }

        items.map((item) => {
            const itemElement = document.createElement("div");
            itemElement.className = `ingredient-item`;
            itemElement.textContent = item;

            itemElement.addEventListener("click", () => {
                if (!selectedFilters.includes(item)) {
                    document.querySelector(".selected-tags").appendChild(createSelectedFilters(item));
                    selectedFilters.push(item);
                    filterRecipes();
                }
            });

            ingredientsList.appendChild(itemElement);
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

        const container = document.querySelector(".filters");
        container.appendChild(dropdown);
    });
}

const getIngredients = () => [...new Set(recipes.flatMap((recipe) => recipe.ingredients.map((item) => item.ingredient.toLowerCase())))];

const getAppliance = () => [...new Set(recipes.map((recipe) => recipe.appliance.toLowerCase()))];

const getUstensils = () => [...new Set(recipes.flatMap((recipe) => recipe.ustensils.map((item) => item.toLowerCase())))];

console.log(getIngredients());

console.log(getAppliance());

console.log(getUstensils());

document.addEventListener("DOMContentLoaded", createDropdowns);
