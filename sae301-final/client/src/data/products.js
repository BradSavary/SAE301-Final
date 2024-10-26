import {getRequest} from '../lib/api-request.js';


let ProductData = {};

let fakeProducts = [
    {
        id: 1,
        libelle: "Sleeves",
        price: 25.00,
        description: "Sleeves are a must-have for any game enthusiast. They protect you from wear and tear, and keep them looking fresh and new.",
        stock: 2,
        price_promo: "",
        size: "",
        color:"rouge",
        // url: "https://g2esports.com/cdn/shop/files/514.jpg?v=1724336217&width=1080"
    },
    {
        id: 2,
        libelle: "T-shirt",
        price: 25.00,
        description: "T-shirts are a must-have for any game enthusiast. They protect you from wear and tear, and keep them looking fresh and new.",
        stock: 3,
        price_promo: "",
        size: "S",
        color:"noir",
        // url: "https://g2esports.com/cdn/shop/files/IMG_4256.jpg?v=1725556926&width=900"
    }
]

ProductData.fetch = async function (id) {
    let data = await getRequest("products/" +id)
    return data == false ? fakeProducts.pop() : [data];
};

ProductData.fetchByLibelle = async function (libelle) {
    let data = await getRequest("products?libelle=" + libelle);
    return data == false ? fakeProducts : data;
}

ProductData.fetchBySize = async function (size) {
    let data = await getRequest("products?size=" + size);
    return data == false ? fakeProducts : data;
}

ProductData.fetchByCategory = async function (id) {
    let data = await getRequest("products?categorys=" + id);
    let products = data == false ? fakeProducts : data;

    // Filter out products with duplicate libelle
    let uniqueProducts = [];
    let seenLibelle = new Set();

    for (let product of products) {
        if (!seenLibelle.has(product.libelle)) {
            uniqueProducts.push(product);
            seenLibelle.add(product.libelle);
        }
    }

    return uniqueProducts;
};

ProductData.fetchAll = async function(){
    let data = await getRequest('products');
    let products = data == false ? fakeProducts : data;

    // Filter out products with duplicate libelle
    let uniqueProducts = [];
    let seenLibelle = new Set();

    for (let product of products) {
        if (!seenLibelle.has(product.libelle)) {
            uniqueProducts.push(product);
            seenLibelle.add(product.libelle);
        }
    }

    return uniqueProducts;
}

export {ProductData};