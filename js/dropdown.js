const filters = [
    { name: "Ingrédients", type: "ingredients" },
    { name: "Appareils", type: "appliances" },
    { name: "Ustensiles", type: "ustensils" },
];

let selectedFilters = [];
const dropdownItemLists = {};

const getIngredients = (recipeList) => [...new Set(recipeList.flatMap((recipe) => recipe.ingredients.map((item) => item.ingredient.toLowerCase())))];

const getAppliance = (recipeList) => [...new Set(recipeList.map((recipe) => recipe.appliance.toLowerCase()))];

const getUstensils = (recipeList) => [...new Set(recipeList.flatMap((recipe) => recipe.ustensils.map((item) => item.toLowerCase())))];

function populateDropdownList(filterType, listElement, recipeSource) {
    listElement.innerHTML = "";

    let items = [];
    if (filterType === "ingredients") {
        items = getIngredients(recipeSource);
    } else if (filterType === "appliances") {
        items = getAppliance(recipeSource);
    } else if (filterType === "ustensils") {
        items = getUstensils(recipeSource);
    }

    items.sort();

    items.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.className = `ingredient-item`;
        itemElement.textContent = item;

        if (selectedFilters.includes(item)) {
            itemElement.classList.add("selected-in-dropdown");
        }

        itemElement.addEventListener("click", () => {
            if (!selectedFilters.includes(item)) {
                document.querySelector(".selected-tags").appendChild(createSelectedFilters(item));
                selectedFilters.push(item);
                filterRecipes();
            }
            listElement.parentElement.style.display = "none";
        });

        listElement.appendChild(itemElement);
    });

    if (items.length === 0) {
        const noItemElement = document.createElement("div");
        noItemElement.className = "no-items-message";
        noItemElement.textContent = "Aucune option disponible";
        listElement.appendChild(noItemElement);
    }
}

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
        searchInput.id = `search-${filter.type}`;

        const searchIcon = document.createElement("i");
        searchIcon.className = "fa-solid fa-magnifying-glass search-icon";

        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(searchIcon);

        dropdownContent.appendChild(searchContainer);

        const itemsList = document.createElement("div");
        itemsList.className = "ingredients-list";
        itemsList.id = `list-${filter.type}`;

        dropdownItemLists[filter.type] = itemsList;

        populateDropdownList(filter.type, itemsList, recipes);

        searchInput.addEventListener("input", (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const currentItems = itemsList.querySelectorAll(".ingredient-item");

            currentItems.forEach((item) => {
                const itemName = item.textContent.toLowerCase();
                item.style.display = itemName.includes(searchTerm) ? "block" : "none";
            });
        });

        dropdownContent.appendChild(itemsList);
        dropdown.appendChild(dropdownContent);

        dropdown.addEventListener("click", (e) => {
            if (e.target !== searchInput) {
                document.querySelectorAll(".dropdown-content").forEach((dd) => {
                    if (dd !== dropdownContent && dd.style.display === "block") {
                        dd.style.display = "none";
                    }
                });
                dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
            }
        });

        const container = document.querySelector(".filters");
        container.appendChild(dropdown);
    });
}

function updateAllDropdowns(currentFilteredRecipes) {
    filters.forEach((filter) => {
        const listElement = dropdownItemLists[filter.type];
        if (listElement) {
            populateDropdownList(filter.type, listElement, currentFilteredRecipes);
        }
    });
}

document.addEventListener("DOMContentLoaded", createDropdowns);

document.addEventListener("click", function (event) {
    const openDropdowns = document.querySelectorAll('.dropdown-content[style*="display: block"]');
    let clickedInsideDropdown = false;
    openDropdowns.forEach((dropdown) => {
        if (dropdown.parentElement.contains(event.target)) {
            clickedInsideDropdown = true;
        }
    });

    if (!clickedInsideDropdown) {
        openDropdowns.forEach((dropdown) => {
            dropdown.style.display = "none";
        });
    }
});
