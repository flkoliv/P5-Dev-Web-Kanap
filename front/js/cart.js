

fetch(`http://127.0.0.1:3000/api/products/`)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {

        try {
            tab = JSON.parse(localStorage.getItem("cart"));
            for (let canape of tab) {
                for (let canap of value) {
                    if (canap._id == canape.id) {
                        article = document.getElementById("cart__items").appendChild(document.createElement("article"));
                        article.setAttribute("class", "cart__item");
                        article.setAttribute("data-id", canap._id);
                        article.setAttribute("data-color", canape.color);
                        divImage = article.appendChild(document.createElement("div"));
                        divImage.setAttribute("class", "cart__item__img");
                        image = divImage.appendChild(document.createElement("img"));
                        image.setAttribute("src", canap.imageUrl);
                        image.setAttribute("alt", canap.altTxt);
                        divCartItem = article.appendChild(document.createElement("div"));
                        divCartItem.setAttribute("class", "cart__item__content")
                        divCartDescription = divCartItem.appendChild(document.createElement("div"));
                        divCartDescription.setAttribute("class", "cart__item__content__description");
                        h2 = divCartDescription.appendChild(document.createElement("h2"));
                        h2.innerText = canap.name;
                        p = divCartDescription.appendChild(document.createElement("p"));
                        p.innerText = canape.color;
                        p = divCartDescription.appendChild(document.createElement("p"));
                        p.innerText = canap.price + "€";
                        divCartSettings = divCartItem.appendChild(document.createElement("div"));
                        divCartSettings.setAttribute("class", "cart__item__content__settings")
                        divCartSettingsQuantity = divCartSettings.appendChild(document.createElement("div"));
                        divCartSettingsQuantity.setAttribute("class", "cart__item__content__settings__quantity")
                        p = divCartSettingsQuantity.appendChild(document.createElement("p"));
                        p.innerText = "Qté : ";
                        input = divCartSettingsQuantity.appendChild(document.createElement("input"));
                        input.setAttribute("type", "number");
                        input.setAttribute("class", "itemQuantity");
                        input.setAttribute("name", "itemQuantity");
                        input.setAttribute("min", 1);
                        input.setAttribute("max", 100);
                        input.setAttribute("value", canape.number);
                        divCartSettingsDelete = divCartSettings.appendChild(document.createElement("div"));
                        divCartSettingsDelete.setAttribute("class", "cart__item__content__settings__delete")
                        p = divCartSettingsDelete.appendChild(document.createElement("p"));
                        p.setAttribute("class", "deleteItem")
                        p.innerText = "Supprimer"
                    }
                }

            }
            calculTotaux();
            setEvent();

        }
        catch {
            //erreur
        }
    })
    .catch(function (err) {
        // Une erreur est survenue
    });





function calculNombreTotal() {
    const collection = document.getElementsByClassName("cart__item");
    let total = 0;
    for (item of collection) {
        total += parseInt(item.getElementsByClassName("itemQuantity")[0].value)
    }
    document
        .getElementById("totalQuantity")
        .innerText = total;
    return total;
}

function calculPrixTotal() {
    const collection = document.getElementsByClassName("cart__item");
    let total = 0;
    for (item of collection) {
        prix = item.querySelector(".cart__item__content__description").children[2].innerText.slice(0, -1);
        total += parseInt(item.getElementsByClassName("itemQuantity")[0].value) * parseInt(prix)
    }
    document
        .getElementById("totalPrice")
        .innerText = total;
    return total;
}

function calculTotaux() {
    calculNombreTotal();
    calculPrixTotal();
}

function setEvent() {
    const collection = document.getElementsByClassName("cart__item");
    for (i = 0; i < collection.length; i++) {
        const x = i;
        elt1 = collection[x].getElementsByClassName("deleteItem");
        elt2 = collection[x].getElementsByClassName("itemQuantity");

        
        elt1[0].addEventListener('click', function () {
            tab.splice(x, 1);
            localStorage.setItem("cart", JSON.stringify(tab));
            collection[x].remove();
            console.log(x);
            location.reload();
            calculTotaux();
        })

        elt2[0].addEventListener('change', function (event) {
            tab[x].number = parseInt(event.target.value);
            localStorage.setItem("cart", JSON.stringify(tab));
            calculTotaux();
        })
    }
}