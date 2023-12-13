import enhanceTable from "./enhance-table.js"

export default function () {
	// Get the editable tables
	const tables = document.querySelectorAll("[data-edit-in-place]")

	// Make each table editable
	for (const table of tables) {
		enhanceTable(table)
	}

	document.querySelector("tbody")?.classList.remove("hide-body")
}
