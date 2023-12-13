function makeTablesEditable() {
	// Get the editable tables
	const tables = document.querySelectorAll("[data-edit-in-place]")

	// Make each table editable
	for (const table of tables) {
		// makeTableEditable(table)
		console.log("table", table)

		const editables = table.querySelectorAll("[contenteditable=true]")

		console.log("editables", editables)

		for (const editable of editables) {
			editable.defaultValue = editable.innerHTML
			editable.addEventListener("input", () => {
				editable.isDirty =
					editable.innerHTML !== editable.defaultValue ? true : false

				console.log(editable, editable.innerHTML)
			})
			editable.addEventListener("blur", (event) => {
				console.log(editable, "blurring")
				console.log(
					editable,
					editable.innerHTML,
					editable.defaultValue,
					editable.isDirty,
				)
			})
		}
	}
}

globalThis.addEventListener("DOMContentLoaded", makeTablesEditable)
