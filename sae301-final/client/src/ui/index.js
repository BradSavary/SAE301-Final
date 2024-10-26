import { genericRenderer } from "../../lib/utils.js"; 

// const templateFile = await fetch("src/ui/product/template.html.inc");
// const template = await templateFile.text();


const templateNavbarFile = await fetch("src/ui/product/research.html.inc");

let ProductView = {

    render: function(data){
        let html = "";
        for(let obj of data){
            html += genericRenderer(template, obj);
        }
        return html;
    },

}


export {ProductView};