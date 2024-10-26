import { genericRenderer } from "../../lib/utils.js"; 

const sizesOptionsFiles = await fetch("src/ui/sizesOptions/sizesOptions.html.inc");
const sizesOptions = await sizesOptionsFiles.text();

let sizesOptionsView = {

    render: function(data){
        let html = "";
        for(let obj of data){
            html += genericRenderer(sizesOptions, obj);
        }
        return html;
    },
}

export {sizesOptionsView};