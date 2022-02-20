let url = new URL(window.location.href); //récupération de l'ID dans l'URL
let id = url.searchParams.get("id");

fetch(`http://127.0.0.1:3000/api/products/${id}`) // connexion à l'API
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) { // insertion du HTML du canapé
        document.querySelector('title').innerText = value.name;
        img = document.getElementsByClassName("item__img")[0].appendChild(document.createElement("img"));
        img.setAttribute('src', value.imageUrl)
        img.setAttribute('alt', value.altTxt)
        document.getElementById("title").innerText = value.name;
        document.getElementById("price").innerText = value.price;
        document.getElementById("description").innerText = value.description;
        for (let color of value.colors) {
            option = document.getElementById("colors").appendChild(document.createElement("option"));
            option.setAttribute("value", color);
            option.innerText = color;
        };
    })
    .catch(function (err) {
        // Une erreur est survenue
        console.log("Erreur : " + err);
    });


//clic sur "ajouter au panier"
document
    .getElementById("addToCart")
    .addEventListener('click', function () {
        let canape = {
            id: id,
            color: document.getElementById("colors").value,
            number: parseInt(document.getElementById("quantity").value)
        }
        let tab = [];
        // si on clique sur "ajouter au panier" sans renseigner la couleur et le nombre
        if (canape.number <= 0 || canape.color == "") {
            return;
        }
        if (localStorage.getItem("cart") != null) { //si le panier existe déjà dans le localstorage
            tab = JSON.parse(localStorage.getItem("cart"));
            let insert = true;
            for (let i of tab) {
                // si un canapé de la même sorte et de la même couleur est déjà dans le panier
                if (i.id == canape.id && i.color == canape.color) {
                    i.number = i.number + canape.number;
                    insert = false;
                }
            }
            if (insert) {
                tab.push(canape);
            }
        }
        else { // si le panier n'existe pas dans le local storage
            tab.push(canape);
        }
        localStorage.setItem("cart", JSON.stringify(tab));
        document.getElementById("colors").value = "";
        document.getElementById("quantity").value = 0
        alert("Produit ajouté au panier");
    })

