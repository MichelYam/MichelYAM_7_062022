/* eslint-disable prefer-destructuring */
/* eslint-disable indent */
/* eslint-disable no-use-before-define */
import recipes from '../data/recipes.js';
import getAllRecipes from './recipes.js';
import {
    tagsList,
    filterList,
    getItemsFilter,
    getAllFilterItems,
} from './tags.js';

const searchInput = document.getElementById('search');

const ingredientsList = document.querySelector('#blue-content ul');
const appliancesList = document.querySelector('#green-content ul');
const ustensilsList = document.querySelector('#red-content ul');

const ingredientInput = document.getElementById('ingredients-input');
const deviceInput = document.getElementById('devices-input');
const ustensilsInput = document.getElementById('ustensils-input');

let tagsArray = [];
let filterTags = recipes;

/**
 * Gére l'ouverture du dropwDonw menu des filtres avancés
 */
function toggleItem() {
    const filterBtn = document.querySelectorAll('.filter-btn');
    const itemClass = this.parentNode.parentNode.parentNode.className;
    for (let i = 0; i < filterBtn.length; i += 1) {
        filterBtn[i].className = 'filter-btn';
    }
    if (itemClass === 'filter-btn') {
        this.parentNode.parentNode.parentNode.className = 'filter-btn active';
    }
}

/**
 * Gére l'évenement du click sur les filtres avancés
 */
function handleDownMenu() {
    // handle open/close filters
    const arrow = document.querySelectorAll('.fa-angle-down');
    const label = document.querySelectorAll('.filter-title');
    for (let i = 0; i < arrow.length; i += 1) {
        arrow[i].addEventListener('click', toggleItem, false);
        label[i].addEventListener('click', toggleItem, false);
    }
}

/**
 * Affichage des recettes
 * @param {array} recipe
 */
function displayRecipes(recipe) {
    const recipeSection = document.querySelector('.recipe__list');
    if (recipe.length > 0) {
        recipeSection.innerHTML = getAllRecipes(recipe);
    } else {
        recipeSection.innerHTML = '<div class="error-message">« Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</div>';
    }
}

/**
 * Recherche principale
 * @returns array
 */
