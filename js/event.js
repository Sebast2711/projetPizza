
let brandlogo = document.querySelector('#brand-logo');
let brandp = document.querySelector ('#brand-p');
let navHamburger = document.querySelector('#hamburger-icon');

function changeDeFenetre (){
    window.location.href = "../index.html";
}

brandlogo.addEventListener ('click', changeDeFenetre);
brandp.addEventListener ('click', changeDeFenetre);

navHamburger.addEventListener('click', ()=>{
    let menu = document.querySelector('.menu');
    menu.classList.toggle('show-menu');
});



function getIngredientsFromAllPizzas (){
    let ingredientsFromAllPizzas = [];

    tabPizza.forEach(pizza => {
        for (let j = 0; j < pizza.ingredients.length; j++){
            let ingredient = pizza.ingredients[j];
            ingredient = ingredient.toLowerCase();
            if (!ingredientsFromAllPizzas.includes(ingredient)){
                ingredientsFromAllPizzas[ingredientsFromAllPizzas.length] = ingredient;
            }
        } 
    });
    
    return ingredientsFromAllPizzas;
}

/* Ajoute la liste des ingredients au formulaire dans le select */

/* Pour ameliorer la fonction: */
/*faire des groupes (viandes, fromages, sauces, etc ...)  */

function setIngredientsInSelectInput (){
    let ingredientsFromAllPizzas = getIngredientsFromAllPizzas ();
    let inputIngredientsSelect = document.querySelector('#champs-select-ingredients');
    
    for (let i = 0; i < ingredientsFromAllPizzas.length; i ++){
        let ingredient = ingredientsFromAllPizzas[i];
        inputIngredientsSelect.innerHTML += `<option value="${ingredient}"> ${ingredient}  </option>`
    }
}

setIngredientsInSelectInput ();



let inputIngredientsSelect = document.querySelector ('#champs-select-ingredients');
let inputIngredientsSelected = document.querySelector ('#champs-selected-ingredients');
let tabIngredients = [];

/* Ajoute une liste d'ingredients choisis en dessous du select */
inputIngredientsSelect.addEventListener ('change', () => {

    /* Test si l'ingredient n'est pas deja dans la liste */
    if (!tabIngredients.includes(inputIngredientsSelect.value)){
        tabIngredients.push (inputIngredientsSelect.value);

        let divIngredientsSelected = document.createElement ('div');
        let nomIngredientSelected = document.createElement ('p');
        nomIngredientSelected.innerHTML = inputIngredientsSelect.value;



        /**************************************************************************/
        /***************************** A AJOUTER **********************************/
        /* Une croix qui supprime l'ingredient de la liste quand on clique dessus */
        /*****************************           **********************************/
        /***************************************************************************/




        inputIngredientsSelected.appendChild (divIngredientsSelected);
        divIngredientsSelected.appendChild (nomIngredientSelected);

    }
    else {
        /* Afficher un message qui dit que l'ingredient est deja dans la liste */
        console.log("L'ingredient est déjà dans la liste des ingrédients");
    }

});




let form = document.querySelector("#form-select-pizzas");
form.addEventListener ('submit', (e)=>{
    e.preventDefault();
    // let inputNom = document.querySelector('#champs-nom');
    // let inputPrix = document.querySelector ('#champs-prix');
    // let inputIngredientsSelect = document.querySelector ('#champs-select-ingredients');
    // let inputIngredientsSelected = document.querySelector ('#champs-selected-ingredients');
    
});

