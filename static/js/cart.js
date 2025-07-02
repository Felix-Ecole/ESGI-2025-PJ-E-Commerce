import { logout } from "./main.js"

window["logout"] = logout


// ...

// Si n'est pas connecter, alors, redirige vers la page d'accueil.
if (!localStorage.getItem("connectedUser")) document.location = 'index.html'
