let url = new URL(window.location.href); //récupération de l'ID dans l'URL
let id = url.searchParams.get("id");

document.getElementById('orderId').innerText = id;

localStorage.removeItem('cart'); 