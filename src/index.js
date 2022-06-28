/* eslint-disable no-use-before-define */
import recipes from '../data/recipes.js';
import getAllRecipes from './recipes.js';
import {
    ingrediantsTags,
    appliancesTags,
    ustensilsTags,
    tagsList,
    filterList,
    test,
} from './tags.js';

const searchInput = document.getElementById('search');

const ingredientsList = document.querySelector('#blue-content ul');
const appliancesList = document.querySelector('#green-content ul');
const ustensilsList = document.querySelector('#red-content ul');

const ingredientInput = document.getElementById('ingredients-input');
const deviceInput = document.getElementById('devices-input');
const ustesilsInput = document.getElementById('ustensiles-input');

let tagsArray = [];
let filterTags = recipes;

/**
 * Gére l'ouverture du dropwDonw des filtres avancés
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

window.addEventListener('click', (e) => {
    const filterBtn = document.querySelectorAll('.filter-btn');

    filterBtn.forEach((item) => {
        if (item.classList.contains('active') && e.target === document.querySelector('body')) {
            console.log('test');
        }
    });
});

/**
 * Affichage des recettes
 * @param {array} recipe
 */
function displayRecipes(recipe) {
    const recipeSection = document.querySelector('.recipe__list');
    if (recipe.length > 0) {
        recipeSection.innerHTML = getAllRecipes(recipe);
    } else {
        recipeSection.innerHTML = '« Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.';
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
function displayTagsList() {
    const recipesList = handleRecipe();
    ingredientsList.innerHTML = filterList(ingrediantsTags(recipesList));
    appliancesList.innerHTML = filterList(appliancesTags(recipesList));
    ustensilsList.innerHTML = filterList(ustensilsTags(recipesList));
    handleTagsChecked();
}

// gére l'évènement du clique
searchInput.addEventListener('input', () => {
    displayRecipes(handleRecipe());
    displayTagsList();
});

ingredientInput.addEventListener('input', () => {
    ingredientsList.innerHTML = filterList(test(ingredientInput, ingrediantsTags(recipes)));
});
deviceInput.addEventListener('input', () => {
    appliancesList.innerHTML = filterList(test(deviceInput, appliancesTags(recipes)));
});
ustesilsInput.addEventListener('input', () => {
    ustensilsList.innerHTML = filterList(test(ustesilsInput, ustensilsTags(recipes)));
});

/**
 * recuperer toutes les recettes en fonction de l'ingredient dans les tags
 * @returns array
 */
function filterRecipeByTag() {
    /*
        En fonction du type du tag ajouté retourne tous les ingrédiants, ustensils ou appareils
        correspondant
    */
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
            case 'utensils':
                filterTags = filterTags.filter((recipe) => (
                    recipe.ustensils.some((ustensil) => (
                        ustensil.toLowerCase().includes(tag.name.toLowerCase())))));
                break;
            default:
                console.log('failed');
        }
    });
    // console.log(filterTags);
    return filterTags;
}
/**
 * affiche du nouveau filtre ingredient
 * @param {array} arr ;
 */
function updateFilterListData() {
    // retourne les elements de chaque filtre
    let filterIngre = ingrediantsTags(filterTags);
    let filterAppli = appliancesTags(filterTags);
    let filterUsten = ustensilsTags(filterTags);

    // retourne tous les elements ne correspondant pas aux tags sélectionés
    tagsArray.forEach((item) => {
        filterIngre = filterIngre.filter(
            (tag) => tag !== item.name,
        );
    });
    tagsArray.forEach((item) => {
        filterAppli = filterAppli.filter(
            (tag) => tag !== item.name,
        );
    });
    tagsArray.forEach((item) => {
        filterUsten = filterUsten.filter(
            (tag) => tag !== item.name,
        );
    });

    // Affichage les éléments filtré
    ingredientsList.innerHTML = filterList(filterIngre);
    appliancesList.innerHTML = filterList(filterAppli);
    ustensilsList.innerHTML = filterList(filterUsten);
    // ajoute l'évènement click pour chaque éléments
    handleTagsChecked();
}

/**
 * Supprime le tag séléctionné
 * @param {object} tagItem
 */
function removeTag(tagItem) {
    // Supprime le tag lors du click
    tagsArray = tagsArray.filter(
        (tag) => tag.name !== tagItem.name,
    );

    console.log(tagsArray);
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

    // console.log(tagsArray);
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
function handleTagsChecked() {
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
    displayTagsList();
    displayRecipes(recipes);
}

init();