function handleRecipe() {
    let recipeArr = [];
    const inputValue = searchInput.value.toLowerCase();
    if (inputValue.length >= 3) {
        for (let i = 0; i <= recipes.length - 1; i += 1) {
            const recipeName = recipes[i].name.toLowerCase();
            const recipeDescription = recipes[i].description.toLowerCase();
            if (recipeName.includes(inputValue)) {
                recipeArr.push(recipes[i]);
            } else if (recipeDescription.includes(inputValue)) {
                recipeArr.push(recipes[i]);
            } else {
                for (let j = 0; j <= recipes[i].ingredients.length - 1; j += 1) {
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

/**
 * affichage des tags
 */
function displayListItem() {
    const recipesList = handleRecipe();
    let [filterIngre, filterAppli, filterUsten] = getAllFilterItems(recipesList);
    // if(tagsArray)
    if (tagsArray.length !== 0) {
        const filterArrayCurrent = updateFilterListData();
        filterIngre = filterArrayCurrent[0];
        filterAppli = filterArrayCurrent[1];
        filterUsten = filterArrayCurrent[2];
    }
    ingredientsList.innerHTML = filterList(filterIngre);
    appliancesList.innerHTML = filterList(filterAppli);
    ustensilsList.innerHTML = filterList(filterUsten);
    addEventOnTag();
}

// gére l'évènement du clique
searchInput.addEventListener('input', () => {
    if (tagsArray.length === 0) {
        displayRecipes(handleRecipe());
        displayListItem();
    } else {
        displayRecipes(filterRecipeByTag());
        displayListItem();
    }
});

/**
 * Mets à jour la liste des items en fonction du mot ajouté
 * @param {HtmlElement} input
 * @param {HtmlElement} list
 * @param {String} type
 */
function handleFilterInput(input, list, type) {
    let [filterIngre, filterAppli, filterUsten] = getAllFilterItems(recipes);
    const filterArrayCurrent = updateFilterListData();
    let item;
    if (tagsArray.length !== 0) {
        filterIngre = filterArrayCurrent[0];
        filterAppli = filterArrayCurrent[1];
        filterUsten = filterArrayCurrent[2];
    }
    switch (type) {
        case 'ingredients':
            item = getItemsFilter(input, filterIngre);
            break;
        case 'devices':

            item = getItemsFilter(input, filterAppli);

            break;
        case 'ustensils':
            item = getItemsFilter(input, filterUsten);
            break;
        default:
            console.log('failed');
    }
    // eslint-disable-next-line no-param-reassign
    list.innerHTML = filterList(item);

    addEventOnTag();
}

/**
 * Ajout un évenement pour mettre a jour la liste des filtres
 */
ingredientInput.addEventListener('input', () => {
    handleFilterInput(ingredientInput, ingredientsList, 'ingredients');
});

deviceInput.addEventListener('input', () => {
    handleFilterInput(deviceInput, appliancesList, 'devices');
});

ustensilsInput.addEventListener('input', () => {
    // updateFilterListData();
    handleFilterInput(ustensilsInput, ustensilsList, 'ustensils');
});

/**
 * recuperer toutes les recettes en fonction de l'ingredient dans les tags
 * @returns array
 */
function filterRecipeByTag() {
    /* En fonction du type du tag ajouté retourne tous les ingrédiants, ustensils ou appareils
    correspondant */
    filterTags = handleRecipe();
    tagsArray.forEach((tag) => {
        switch (tag.type) {
            case 'ingredients':
                filterTags = filterTags.filter((recipe) => (
                    recipe.ingredients.some((ingredient) => (
                        ingredient.ingredient.toLowerCase().includes(tag.name.toLowerCase())))));
                break;
            case 'devices':
                filterTags = filterTags.filter((recipe) => recipe.appliance.toLowerCase()
                    .includes(tag.name.toLowerCase()));
                break;
            case 'ustensils':
                filterTags = filterTags.filter((recipe) => (
                    recipe.ustensils.some((ustensil) => (
                        ustensil.toLowerCase().includes(tag.name.toLowerCase())))));
                break;
            default:
                console.log('failed');
        }
    });
    console.log(filterTags);
    return filterTags;
}
/**
 * enlève les items de la liste en fonction des tags ajoutés
 * @param {array} filterTag
 * @returns array
 */
function checkTags(filterTag) {
    tagsArray.forEach((item) => {
        filterTag = filterTag.filter(
            (tag) => tag.toLowerCase() !== item.name.toLowerCase(),
        );
    });
    return filterTag;
}

/**
 * affiche du nouveau filtre ingredient
 * @param {array} arr
 */
function updateFilterListData() {
    // retourne les elements de chaque filtre
    let [filterIngre, filterAppli, filterUsten] = getAllFilterItems(filterTags);
    filterIngre = checkTags(filterIngre);
    filterAppli = checkTags(filterAppli);
    filterUsten = checkTags(filterUsten);

    // Affichage les éléments filtré
    ingredientsList.innerHTML = filterList(filterIngre);
    appliancesList.innerHTML = filterList(filterAppli);
    ustensilsList.innerHTML = filterList(filterUsten);
    // ajoute l'évènement click pour chaque éléments
    addEventOnTag();
    return [filterIngre, filterAppli, filterUsten];
}

/**
 * Supprime le tag séléctionné
 * @param {object} tagItem
 */
export default function removeTag(tagItem) {
    // Supprime le tag lors du click
    tagsArray = tagsArray.filter(
        (tag) => tag.name !== tagItem.name,
    );

    filterTags = recipes;
    // check s'il y a au moins 1 tag
    if (tagsArray.length > 0) {
        filterRecipeByTag();
    }
    // maj des items dans les filtres
    updateFilterListData();

    // Affichage des recettes filtrées
    displayRecipes(filterTags);

    // affiche les tags dans les filtres respectifs
    renderTags(tagsArray);
}

/**
 * Ajoute du tag séléctioné
 * @param {event} e
 */
function addTag(e) {
    // creation d'objet
    const newTag = {
        name: e.target.textContent,
        type: e.target.offsetParent.classList[1],
    };

    // Verifie si l'objet existe dans le tableau
    const id = tagsArray.findIndex((item) => item.name === newTag.name);

    if (id < 0) {
        // ajoute dans le tableau
        tagsArray.push(newTag);
        filterRecipeByTag();
        // console.log(filterTags);
        // Affiche les recettes en fonction des tags ajoutés
        displayRecipes(filterTags);
        // affichage du tag
        renderTags(tagsArray);
        // Mets a jour les filtres
        updateFilterListData();
    }
}

function renderTags(tags) {
    // console.log(tags);
    const tagsSection = document.querySelector('.tags__list');
    tagsSection.innerHTML = '';
    tags.forEach((item) => {
        const tag = tagsList(item);
        tag.querySelector('svg').addEventListener('click', () => {
            removeTag(item);
        });
        tagsSection.append(tag);
    });
}

/**
 * ajout de l'évènement click a tous les éléments de filtres avancés
 */
function addEventOnTag() {
    // recuperes tous les li
    const allItems = document.querySelectorAll('.dropdown-item');
    allItems.forEach((elem) => {
        elem.addEventListener('click', (e) => {
            addTag(e);
        });
    });
}

function init() {
    handleDownMenu();
    displayListItem();
    displayRecipes(recipes);
}

init();
