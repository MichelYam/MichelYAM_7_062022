import recipes from '../data/recipes.js';
import getAllRecipes from './recipes.js';

function toggleItem() {
    const filterBtn = document.querySelectorAll('.filter-btn');
    const itemClass = this.parentNode.parentNode.parentNode.className;
    console.log(itemClass);
    for (let i = 0; i < filterBtn.length; i++) {
        filterBtn[i].className = 'filter-btn';
    }
    if (itemClass === 'filter-btn') {
        this.parentNode.parentNode.parentNode.className = 'filter-btn active';
    }
}

function handleDownMenu() {
    // handle open/close filters
    const arrow = document.querySelectorAll('.fa-angle-down');
    const label = document.querySelectorAll('.filter-title');
    for (let i = 0; i < arrow.length; i++) {
        arrow[i].addEventListener('click', toggleItem, false);
    }
    for (let i = 0; i < arrow.length; i++) {
        label[i].addEventListener('click', toggleItem, false);
    }
}

function displayRecipes() {
    const recipeSection = document.querySelector('.recipe__list');
    recipeSection.innerHTML = getAllRecipes(recipes);
}

function init() {
    handleDownMenu();
    displayRecipes();
}

init();