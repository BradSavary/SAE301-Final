import { genericRenderer } from "../../lib/utils.js"; 

const navFiles = await fetch("src/ui/nav/nav.html.inc");
const nav = await navFiles.text();

let NavView = {

    render: function(){
        let html = "";
        html = nav;
        return html;
}}

// let NavView = {

//     render: function(data){
//         let html = "";
//         for(let obj of data){
//             html += genericRenderer(nav, obj);
//         }
//         return html;
//     },
// }

export {NavView};