// Fonction utilitaire qui retourne la data des jeu de donnée.
export async function importData(filename) {
	let path = "static/data/" + filename

	const r = await fetch(path);
	if (r.ok) return await r.json()
	throw new Error(`fail to fetch ${path}`)
}
