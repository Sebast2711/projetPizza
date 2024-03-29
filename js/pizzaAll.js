function afficherAllPizzas (){

    let pizzaDOM =  document.querySelector('.resultatPizza');


    for (let i = 0; i < tabPizza.length; i++){

        let divCard = document.createElement ('div');
        divCard.classList.add('card');
        
        let pizzaImages = document.createElement('img');
        pizzaImages.classList.add ('card-image');
        pizzaImages.src = tabPizza[i].imageUrl;
        pizzaImages.alt = 'pizza';
        
        let pizzaH3 = document.createElement('h3');
        pizzaH3.classList.add('card-H3');
        pizzaH3.innerHTML = tabPizza[i].nom;
        
        let pizzaParagraphe = document.createElement('p');
        pizzaParagraphe.classList.add('card-paragraphe');
        pizzaParagraphe.innerHTML = tabPizza[i].ingredients.join(', ');

        let pizzaPrix = document.createElement ('p');
        pizzaPrix.classList.add ('card-price');
        pizzaPrix.innerHTML = tabPizza[i].prix;

        pizzaDOM.appendChild(divCard);
        divCard.appendChild (pizzaImages);
        divCard.appendChild(pizzaH3);
        divCard.appendChild(pizzaPrix);
        divCard.appendChild(pizzaParagraphe);

    }   

}
afficherAllPizzas();

