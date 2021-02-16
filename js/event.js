
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





function min (){
    let min ;
    if (tabPizza.length > 0)
        min = tabPizza[0].prix;
    else
        min = 0;

    for (let i = 1; i<tabPizza.length-1; i++){
        if (tabPizza[i].prix < min){
            min = tabPizza[i].prix;
        }
    }
    return min;
}

function max (){
    let max;
    if (tabPizza.length>0)
        max = tabPizza[0].prix;
    else
            max = 0;
    
    for (let i = 1; i<tabPizza.length-1; i++){
        if (tabPizza[i].prix > max){
            max = tabPizza[i].prix;
        }
    }
            
    return max;    
}



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

let inputNom = document.querySelector('#champs-nom');
let inputPrix1 = document.querySelector ('#champs-prix-1');
let inputPrix2 = document.querySelector ('#champs-prix-2');
let inputVegetarienne = document.querySelector('#champs-vegetarienne');
let inputDisponible = document.querySelector ('#champs-disponible');



inputPrix1.value = min();
inputPrix2.value = max();





/* Ajoute une liste d'ingredients choisis en dessous du select */
inputIngredientsSelect.addEventListener ('change', () => {

    // console.log (inputIngredientsSelect.value);


    /* Test si l'ingredient n'est pas deja dans la liste */
    if ((!tabIngredients.includes(inputIngredientsSelect.value ) || tabIngredients.length == 0)){
        tabIngredients.push (inputIngredientsSelect.value);

        let divIngredientsSelected = document.createElement ('div');
        divIngredientsSelected.classList.add ('div-ingredient');
        let nomIngredientSelected = document.createElement ('p');
        nomIngredientSelected.classList.add ('nom-ingredient');
        nomIngredientSelected.innerHTML = inputIngredientsSelect.value;

        let croix = document.createElement ('p');
        croix.classList.add ('croix-list');
        croix.innerHTML = 'X';

        inputIngredientsSelected.appendChild (divIngredientsSelected);
        divIngredientsSelected.appendChild (nomIngredientSelected);
        divIngredientsSelected.appendChild (croix);


        /* Gestion du clic de la croix pour supprimer une selection */
        let tabCroix = document.querySelectorAll ('.croix-list');

        function clickedCroix (e){
            let ingredientASupprimerStr = e.target.parentElement.children[0].innerText;
            if (tabIngredients.includes(ingredientASupprimerStr)){
                tabIngredients.splice(tabIngredients.indexOf(ingredientASupprimerStr), 1);
                e.target.parentElement.remove();
                console.log (tabIngredients);
            }
        }
        for (i = 0; i < tabCroix.length; i++){  
            tabCroix[i].addEventListener ('click', clickedCroix);
        }

    }
    else {
        console.log("L'ingredient est déjà dans la liste des ingrédients");
    }

    /* Remise a 'Choisissez un ingredient' */
    inputIngredientsSelect.selectedIndex = 0;
    
});


       



let form = document.querySelector("#form-select-pizzas");



form.addEventListener ('submit', (e)=>{
    e.preventDefault();
    // let inputIngredientsSelect = document.querySelector ('#champs-select-ingredients');
    // let inputIngredientsSelected = document.querySelector ('#champs-selected-ingredients');


    // Afficher Uniquement les pizzas de tabPizza concernées par les filtres

    let pizzaAAfficher = [];
    tabPizza.forEach(pizza => {

        // Créé un tableau avec les ingredients en minuscules
        let ingr = [];
        for(let i = 0; i < pizza.ingredients.length; i++){
            ingr [i] = pizza.ingredients[i].toLowerCase();
        }

        // Si le nom de la pizza entré n'est pas vide alors affiche l'unique pizza portant ce nom 
        if (inputNom.value != ""){
            if (pizza.nom.includes(inputNom.value)){
                if ((pizza.prix >= inputPrix1.value && pizza.prix <= inputPrix2.value) && (tabIngredients.every (i=>ingr.includes(i)))){
                    pizzaAAfficher.push(pizza);
                }
            }
        }
        else {
            if ((pizza.prix >= inputPrix1.value && pizza.prix <= inputPrix2.value) && (tabIngredients.every (i=>ingr.includes(i)))){
                pizzaAAfficher.push(pizza);
            }
        }
       
    });

    afficherPizza (pizzaAAfficher);
    
});






/* Affiche les pizzas sous forme de cartes avec une image, un nom, un prix et une liste des ingredients */
function afficherPizza (tableauPizza){
    console.log (tableauPizza);

    let pizzaDOM =  document.querySelector('.resultatPizza');
    if (tableauPizza.length > 0){

        pizzaDOM.innerHTML = "";

        tableauPizza.forEach(pizza => {    
            let divCard = document.createElement ('div');
            divCard.classList.add('card');
            
            let pizzaImages = document.createElement('img');
            pizzaImages.classList.add ('card-image');
            pizzaImages.src = pizza.imageUrl;
            pizzaImages.alt = 'pizza';
            
            let pizzaH3 = document.createElement('h3');
            pizzaH3.classList.add('card-H3');
            pizzaH3.innerHTML = pizza.nom;
            
            let pizzaParagraphe = document.createElement('p');
            pizzaParagraphe.classList.add('card-paragraphe');
            pizzaParagraphe.innerHTML = pizza.ingredients.join(', ');
    
            let pizzaPrix = document.createElement ('p');
            pizzaPrix.classList.add ('card-price');
            pizzaPrix.innerHTML = pizza.prix;
    
            pizzaDOM.appendChild(divCard);
            divCard.appendChild (pizzaImages);
            divCard.appendChild(pizzaH3);
            divCard.appendChild(pizzaPrix);
            divCard.appendChild(pizzaParagraphe);
        });

    }   

}