/* eslint-disable no-plusplus */
import recipes from '../data/recipes.js';
import getAllRecipes from './recipes.js';
import {
    ingrediantsTags,
    appliancesTags,
    ustensilsTags,
    tagsList,
} from './tags.js';

const searchInput = document.getElementById('search');
const ingredientsList = document.querySelector('#blue-content ul');
const appliancesList = document.querySelector('#green-content ul');
const ustensilsList = document.querySelector('#red-content ul');

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

function displayRecipes(recipe) {
    const recipeSection = document.querySelector('.recipe__list');
    recipeSection.innerHTML = getAllRecipes(recipe);
}

function handleRecipe() {
    const inputValue = searchInput.value.toLowerCase();
    if (inputValue.length >= 3) {
        const recipeArr = recipes.filter((recipe) => {
            const recipeName = recipe.name.toLowerCase();
            const recipeDescription = recipe.description.toLowerCase();

            // filter by name and description
            if (recipeName.includes(inputValue) || recipeDescription.includes(inputValue)) {
                return true;
            }

            // filter by ingredient
            if (recipe.ingredients.find((item) => item.ingredient.toLowerCase()
                .includes(inputValue))) {
                return true;
            }
        });
        return recipeArr;
    }
    return recipes;
}

function displayTagsList() {
    ingredientsList.innerHTML = tagsList(ingrediantsTags(recipes));
    appliancesList.innerHTML = tagsList(appliancesTags(recipes));
    ustensilsList.innerHTML = tagsList(ustensilsTags(recipes));
}

searchInput.addEventListener('input', () => {
    displayRecipes(handleRecipe());
});

function init() {
    handleDownMenu();
    displayTagsList();
    displayRecipes(recipes);
}

init();
