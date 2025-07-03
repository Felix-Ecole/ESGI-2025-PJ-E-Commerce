import { logout, importData } from "./main.js"

window["logout"] = logout

function createTdElement(data) {
	const td = document.createElement("td");
	td.append(typeof data === "string" ? document.createTextNode(data) : data);
	return td;
}

class CartProduct {
	constructor(product, quantity, reduction, pID, cartItem) {
		this.product = product;
		this.quantity = quantity;
		this.reduction = reduction;
		this.pID = pID;
		this.cartItem = cartItem;
	}

	getReducedPrice() {
		if (!this.reduction) return this.product.price * this.quantity;
		return this.reduction.type === "%"
			? this.product.price * (1 - this.reduction.value / 100) * this.quantity
			: (this.product.price - this.reduction.value) * this.quantity;
	}

	createTrElement() {
		const tr = document.createElement("tr");
		tr.append(createTdElement(this.product.name));
		tr.append(createTdElement(this.product.price + " €"));

		const inputQty = Object.assign(document.createElement("input"), {
			type: "number",
			value: this.quantity,
			min: 1,
			onchange: () => {
				this.cartItem[this.pID] = parseInt(inputQty.value);
				localStorage.setItem("cartItem", JSON.stringify(this.cartItem));
				location.reload();
			}
		});
		tr.append(createTdElement(inputQty));

		if (this.reduction) {
			tr.append(createTdElement(`${this.reduction.value} ${this.reduction.type}`));
			tr.append(createTdElement(this.getReducedPrice().toFixed(2) + " €"));
		} else {
			tr.append(createTdElement("0 €"));
			tr.append(createTdElement((this.product.price * this.quantity).toFixed(2) + " €"));
		}

		const removeBtn = Object.assign(document.createElement("button"), {
			innerText: "Retirer",
			onclick: () => {
				delete this.cartItem[this.pID];
				localStorage.setItem("cartItem", JSON.stringify(this.cartItem));
				location.reload();
			}
		});
		tr.append(createTdElement(removeBtn));

		return tr;
	}
}

window.onload = async () => {
	const cartItem = JSON.parse(localStorage.getItem("cartItem"));
	const tbody = document.querySelector("#cartTable tbody");
	const totalPriceEl = document.querySelector("#totalPrice");

	if (cartItem && Object.keys(cartItem).length > 0) {
		const [products, reductions] = await Promise.all([
			importData("products.json"),
			importData("reductions.json")
		]);

		let total = 0;
		for (const pID in cartItem) {
			const product = products[pID];
			const reduction = reductions[pID] || reductions[product.category] || null;
			const cartProduct = new CartProduct(product, cartItem[pID], reduction, pID, cartItem);
			tbody.append(cartProduct.createTrElement());
			total += cartProduct.getReducedPrice();
		}

		const promoCode = localStorage.getItem("appliedPromo");
		const promos = await importData("promos.json");

		totalPriceEl.innerText = (() => {
			if (promoCode) {
				return promos[promoCode].type === "%"
					? total * (1 - promos[promoCode].value / 100)
					: (total - promos[promoCode].value)
			} else {
				return total
			}
		})().toFixed(2) + " €";
	} else {
		tbody.innerHTML = '<tr><td colspan="6">Votre panier est vide.</td></tr>';
		totalPriceEl.innerText = "0 €";
	}
};


document.querySelector("#promo").onsubmit = async (e) => {
	e.preventDefault();

	const code = document.querySelector("#promoInput").value.trim();
	const promos = await importData("promos.json");

	if (promos[code]) {
		localStorage.setItem("appliedPromo", code);
		alert("Code promo appliqué : " + code);
		location.reload();
	} else {
		alert("Code promo invalide.");
	}
};

document.querySelector("#validate").onsubmit = (e) => {
	e.preventDefault();

	alert("Panier validé ! Merci pour votre commande.");
	localStorage.removeItem("cartItem");
	localStorage.removeItem("appliedPromo");
	location.reload();
};

if (!localStorage.getItem("connectedUser")) document.location = 'index.html';
