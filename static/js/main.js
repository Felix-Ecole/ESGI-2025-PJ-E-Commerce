// Fonction utilitaire qui retourne la data des jeu de donnée.
export async function importData(filename) {
	let path = "static/data/" + filename

	const r = await fetch(path);
	if (r.ok) return await r.json()
	throw new Error(`fail to fetch ${path}`)
}

// Fonction utilitaire qui hash le mot de passe selon une date.
export async function hashPass(password, timeStamp) {
	let npass = Number(password.split("").map((x) => `${x.charCodeAt()}`).join(""))
	return `${(npass * timeStamp) % 1000000000}`
}

// Fonction qui déconnecte l'utilisateur.
export function logout() {
	localStorage.removeItem("connectedUser");
}

// Fonction qui met une couleur sur les boutons de card d'item favorise
export function toggle() {
	const listFavItem = JSON.parse(localStorage.getItem('favItem')) || [];
	if(listFavItem){
		listFavItem.forEach(FavItem => {
			const card = document.getElementById('card-' + FavItem);
			card.querySelectorAll('button')[1].classList.add('red');
		});
	}
}