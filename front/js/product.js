let url = new URL(window.location.href);
let id = url.searchParams.get("id");

fetch(`http://127.0.0.1:3000/api/products/${id}`)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {
        document.querySelector('title').innerText = value.name;
        img = document
            .getElementsByClassName("item__img")[0]
            .appendChild(document.createElement("img"));
        img.setAttribute('src', value.imageUrl)
        img.setAttribute('alt', value.altTxt)
        document
            .getElementById("title")
            .innerText = value.name;
        document
            .getElementById("price")
            .innerText = value.price;
        document
            .getElementById("description")
            .innerText = value.description;
        for (let color of value.colors){
            option = document
                .getElementById("colors")
                .appendChild(document.createElement("option"));
            option.setAttribute("value", color);
            option.innerText=color;
        };
    })
    .catch(function (err) {
        // Une erreur est survenue
    });

document
    .getElementById("addToCart")
    .addEventListener('click', function () {
        // let number = parseInt(document.getElementById("quantity").value);
        // let color = document.getElementById("colors").value;
        // let tab = [];
        let canape = {
            id: id,
            color: document.getElementById("colors").value,
            number: parseInt(document.getElementById("quantity").value)
        }
        if (canape.number==0  || canape.color==""){
            return;
        }
        try {
            tab = JSON.parse(localStorage.getItem("cart"));
            let insert = true;
            for (let i of tab) {

                if (i.id == canape.id && i.color == canape.color) {
                    i.number = i.number + canape.number;
                    insert = false;
                }
            }
            if (insert){
                tab.push(canape);
            }

        }
        catch {
            tab = [];
            tab.push(canape);
        }
        localStorage.setItem("cart", JSON.stringify(tab));
        alert("Produit ajouté au panier");

    }
    )