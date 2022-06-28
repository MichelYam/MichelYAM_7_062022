/**
 * Retourne la structure HTML de toutes les recettes passés en paramètre
 * @param {array} recipes;
 * @returns html
 */
export default function getAllRecipes(recipes) {
    const filterByTitle = recipes.sort((a, b) => (a.name < b.name ? -1 : 1));
    /**
     * Check les ingredients
     * @param {array} item ;
     * @returns Html structure
     */
    function recipeIngredients(item) {
        let ingredientList = '';
        if (item.unit && item.quantity) {
            ingredientList = `<li>${item.ingredient}: ${item.quantity}${item.unit}</li>`;
        } else if (item.quantity && !item.unit) {
            ingredientList = `<li>${item.ingredient}: ${item.quantity}</li>`;
        } else {
            ingredientList = `<li>${item.ingredient}</li>`;
        }
        return ingredientList;
    }

    return filterByTitle.map((recipe) => (
        ` <article class="recipe__card">
            <div class="img"></div>
            <div class="recipes__card-content">
                <div class="recipe__header">
                    <h2>${recipe.name}</h2>
                    <div>
                     <i class="far fa-clock"></i>
                     <span>${recipe.time} min</span>
                    </div>
                </div>
            <div class="recipe__container">
                <ul>
                    ${recipe.ingredients.map((item) => (
            recipeIngredients(item)
        )).join('')
        }
                </ul>
                <p>${recipe.description}</p>
             </div>
         </div>
        </article>`
    )).join('');
}
