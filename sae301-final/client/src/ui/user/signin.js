import { UserData } from "../../data/users.js";



const createAccountFiles = await fetch("src/ui/user/signin.html.inc");
const createAccount = await createAccountFiles.text();

let createAccountView = {
    render: function() {
        let html = "";
        html = createAccount;
        return html;
    }
};

export {createAccountView};

let handler_submit = async function(ev) {
    ev.preventDefault();

    let form = ev.target.closest('form');
    let data = new FormData(form);

    let password = data.get("password");
    let confirm_password = data.get("confirm_password");
    if (password !== confirm_password) {
        alert("Les mots de passe ne correspondent pas");
        return;
    }
    data.delete("confirm_password");

    let firstname = data.get("firstname");
    let lastname = data.get("lastname");
    let email = data.get("email");
    if (!firstname || !lastname || !email) {
        alert("Veuillez remplir tous les champs");
        return;
    }
    let ok = await UserData.create(Object.fromEntries(data.entries()));
    if (ok) {
        window.location = "../../index.html";
    } else {
        alert("Erreur lors de l'inscription");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let submitButton = document.querySelector("button[type=submit]");
    if (submitButton) {
        submitButton.addEventListener("click", function(event) {
            event.preventDefault();
            // Your sign-in logic here
        });
    } else {
        console.error("Submit button not found");
    }
});