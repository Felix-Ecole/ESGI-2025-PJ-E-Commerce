import { importData, logout } from "./main.js"

window["logout"] = logout


class HTMLCard {
	constructor() {
		Promise.all(
			[importData("products.json"), importData("reductions.json")]
		).then(
			([products, reductions]) => {
				Object.entries(products).forEach(([id, product]) => {
					let card = this.createCard(id, product, reductions)
					document.getElementById("productList").appendChild(card)
				})
			})
			.catch(e => console.error("Product initialisation failed:", e))
	}

	// Fonction qui retourne une réduction qui a été appliqué à un produit.
	applyReduction(pID, p, r) {
		let [direct, category] = [r[pID], r[p.category]]
		let [iPrice, fPrice] = [p.price, p.price]

		if (direct) {
			if (direct.type === "%") { fPrice -= iPrice * (direct.value / 100) }
			else if (direct.type === "€") { fPrice -= direct.value }
		}

		else if (category && category.promotable) {
			if (category.type === "%") { fPrice -= iPrice * (category.value / 100) }
			else if (category.type === "€") { fPrice -= category.value }
		}

		return Math.max(0, fPrice.toFixed(2))
	}

	// Fonction qui retourne une section HTML correspondant à un produit.
	createCard(id, product, reductions) {
		let finalPrice = this.applyReduction(id, product, reductions)
		let hasReduction = finalPrice < product.price

		let element = document.createElement("article")
		element.className = "card"

		let title = document.createElement("h2")
		title.textContent = product.name

		let desc = document.createElement("p")
		desc.textContent = product.description

		const price = document.createElement("p")
		price.innerHTML = hasReduction
			? `<s>${product.price.toFixed(2)}€</s> <strong>${finalPrice}€</strong>`
			: `<strong>${product.price.toFixed(2)}€</strong>`

		let addCart = document.createElement("button")
		addCart.textContent = "🛒"

		let addFav = document.createElement("button")
		addFav.textContent = "♥"; addFav.style.color = "red"

		let buttonDiv = document.createElement("div")

		// Ajoute les boutons à leur conteneur.
		buttonDiv.appendChild(addCart)
		buttonDiv.appendChild(addFav)

		// Ajoute les éléments à la card.
		element.appendChild(title)
		element.appendChild(desc)
		element.appendChild(price)
		element.appendChild(buttonDiv)

		return element
	}
}

// Si l'utilisateur est connecter, alors, affiche en conséquence les messages.
if (localStorage.getItem("connectedUser")) {
	document.querySelector("#unlogged").style.display = "none"
	document.querySelector(".warning").style.display = "none"
	document.querySelector("#logged").style.display = ""
}

// Lance la récupération des produits et
// de leur promotions une fois la page charger.
window.onload = (new HTMLCard)
