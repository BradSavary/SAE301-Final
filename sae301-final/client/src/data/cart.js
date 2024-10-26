import { ProductData } from './products.js';
import { itemsPanierView} from "../ui/itemsPanier/itemsPanier.js"
import { C } from "../main.js";

let CartData = {};



CartData.getItems = function() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

CartData.totalPrice = function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    cart.forEach(item => {
        total += item.price;
    });
    return total;
}

// Fonction pour mettre à jour l'affichage du prix total
CartData.updateTotalPrice = function() {
    let total = CartData.totalPrice();
    document.querySelector("#totalPrice").textContent = ' €' +total.toFixed(2) ;
}

// Mettre à jour le prix total lors de l'ajout d'un article
CartData.addItem = async function(event) {
    if (event.target.dataset.products) {
        const productId = event.target.dataset.products;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let product = await ProductData.fetch(productId);
        product = product[0];
        let option = document.querySelector('#selectSizes').value;
        let size = await ProductData.fetchBySize(option);
        size = size[0]
        
        cart.push({
            id: product.id,
            libelle: product.libelle,
            price: product.price,
            size: size.size,
            url: product.url,
        });

        localStorage.setItem('cart', JSON.stringify(cart));

        let data = JSON.parse(localStorage.getItem('cart')) || [];
        let html = itemsPanierView.render(data);
        document.querySelector("#itemsPanierList").innerHTML = html;

        // Mettre à jour le prix total
        CartData.updateTotalPrice();
    }
}

// Mettre à jour le prix total lors de la suppression d'un article
CartData.removeItemCart = function(event) {
    if (event.target.dataset.delete) {
        const productId = event.target.dataset.delete;
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== parseInt(productId)); // Ensure productId is an integer
        localStorage.setItem('cart', JSON.stringify(cart)); // Update the cart in localStorage
        let data = JSON.parse(localStorage.getItem('cart')) || [];
        let html = itemsPanierView.render(data);
        document.querySelector("#itemsPanierList").innerHTML = html;

        // Mettre à jour le prix total
        CartData.updateTotalPrice();
    }
}

export { CartData };
// export { UserData };
