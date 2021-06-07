function toggleExpandedClass(element) {
  element.classList.toggle("expanded");
}

function toggleHamburgerMenu() {
    var elements = document.querySelectorAll(".expandable");
    elements.forEach(toggleExpandedClass);
}

document.querySelectorAll(".hamburger").forEach(element => {
    element.addEventListener("click", toggleHamburgerMenu);
})