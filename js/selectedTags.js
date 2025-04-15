function createSelectedIngredient(item) {
    const selectedTag = document.createElement("div");
    selectedTag.className = "selected-ingredient";
    selectedTag.innerHTML = `${item} <i class="fa-solid fa-xmark"></i>`;

    selectedTag.querySelector("i").addEventListener("click", () => {
        selectedTag.remove();
    });

    return selectedTag;
}
