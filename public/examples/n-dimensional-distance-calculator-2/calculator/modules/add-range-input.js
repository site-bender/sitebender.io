export default function (id, axis) {
	const label = document.createElement("LABEL")
	const input = document.createElement("INPUT")

	input.setAttribute("id", id)
	input.setAttribute("type", "range")
	input.setAttribute("min", axis.min)
	input.setAttribute("max", axis.max)
	input.setAttribute("step", axis.step)

	const value = parseInt(axis.value, 10)

	if (value >= parseInt(axis.min) && value <= parseInt(axis.max)) {
		input.setAttribute("value", axis.value)
	}

	const output = document.createElement("OUTPUT")

	output.setAttribute("for", id)
	output.innerText = input.value

	label.appendChild(document.createTextNode(axis.label))
	label.appendChild(input)
	label.appendChild(output)

	label.addEventListener("input", () => (output.innerText = input.value))

	return label
}
