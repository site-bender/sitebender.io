import castValue from "./cast-value.js"
import getValue from "./get-value.js"
import parseAttributes from "./parse-attributes.js"
import toggleCell from "./toggle-cell.js"

export default function (table) {
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
