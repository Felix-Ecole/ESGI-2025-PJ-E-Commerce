import { hashPass } from "./main.js"

class User {
    constructor(firstName, lastName, email, password, date) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.date = date;
    }
}

//détection de la connexion du client et redirection vers index.html si connecter
document.getElementById('login').onsubmit = async function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const user = JSON.parse(localStorage.getItem(email));
    if (user) {
        const hashed = await hashPass(password, user.date);
        if (user.password === hashed) {
            localStorage.setItem('connectedUser', email);
            document.location = 'index.html';
            return;
        }
    }
    alert('Identifiants invalides !');
};

//détection de l'inscription du client, création de l'objet user et enregistrement dans le localstorage
document.getElementById('register').onsubmit = async function (e) {
    e.preventDefault();
    const firstName = document.getElementById('regFirstName').value;
    const lastName = document.getElementById('regLastName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas !');
        return;
    }

    if (localStorage.getItem(email)) {
        alert('Utilisateur déjà existant !');
    } else {
        const date = Date.now();
        const hashed = await hashPass(password, date);
        const user = new User(firstName, lastName, email, hashed, date);
        localStorage.setItem(email, JSON.stringify(user));
        alert('Inscription réussie !');
        localStorage.setItem('connectedUser', email);
        document.location = 'index.html';
    }
};

// Si déjà connecter, alors, redirige vers la page d'accueil.
if (localStorage.getItem("connectedUser")) document.location = 'index.html'
