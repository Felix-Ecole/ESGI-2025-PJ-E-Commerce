# TP : E-commerce
- **Auteurs :** Félix Lhoste & Tristan Philipon
- **Date :** Juillet 2025

## Structure du projet
- **`index.html`** : Page d'accueil présentant la liste des produits et leur mise en avant.
- **`auth.html`** : Formulaire de connexion et d'inscription des utilisateur·rice·s.
- **`cart.html`** : Récapitulatif du panier, gestion des quantités et aperçu du montant total.

### Dossiers et fichiers statiques
- **`static/css/main.css`** : Feuille de style principale assurant la mise en forme générale du site.
- **`static/data/products.json`** : Catalogue des produits (identifiants, noms, descriptions, prix, images, etc.)
- **`static/data/promos.json`** : Liste des promotions en cours (codes promo, produits concernés et dates de validité).
- **`static/data/reductions.json`** : Liste des réductions en cours (remise imédiate, cumulative ou non au promotions).
- **`static/js/auth.js`** : Gestion de l'authentification (création de compte, connexion, validation des formulaires).
- **`static/js/cart.js`** : Traitement du panier (application des réductions et des codes promos, recalcul du total).
- **`static/js/index.js`** : Interaction sur la page d'accueil (affiche les produits, ajoute au panier et aux favoris).
- **`static/js/main.js`** : Fonction commune au site (chargement des données, des promos, de la déconnexion, etc).
- **`static/img/favicon.png`** : Icône du site affichée dans l'onglet du navigateur.
