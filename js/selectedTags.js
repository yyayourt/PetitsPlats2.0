function createSelectedFilters(item) {
    const selectedTag = document.createElement("div");
    selectedTag.className = "selected-ingredient";
    selectedTag.innerHTML = `${item} <i class="fa-solid fa-xmark"></i>`;

    selectedTag.querySelector("i").addEventListener("click", () => {
        const index = selectedFilters.indexOf(item);
        if (index > -1) {
            selectedFilters.splice(index, 1);
        }
        selectedTag.remove();
        filterRecipes();
    });

    return selectedTag;
}
