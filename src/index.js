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
/**
 * Handle open/close filters
 */
function handleDownMenu() {
    const arrow = document.querySelectorAll('.fa-angle-down');
    const label = document.querySelectorAll('.filter-title');
    for (let i = 0; i < arrow.length; i++) {
        arrow[i].addEventListener('click', toggleItem, false);
    }
    for (let i = 0; i < arrow.length; i++) {
        label[i].addEventListener('click', toggleItem, false);
    }
}

/**
 * Display all recipes from database
 * @param {array} recipe ;
 */
function displayRecipes(recipe) {
    const recipeSection = document.querySelector('.recipe__list');
    recipeSection.innerHTML = getAllRecipes(recipe);
}

function handlerecipe() {
    let recipeArr = [];
    const inputValue = searchInput.value.toLowerCase();
    if (inputValue.length >= 3) {
        for (let i = 0; i <= recipes.length - 1; i++) {
            const recipeName = recipes[i].name.toLowerCase();
            const recipeDescription = recipes[i].description.toLowerCase();
            if (recipeName.includes(inputValue)) {
                recipeArr.push(recipes[i]);
            } else if (recipeDescription.includes(inputValue)) {
                recipeArr.push(recipes[i]);
            } else {
                for (let j = 0; j <= recipes[i].ingredients.length - 1; j++) {
                    const recipeIngredients = recipes[i].ingredients[j].ingredient.toLowerCase();
                    if (recipeIngredients.includes(inputValue)) {
                        recipeArr.push(recipes[i]);
                        break;
                    }
                }
            }
        }
    } else {
        recipeArr = recipes;
    }
    return recipeArr;
}

searchInput.addEventListener('input', () => {
    displayRecipes(handlerecipe());
});

function displayTagsList() {
    ingredientsList.innerHTML = tagsList(ingrediantsTags(recipes));
    appliancesList.innerHTML = tagsList(appliancesTags(recipes));
    ustensilsList.innerHTML = tagsList(ustensilsTags(recipes));
}
function init() {
    handleDownMenu();
    displayTagsList();
    displayRecipes(recipes);
}

init();
