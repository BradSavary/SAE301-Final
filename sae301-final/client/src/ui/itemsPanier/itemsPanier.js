import { genericRenderer } from "../../lib/utils.js"; 

const itemsPanierFiles = await fetch("src/ui/itemsPanier/itemsPanier.html.inc");
const itemsPanier = await itemsPanierFiles.text();

let itemsPanierView = {

    render: function(data){
        let html = "";
        for(let obj of data){
            html += genericRenderer(itemsPanier, obj);
        }
        return html;
    },
}

export {itemsPanierView};

//faire apparaitre les items du panier dans #itemsPanierList