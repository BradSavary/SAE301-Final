import { ProductData } from "./data/products.js";
import { CartData } from "./data/cart.js";
import { CategoryData } from "./data/category.js";
import { ProductView } from "./ui/products/products.js";
import { itemsNavView } from "./ui/itemsNav/itemsNav.js";
import { NavView } from "./ui/nav/nav.js";
import { FooterView } from "./ui/footer/footer.js";
import { MeaView } from "./ui/mea/mea.js";
import { createAccountView } from "./ui/user/signin.js";
import { itemsBuyingView } from "./ui/itemsBuying/itemsBuying.js";
import { itemsPanierView} from "./ui/itemsPanier/itemsPanier.js"
import { sizesOptionsView } from "./ui/sizesOptions/sizesOptions.js";


let C = {}

C.renderHTML = function (selector, html) {
    // console.log('Appel de renderHTML avec selector:', selector, 'et html:', html);
    document.querySelector(selector).innerHTML = html;
};

C.loadcart = function() {
            let data = JSON.parse(localStorage.getItem('cart')) || [];
            console.log(data);
            let html = itemsPanierView.render(data);
            C.renderHTML("#itemsPanierList", html);
};


// Fonction pour vider le panier
CartData.clearCart = function(ev) {
    if(ev.target.id === "deleteCart") {
    localStorage.removeItem('cart');
    C.loadcart();
}}



C.loadMea = async function(){
    let html = MeaView.render();
    C.renderHTML("#mea", html);
};

C.navSetup = async function(){
    let megaMenu = document.getElementById("mega-menu");
    let panier = document.getElementById("panierMenu");
    let searchMenu = document.getElementById("searchMenu");
    
    document.querySelector("#burger").addEventListener("click", function () {
        megaMenu.classList.toggle("-translate-x-full");
        megaMenu.classList.toggle("translate-x-0");
    });
    
    let openerPanier = document.getElementById("openPanier");
    openerPanier.addEventListener("click", function () {
        panier.classList.toggle("hidden");
    });
    
    let closerPanier = document.getElementById("closePanier");
    closerPanier.addEventListener("click", function () {
        panier.classList.toggle("hidden");
    });
    
    let openerSearch = document.getElementById("searchingButton");
    openerSearch.addEventListener("click", function () {
        searchMenu.classList.toggle("hidden");
    });
    
    let closerSearch = document.getElementById("closeSearch");
    closerSearch.addEventListener("click", function () {
        searchMenu.classList.toggle("hidden");
    });
    
    document.addEventListener("click", function (event) {
        let isClickInsidePanier = panier.contains(event.target);
        let isClickInsideMegaMenu = megaMenu.contains(event.target);
        let isClickOnOpenerPanier = openerPanier.contains(event.target);
        let isClickOnBurger = document.querySelector("#burger").contains(event.target);
        let isClickOnRemoveItem = document.querySelector("#removeItemsFromPanier");
    
        if (!isClickInsidePanier && !isClickOnOpenerPanier && !isClickOnRemoveItem) {
            panier.classList.add("hidden");
        }
    
        if (!isClickInsideMegaMenu && !isClickOnBurger) {
            megaMenu.classList.add("-translate-x-full");
            megaMenu.classList.remove("translate-x-0");
        }
    });
};

C.navItemsSetup = async function(){ 
    let data = await CategoryData.fetchAll();
    let html = itemsNavView.render(data);
    let container = document.querySelector("#navItems");
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    while (tempDiv.firstChild) {
        container.appendChild(tempDiv.firstChild);
    }
};

C.handler_loadSizes = async function(event){
    if (event.target.dataset.libelle) {
        let data = await ProductData.fetchByLibelle(event.target.dataset.libelle);
        let html = sizesOptionsView.render(data);
        C.renderHTML("#selectSizes", html);
}}

C.burgerItemsSetup = async function(){
    let data = await CategoryData.fetchAll();
    let html = itemsNavView.render(data);
    let container = document.querySelector("#burgerItems");
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    while (tempDiv.firstChild) {
        container.appendChild(tempDiv.firstChild);
    }
}

C.loadnav = async function() {
    let html = NavView.render();
    C.renderHTML("#nav", html);
    C.navItemsSetup();
    C.burgerItemsSetup();
    C.navSetup();
}

C.loadProducts = async function () {
    let data = await ProductData.fetchAll();
    let html = ProductView.render(data);
    C.renderHTML("#itemsSearch", html);
};

C.loadFooter = async function(){
    let html = FooterView.render();
    C.renderHTML("#footer", html);
};


C.loadCreateAccount = async function(){
    let html = createAccountView.render();
    C.renderHTML("#main", html);
};

C.handler_sortByCategory = async function (event) {
        if ( event.target.dataset.category) {
            let categoryId = event.target.dataset.category;
            let data = await ProductData.fetchByCategory(categoryId);
            let html = ProductView.render(data);
            C.resetContent();
            C.renderHTML("#itemsSearch", html);
        }
    };

 C.handler_openProductDetails=async function(event) {
        if (event.target.dataset.products) {
            let productId = event.target.dataset.products;
            let data = await ProductData.fetch(productId);
            let html = itemsBuyingView.render(data);
            C.resetContent();
            C.renderHTML("#itemsBuying", html);
        }
}


C.handler_setupAllProductClickListener = function(event) {
        if (event.target.id === "allProduct") {
           C.resetContent();
             C.loadProducts();
             
    };
};

C.loadCreateAccount = async function(){
    let html = createAccountView.render();
    C.resetContent();
    C.renderHTML("#createAccount", html);
};

C.handler_ProfilPageClickListener = function(event) {
    if (event.target.id === "profilIcon") {
        C.loadCreateAccount();
    }
}

C.resetContent = function(){
    C.renderHTML("#itemsSearch", "");
    C.renderHTML("#itemsBuying", "");
    C.renderHTML("#createAccount", "");
};

let V = {};



// V.init function to initialize rendering of mea and navbar
V.init = function(){
    document.querySelector("#itemsSearch").addEventListener("click", C.handler_openProductDetails);
    document.querySelector("#nav").addEventListener("click", C.handler_sortByCategory);
    document.querySelector('#nav').addEventListener('click', C.handler_setupAllProductClickListener);
    document.querySelector("#nav").addEventListener("click", C.handler_setupCartNumber);
    // document.querySelector("#nav").addEventListener("click", C.handler_ProfilPageClickListener);
    document.querySelector("#nav").addEventListener("click", CartData.clearCart);
    document.querySelector('#itemsBuying').addEventListener('click', CartData.addItem);
    document.querySelector('#nav').addEventListener('click', CartData.removeItemCart);
    document.querySelector('#nav').addEventListener('click', C.handler_ProfilPageClickListener);
    document.querySelector("#itemsSearch").addEventListener("click", C.handler_loadSizes);


};


// C.init function to initialize V.init
C.init = async function(){
    V.init(); // Ensure V.init is awaited
    C.loadMea();
    C.loadnav();
    C.loadFooter();
    C.loadProducts();
    C.loadcart();
    CartData.updateTotalPrice();
};

// Call C.init to start the initialization process
C.init();

export {C};