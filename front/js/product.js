let url = new URL(window.location.href);
let id = url.searchParams.get("id");

let objLinea = localStorage.getItem("obj");
console.log(objLinea)

fetch(`http://127.0.0.1:3000/api/products/${id}`)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {
        document
            .getElementsByClassName("item__img")[0]
            .innerHTML = `<img src="${value.imageUrl}" alt="${value.altTxt}">`;
        document
            .getElementById("title")
            .innerText = value.name;
        document
            .getElementById("price")
            .innerText = value.price;
        document
            .getElementById("description")
            .innerText = value.description;
        let colorsInsert = `<option value="">--SVP, choisissez une couleur --</option>`;
        for (let color of value.colors) {
            colorsInsert = colorsInsert + `<option value="${color}">${color}</option>`
        }
        document
            .getElementById("colors")
            .innerHTML = colorsInsert;
    })
    .catch(function (err) {
        // Une erreur est survenue
    });

document
    .getElementById("addToCart")
    .addEventListener('click', function () {
        let number = parseInt(document.getElementById("quantity").value);
        let color = document.getElementById("colors").value;
        let tab = [];
        let canape = {
            id: id,
            color: color,
            number: number
        }
        if (number == 0 || color==""){
            return;
        }
        try {
            tab = JSON.parse(localStorage.getItem("obj"));
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
        console.log(tab)


        localStorage.setItem("obj", JSON.stringify(tab));
        alert("produit ajouté au panier")

        // localStorage.clear();

    }
    )