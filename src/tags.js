export function testaze(recipes) {
    let ingredientsTagsList = [];
    let ustensilsTagsList = [];
    let appliancesTagsList = [];
    recipes.map((item) => {
        item.ingredients.map((element) => (
            ingredientsTagsList.push(element.ingredient)
        ));

        item.ustensils.map((element) => (
            ustensilsTagsList.push(element)
        ));

        appliancesTagsList.push(item.appliance);
    });

    ingredientsTagsList = [...new Set(ingredientsTagsList)].sort();
    appliancesTagsList = [...new Set(appliancesTagsList)].sort();
    ustensilsTagsList = [...new Set(ustensilsTagsList)].sort();
    return [ingredientsTagsList, appliancesTagsList, ustensilsTagsList];
}

/**
 * Retourne les ingrédients passés en paramètre
 * @param {array} recipes ;
 * @returns ingrdiant object
 */
export function ingredientsTags(recipes) {
    let ingredientsTagsList = [];
    recipes.map((item) => (
        item.ingredients.map((element) => (
            ingredientsTagsList.push(element.ingredient)
        ))
    ));
    ingredientsTagsList = ingredientsTagsList.flat();
    ingredientsTagsList = [...new Set(ingredientsTagsList)];
    // console.log(ingredientsTagsList);
    ingredientsTagsList.sort();
    return ingredientsTagsList;
}

/**
 * Retourne les appareils passés en paramètre
 * @param {array} recipes ;
 * @returns appliances object
 */
export function appliancesTags(recipes) {
    let appliancesTagsList = [];
    recipes.map((item) => (
        appliancesTagsList.push(item.appliance)));
    appliancesTagsList = [...new Set(appliancesTagsList)];
    // console.log(appliancesTagsList);
    appliancesTagsList.sort();
    return appliancesTagsList;
}

/**
 * Retourne les ustencils passés en paramètre
 * @param {array} recipes ;
 * @returns ustencils object
 */
export function ustensilsTags(recipes) {
    let ustensilsTagsList = [];
    recipes.map((item) => (
        item.ustensils.map((element) => (
            ustensilsTagsList.push(element)
        ))
    ));
    ustensilsTagsList = [...new Set(ustensilsTagsList)];
    // console.log(ustensilsTagsList);
    ustensilsTagsList.sort();
    return ustensilsTagsList;
}

/**
 * retourne l'ensemble des items du filtres
 * @param {array} recipes ;
 * @returns html dom
 */
export function filterList(recipes) {
    return recipes.map((recipe) => (
        ` <li class="dropdown-item">${recipe.charAt(0).toUpperCase() + recipe.slice(1)}</li>`
    )).join('');
}

/**
 * Création des tags
 * @param {array} tag ;
 * @returns html dom
 */

export function tagsList(tag) {
    const tagItem = document.createElement('div');
    tagItem.setAttribute('class', 'tags__card');
    tagItem.classList.add(`${tag.type}`);
    tagItem.innerText = tag.name.charAt(0).toUpperCase() + tag.name.slice(1);

    const i = document.createElement('i');
    i.setAttribute('class', 'fas fa-times-circle');

    const logo = document.createElement('div');
    logo.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.094l-4.157-4.104 4.1-4.141-1.849-1.849-4.105 4.159-4.156-4.102-1.833 1.834 4.161 4.12-4.104 4.157 1.834 1.832 4.118-4.159 4.143 4.102 1.848-1.849z" /></svg>';

    tagItem.append(logo);

    return tagItem;
}

/**
 * Retournes toutes les valeurs de ce que l'utilisateur à écrit
 * @param {string} input
 * @param {array} array
 * @returns array
 */
export function getItemsFilter(input, array) {
    const inputLower = input.value.toLowerCase();
    const newArr = array.filter((item) => {
        if (item.toLowerCase().includes(inputLower)) {
            return true;
        }
        return false;
    });

    return newArr;
}
