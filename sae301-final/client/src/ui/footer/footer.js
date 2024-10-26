const footerFiles = await fetch("src/ui/footer/footer.html.inc");
const footer = await footerFiles.text();

let FooterView = {

    render: function(){
        let html = "";
        html = footer;
        return html;
}}

export {FooterView};