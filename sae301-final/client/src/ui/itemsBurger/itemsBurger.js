import { genericRenderer } from "../../lib/utils.js"; 

const itemsBurgerFiles = await fetch("src/ui/itemsBurger/itemsBurger.html.inc");
const itemsBurger = await itemsBurgerFiles.text();

let itemsBurgerView = {

    render: function(data){
        let html = "";
        for(let obj of data){
            html += genericRenderer(itemsBurger, obj);
        }
        return html;
    },
}

export {itemsBurgerView};