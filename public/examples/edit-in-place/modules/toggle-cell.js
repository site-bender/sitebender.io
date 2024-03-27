import getInput from "./get-input.js"

export default function (cell) {
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

		form.addEventListener("submit", event => {
			event.preventDefault()

			console.log("submit", new FormData(event.target).values())
		})

		cell.innerHTML = null
		cell.appendChild(form)
	}
}
