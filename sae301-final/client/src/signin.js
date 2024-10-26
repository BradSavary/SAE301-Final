import { UserData } from "../../data/user.js";

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
    let ok = await UserData.create(data);
    if (ok) {
        window.location = "../index.html";
    } else {
        alert("Erreur lors de l'inscription");
    }
}

let submit = document.querySelector("button[type=submit]");
submit.addEventListener("click", handler_submit);
