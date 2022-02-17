
fetch("http://127.0.0.1:3000/api/products") // connexion à l'API
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (canapes) {
        for (let canape of canapes) { // insertion du HTML pour chaque canapé
            a = document.getElementById("items").appendChild(document.createElement("a"));
            a.setAttribute("href", "./product.html?id=" + canape._id);

            article = a.appendChild(document.createElement("article"));

            img = article.appendChild(document.createElement("img"));
            img.setAttribute("src", canape.imageUrl);
            img.setAttribute("alt", canape.altTxt);

            h3 = article.appendChild(document.createElement("h3"));
            h3.appendChild(document.createTextNode(canape.name));

            p = article.appendChild(document.createElement("p"));
            p.appendChild(document.createTextNode(canape.description));
        }
    })
    .catch(function (err) {
        // Une erreur est survenue
        console.log("Erreur : " + err);
    });
