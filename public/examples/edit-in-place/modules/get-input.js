export default function (props) {
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
