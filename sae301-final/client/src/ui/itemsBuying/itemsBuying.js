import { genericRenderer } from "../../lib/utils.js"; 

const itemsBuyingFiles = await fetch("src/ui/itemsBuying/itemsbuying.html.inc");
const itemsBuying = await itemsBuyingFiles.text();

let itemsBuyingView = {

    render: function(data){
        let html = "";
        for(let obj of data){
            html += genericRenderer(itemsBuying, obj);
        }
        return html;
    },
}

export {itemsBuyingView};