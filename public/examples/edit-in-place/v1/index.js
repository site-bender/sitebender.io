function getColumnTypes(table) {
	// Get the columns
	const columns = table?.querySelectorAll("colgroup > *") || []

	const types = []

	// Collect the column datatypes into an array
	for (const col of columns) {
		types.push(col.getAttribute("data-type"))
	}

	// Return the array
	return types
}

function castValue(type, value) {
	switch (type) {
		case "integer":
			return parseInt(value, 10)
		case "boolean":
			return value.toLocaleLowerCase() === "yes"
		case "date":
			return new Date(value)
		default:
			return value
	}
}

function wrapWithForm(cell, control) {
	const form = document.createElement("form")

	form.action = "/test"
	form.method = "GET"
	form.id = `form${control.id}`

	const hidden = document.createElement("input")

	hidden.type = "hidden"
	hidden.name = "id"
	hidden.setAttribute("form", form.id)
	hidden.setAttribute("value", cell.id.slice(1, 4))

	control.setAttribute("form", form.id)

	const label = document.createElement("label")

	label.setAttribute("aria-label", control.name)
	label.appendChild(control)
	if (control.type === "checkbox") {
		label.appendChild(document.createTextNode("Yes"))
	}

	const button = document.createElement("button")

	button.innerText = "SAVE"

	form.appendChild(hidden)
	form.appendChild(label)
	form.appendChild(button)

	return form
}

const createInput = {
	string: (cell, value) => {
		const input = document.createElement("input")

		console.log("string input", cell.id.slice(1, 4), value)

		input.name = cell.id.slice(5)
		input.type = "text"
		input.setAttribute("value", value)
		input.defaultValue = value

		return wrapWithForm(cell, input)
	},
	integer: (cell, value) => {
		const input = document.createElement("input")

		input.name = cell.id.slice(5)
		input.type = "number"
		input.setAttribute("step", "1")
		input.setAttribute("value", value)
		input.defaultValue = value

		return wrapWithForm(cell, input)
	},
	boolean: (cell, value) => {
		const input = document.createElement("input")

		input.name = cell.id.slice(5)
		input.type = "checkbox"
		input.setAttribute("value", "Yes")
		input.defaultValue = value

		if (value) {
			input.setAttribute("checked", "checked")
		}

		return wrapWithForm(cell, input)
	},
	date: (cell, value) => {
		const input = document.createElement("input")

		input.name = cell.id.slice(5)
		input.type = "date"
		input.setAttribute("value", value?.toISOString().slice(0, 10))
		input.defaultValue = value

		return wrapWithForm(cell, input)
	},
}

function swapInput(cell, type = "string") {
	const content = cell.firstChild

	if (content) {
		const value =
			content.tagName === "TIME"
				? content.getAttribute("datetime")
				: content.innerText

		if (content.tagName !== "FORM") {
			cell.firstChild.replaceWith(
				createInput[type](cell, castValue(type, value)),
			)
		}
	}
}

function swapTextArea(cell) {
	console.log("hello", cell)
	const content = cell.children

	if (content) {
		const value = [...content].map(child => child.innerText).join("\n\n")
		console.log("value", value)

		if (cell.firstChild.tagName !== "FORM") {
			const textarea = document.createElement("textarea")

			textarea.name = cell.id.slice(5)
			textarea.innerHTML = value
			textarea.defaultValue = value

			while (cell.firstChild) {
				cell.removeChild(cell.firstChild)
			}

			cell.appendChild(wrapWithForm(cell, textarea))
		}
	}
}

function makeHandleClick(types) {
	return event => {
		const target = event.target
		const cell = target?.closest("td") || target?.closest("th")

		if (cell) {
			const type = types[cell.cellIndex]

			type === "text" ? swapTextArea(cell) : swapInput(cell, type)
		}
	}
}

function makeTableEditable(table) {
	// Get the datatypes of the columns
	const types = getColumnTypes(table)

	// Add the click handler to the table
	table.addEventListener("click", makeHandleClick(types))

	// Handle the submit of a form
	table.addEventListener("submit", event => {
		event.preventDefault()

		if (event.target?.tagName === "FORM") {
			const data = new FormData(event.target)

			const request = new XMLHttpRequest()

			request.open("POST", "/")
			request.send(data)

			console.log(
				event.target
					.querySelectorAll("input:not([type=hidden]), textarea")
					.item(0).defaultValue,
			)

			console.log("Submit form", [...data.values()])
		}
	})
}

function makeTablesEditable() {
	// Get the editable tables
	const tables = document.querySelectorAll("[data-edit-in-place]")

	// Make each table editable
	for (const table of tables) {
		makeTableEditable(table)
	}
}

globalThis.addEventListener("DOMContentLoaded", makeTablesEditable)
