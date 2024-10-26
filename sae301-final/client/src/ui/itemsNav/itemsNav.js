import { genericRenderer } from "../../lib/utils.js"; 

const itemsNavFiles = await fetch("src/ui/itemsNav/itemsNav.html.inc");
const itemsNav = await itemsNavFiles.text();

let itemsNavView = {

    render: function(data){
        let html = "";
        for(let obj of data){
            html += genericRenderer(itemsNav, obj);
        }
        return html;
    },
}

export {itemsNavView};