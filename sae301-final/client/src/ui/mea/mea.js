const meaFilters = await fetch("src/ui/mea/mea.html.inc");
const mea = await meaFilters.text();

let MeaView = {

    render: function(){
        let html = "";
        html = mea;
        return html;
}}

export {MeaView};