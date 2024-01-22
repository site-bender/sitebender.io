const formatDate = new Intl.DateTimeFormat("en-GB", {
	year: "numeric",
	month: "long",
	day: "numeric",
}).format

function parseAttributes(attrs) {
	return new Array(attrs.length).fill("").reduce((out, _, idx) => {
		const name = attrs[idx].name
		const value = attrs[idx].value

		switch (name) {
			case "form":
				out.formId = value
				break
			case "max":
			case "min":
			case "step":
				out[name] = parseInt(value, 10)
				break
			default:
				out[name] = value
		}

		return out
	}, {})
}

function castValue(type, value) {
	switch (type) {
		case "integer":
			return parseInt(value, 10)
		case "date":
			return new Date(value)
		case "checkbox":
			return Boolean(value)
		default:
			return value
	}
}

function getValue(type, value) {
	switch (type) {
		case "date":
			return `<time datetime="${value.toISOString().slice(0, 10)}">${formatDate(
				value,
			)}</time>`
		case "boolean":
			return value ? "Yes" : "No"
		case "text":
			return value.split("\r\n\r\n")
		default:
			return value
	}
}

function getInput(props) {
	const {
		dataType,
		defaultValue,
		formId,
		rowId,
		tagName,
		type,
		value,
		...attrs
	} = props

	if (tagName === "TEXTAREA") {
		const textarea = document.createElement("textarea")

		textarea.setAttribute("form", formId)
		textarea.innerHTML = value.replaceAll(/\\r\\n\\r\\n/g, "&#13;&#10;")

		for (const key in attrs) {
			textarea.setAttribute(key, attrs[key])
		}

		return textarea
	}

	const input = document.createElement("input")

	input.setAttribute("form", formId)
	input.setAttribute("type", type)
	input.setAttribute(
		"value",
		value instanceof Date ? value.toISOString().slice(0, 10) : value,
	)

	for (const key in attrs) {
		input.setAttribute(key, attrs[key])
	}

	return input
}

function toggleCell(cell) {
	if (cell.firstChild.tagName === "FORM") {
		const [input] = cell.querySelectorAll("input, textarea, select")
	} else {
		const hidden = document.createElement("input")

		hidden.type = "hidden"
		hidden.setAttribute("data-type", "id")
		hidden.setAttribute("form", cell.editable.formId)
		hidden.name = "row-id"
		hidden.setAttribute("value", cell.editable.rowId)

		const label = document.createElement("label")

		label.setAttribute("data-type", cell.editable.dataType)
		label.setAttribute("aria-label", cell.editable.name)

		label.appendChild(getInput(cell.editable))

		if (cell.editable.dataType === "boolean") {
			label.appendChild(document.createTextNode(" Yes"))
		}

		const img = document.createElement("img")

		img.alt = "Save"
		img.height = "32"
		img.src = "/examples/images/save.svg"
		img.width = "32"

		const button = document.createElement("button")

		button.setAttribute("aria-label", "Save to server")
		button.appendChild(img)

		const form = document.createElement("form")

		form.setAttribute("action", "/")
		form.setAttribute("method", "POST")
		form.id = cell.editable.formId

		form.appendChild(hidden)
		form.appendChild(label)
		form.appendChild(button)

		form.addEventListener("submit", (event) => {
			event.preventDefault()

			console.log("submit", new FormData(event.target).values)
		})

		cell.innerHTML = null
		cell.appendChild(form)
	}
}

function enhanceEditableTable(table) {
	const forms = table.querySelectorAll("th > form, td > form")

	for (const form of forms) {
		const cell = form?.closest("td") || form.closest("th")
		const label = form.querySelector("label")
		const [input] = label?.querySelectorAll("input, textarea, select") || []
		const dataType = label.dataset.type
		const attrs = parseAttributes(input.attributes)

		attrs.tagName = input.tagName
		attrs.value = castValue(
			dataType,
			dataType === "boolean"
				? attrs.checked
				: dataType === "text"
					? input.innerHTML
					: attrs.value,
		)

		cell.editable = {
			dataType,
			defaultValue: castValue(dataType, attrs.value),
			rowId: form.querySelector("[name=row-id]").value,
			...attrs,
		}

		const value = getValue(dataType, attrs.value)
		cell.innerHTML = Array.isArray(value)
			? value.map((p) => `<p>${p}</p>`).join("")
			: value
	}

	table.addEventListener("click", (event) => {
		const cell = event.target.closest("td") || event.target.closest("th")

		if (cell) {
			toggleCell(cell)
		}
	})
}

function makeTablesEditable() {
	// Get the editable tables
	const tables = document.querySelectorAll("[data-edit-in-place]")

	// Make each table editable
	for (const table of tables) {
		enhanceEditableTable(table)
	}
}

globalThis.addEventListener("DOMContentLoaded", makeTablesEditable)
