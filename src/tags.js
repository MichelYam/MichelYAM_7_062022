/* eslint-disable array-callback-return */
export function ingrediantsTags(recipes) {
    let ingredientsTagsList = [];
    recipes.map((item) => {
        item.ingredients.map((element) => {
            ingredientsTagsList.push(element.ingredient);
        });
    });
    ingredientsTagsList = [...new Set(ingredientsTagsList)];
    ingredientsTagsList = ingredientsTagsList.flat();
    // console.log(ingredientsTagsList);
    return ingredientsTagsList;
}

export function appliancesTags(recipes) {
    let appliancesTagsList = [];
    recipes.map((item) => {
        appliancesTagsList.push(item.appliance);
    });
    appliancesTagsList = [...new Set(appliancesTagsList)];
    // console.log(appliancesTagsList);
    return appliancesTagsList;
}

export function ustensilsTags(recipes) {
    let ustensilsTagsList = [];
    recipes.map((item) => {
        item.ustensils.map((element) => {
            ustensilsTagsList.push(element);
        });
    });
    ustensilsTagsList = [...new Set(ustensilsTagsList)];
    // console.log(ustensilsTagsList);
    return ustensilsTagsList;
}

export function tagsList(recipes) {
    return recipes.map((recipe) => (
        ` <li>
            ${recipe}
        </li>`
    )).join('');
}
