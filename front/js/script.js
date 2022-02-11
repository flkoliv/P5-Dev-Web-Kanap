
fetch("http://127.0.0.1:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {
        let insert = "";
        for (let canape of value) {
            // console.log(canape.name);
            insert = insert + 
                `<a href="./product.html?id=${canape._id}">
                <article>
                <img src="${canape.imageUrl}" alt="${canape.altTxt}">
                <h3 class="productName">${canape.name}</h3>
                <p class="productDescription">${canape.description}</p>
                </article>
                </a>`
        }
        document
            .getElementById("items")
            .innerHTML = insert;

    })
    .catch(function (err) {
        // Une erreur est survenue
    });
