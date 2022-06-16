/* eslint-disable array-callback-return */
export function ingrediantsTags(recipes) {
    let ingredientsTagsList = [];
    recipes.map((item) => {
        item.ingredients.map((element) => {
            ingredientsTagsList.push(element.ingredient);
        });
    });
    ingredientsTagsList = ingredientsTagsList.flat();
    ingredientsTagsList = [...new Set(ingredientsTagsList)];
    // console.log(ingredientsTagsList);
    ingredientsTagsList.sort();
    return ingredientsTagsList;
}

export function appliancesTags(recipes) {
    let appliancesTagsList = [];
    recipes.map((item) => {
        appliancesTagsList.push(item.appliance);
    });
    appliancesTagsList = [...new Set(appliancesTagsList)];
    // console.log(appliancesTagsList);
    appliancesTagsList.sort();
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
    ustensilsTagsList.sort();
    return ustensilsTagsList;
}

export function filterList(recipes) {
    return recipes.map((recipe) => (
        ` <li class="dropdown-item">${recipe}</li>`
    )).join('');
}

export function tagsList(tags) {
    return tags.map((tag) => (`
    <div class="tags__card ${tag.type}">${tag.name}<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.094l-4.157-4.104 4.1-4.141-1.849-1.849-4.105 4.159-4.156-4.102-1.833 1.834 4.161 4.12-4.104 4.157 1.834 1.832 4.118-4.159 4.143 4.102 1.848-1.849z" /></svg></div>
    `)).join('');
}

export const test = (input, array) => {
    const inputLower = input.value.toLowerCase();
    const newArr = array.filter((item) => {
        if (item.toLowerCase().includes(inputLower)) {
            return true;
        }
        return false;
    });
    return newArr;
}

// export function handleTagsChecked() {
//     const allItems = document.querySelectorAll('.dropdown-item');
//     const allChecked = [];

//     console.log(allItems);
// }
