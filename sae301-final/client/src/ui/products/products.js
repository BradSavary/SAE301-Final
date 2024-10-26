import { genericRenderer } from "../../lib/utils.js"; 

const productsFiles = await fetch("src/ui/products/products.html.inc");
const products = await productsFiles.text();

let ProductView = {

    render: function(data){
        let html = "";
        for(let obj of data){
            html += genericRenderer(products, obj);
        }
        return html;
    },
}

export {ProductView};