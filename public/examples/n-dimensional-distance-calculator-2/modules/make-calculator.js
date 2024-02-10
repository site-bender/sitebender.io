export default function (event) {
	event.preventDefault()

	const form = event.target
	const axes = form.querySelectorAll("#axes fieldset")
	const candidates = form.querySelectorAll("#candidates fieldset")

	const config = {
		axes: [],
		candidates: [],
	}

	form.querySelectorAll("#axes fieldset").forEach((axis) => {
		const inputs = Array.from(axis.querySelectorAll("input"))

		config.axes.push({
			label: inputs[0].value,
			min: inputs[1].value,
			max: inputs[2].value,
			step: inputs[3].value,
			value: inputs[4].value,
		})
	})

	form.querySelectorAll("#candidates fieldset").forEach((candidate) => {
		const inputs = Array.from(candidate.querySelectorAll("input"))

		config.candidates.push(inputs[0].value)
	})

	const uri = `./calculator/index.html?data=${encodeURI(JSON.stringify(config))}`

	globalThis.location.href = uri
}
