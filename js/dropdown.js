const filters = [
    { name: "Ingrédients", icon: '<i class="fa-solid fa-chevron-down"></i>' },
    { name: "Appareils", icon: '<i class="fa-solid fa-chevron-down"></i>' },
    { name: "Ustensiles", icon: '<i class="fa-solid fa-chevron-down"></i>' },
];

function createDropdowns() {
    filters.forEach((Filters) => {
        const dropdown = document.createElement("div");
        dropdown.className = "filter-ingredients";
        dropdown.innerHTML = Filters.name + Filters.icon;

        const container = document.querySelector(".filters");
        container.appendChild(dropdown);
    });
}

const getIngredients = () => [...new Set(recipes.flatMap((recipe) => recipe.ingredients.map((item) => item.ingredient.toLowerCase())))];

console.log(getIngredients());

document.addEventListener("DOMContentLoaded", createDropdowns);
document.addEventListener("DOMContentLoaded", getIngredients);
