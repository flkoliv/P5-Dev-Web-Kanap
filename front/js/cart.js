
function affiche() {
    fetch(`http://127.0.0.1:3000/api/products/`)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (value) {

            try {
                tab = JSON.parse(localStorage.getItem("obj"));
                let htmlToInsert = "";
                let totalPrice = 0;
                let nbArticles = 0;
                for (let canape of tab) {
                    for (let canap of value) {
                        if (canap._id == canape.id) {
                            console.log(canap);
                            totalPrice = totalPrice + canap.price * canape.number;
                            nbArticles = nbArticles + canape.number;
                            htmlToInsert = htmlToInsert +
                                `<article class="cart__item" data-id="${canap._id}" data-color="${canape.color}">
                            <div class="cart__item__img">
                            <img src="${canap.imageUrl}" alt="${canap.altTxt}">
                            </div>
                            <div class="cart__item__content">
                            <div class="cart__item__content__description">
                            <h2>${canap.name}</h2>
                            <p>${canape.color}</p>
                            <p>${canap.price}€</p>
                            </div>
                            <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canape.number}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                            </div>
                            </div>
                            </div>
                            </article>`

                        }
                    }

                }

                document
                    .getElementById("cart__items")
                    .innerHTML = htmlToInsert;
                document
                    .getElementById("totalPrice")
                    .innerHTML = totalPrice;
                document
                    .getElementById("totalQuantity")
                    .innerHTML = nbArticles;

                const collection = document.getElementsByClassName("cart__item");
                // console.log(collection[0].attributes[1].value);
                for (i = 0; i < collection.length; i++) {
                    const x = i;
                    elt1 = collection[x].getElementsByClassName("deleteItem");
                    elt2 = collection[x].getElementsByClassName("itemQuantity");
                    console.log(tab)


                    elt1[0].addEventListener('click', function () {
                        tab.splice(x, 1);
                        localStorage.setItem("obj", JSON.stringify(tab));
                        affiche();
                    })

                    elt2[0].addEventListener('change', function (event) {
                        tab[x].number = parseInt(event.target.value);
                        localStorage.setItem("obj", JSON.stringify(tab));
                        console.log(tab);
                        affiche();
                    })

                }
            }
            catch {
                //erreur
            }
        })
        .catch(function (err) {
            // Une erreur est survenue
        });
}


affiche();





