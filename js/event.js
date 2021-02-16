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




let form = document.querySelector("#form-select-pizzas");
let inputNom = document.querySelector('#champs-nom');
let inputPrix1 = document.querySelector ('#champs-prix-1');
let inputPrix2 = document.querySelector ('#champs-prix-2');
let inputIngredientsSelect = document.querySelector ('#champs-select-ingredients');
let inputIngredientsSelected = document.querySelector ('#champs-selected-ingredients');




// Calcul le minimum du prix d'une pizza proposée sur le site
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

// Calcul le maximum du prix d'une pizza proposée sur le site
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

// Initialise les champs reservés au prix avec le minimum et la maximum des prix possible pour une pizza 
inputPrix1.value = min();
inputPrix2.value = max();


// Recuperer les ingredients de toutes le pizzas
function getIngredientsFromAllPizzas (){
    let ingredientsFromAllPizzas = [];

    tabPizza.forEach(pizza => {
        for (let j = 0; j < pizza.ingredients.length; j++){
            let ingredient = pizza.ingredients[j];
            ingredient = ingredient.toLowerCase();
            // Si l'ingredient n'est pas déjà présent dans le tableau alors on l'ajoute
            if (!ingredientsFromAllPizzas.includes(ingredient)){
                ingredientsFromAllPizzas[ingredientsFromAllPizzas.length] = ingredient;
            }
        } 
    });
    return ingredientsFromAllPizzas;
}



/* Ajoute la liste des ingredients au select dans le formulaire */

/* A FAIRE : groupes (viandes, fromages, sauces, etc ...)  */
function setIngredientsInSelectInput (){
    let ingredientsFromAllPizzas = getIngredientsFromAllPizzas ();
    let inputIngredientsSelect = document.querySelector('#champs-select-ingredients');
    
    for (let i = 0; i < ingredientsFromAllPizzas.length; i ++){
        let ingredient = ingredientsFromAllPizzas[i];
        // Ajoute une option au select
        inputIngredientsSelect.innerHTML += `<option value="${ingredient}"> ${ingredient}  </option>`
    }
}
setIngredientsInSelectInput ();




// Tableau des ingredients présents dans la liste des ingredients selectionnés
let tabIngredients = [];

/* Ajoute une liste d'ingredients choisis en dessous du select */
inputIngredientsSelect.addEventListener ('change', () => {


    /* Test si l'ingredient n'est pas deja dans la liste */
    if ((!tabIngredients.includes(inputIngredientsSelect.value ) || tabIngredients.length == 0)){
        tabIngredients.push (inputIngredientsSelect.value);

        // Création d'un emplacement pour afficher l'ingrédient selectionné
        let divIngredientsSelected = document.createElement ('div');
        divIngredientsSelected.classList.add ('div-ingredient');
        let nomIngredientSelected = document.createElement ('p');
        nomIngredientSelected.classList.add ('nom-ingredient');
        nomIngredientSelected.innerHTML = inputIngredientsSelect.value;

        // Création de la croix pour supprimer l'ingrédient
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
            // Suppression de l'ingrédient du tableau tabIngredient
            // Suppression de la div contenant l'ingrédient et la croix
            if (tabIngredients.includes(ingredientASupprimerStr)){
                tabIngredients.splice(tabIngredients.indexOf(ingredientASupprimerStr), 1);
                e.target.parentElement.remove();
            }
        }
        // Ecoute du click sur la croix pour toutes les croix disponibles
        for (i = 0; i < tabCroix.length; i++){  
            tabCroix[i].addEventListener ('click', clickedCroix);
        }

    }
    // Si l'ingrédient est déjà dans la liste
    else {
        // Création d'un élément pour prevenir l'utilisateur
        let pWarning = document.createElement ('p');
        pWarning.classList.add('warning');
        pWarning.innerHTML = 'Ingredient deja selectionné';
        inputIngredientsSelected.appendChild(pWarning);

        // Suppresion de cet élement après 3 secondes
        setTimeout(() => {
            pWarning.remove();
        }, 3000); 
    }

    /* Remise a 'Choisissez un ingredient' */
    inputIngredientsSelect.selectedIndex = 0;
    
});


       



// A AMELIORER

// Afficher Uniquement les pizzas de tabPizza concernées par les filtres

form.addEventListener ('submit', (e)=>{
    e.preventDefault();
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
