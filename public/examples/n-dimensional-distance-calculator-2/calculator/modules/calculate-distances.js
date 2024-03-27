export default function (event) {
	const e = document.querySelector("#non-linear").checked ? 4 : 2
	const form = document.querySelector("form#n-dimensional-calculator")
	const maxOutput = form.querySelector("#max-distance")
	const bestFit = document.querySelector("#best-fit")
	const candidates = form.querySelectorAll("#candidates fieldset")
	const baseline = Array.from(form.querySelectorAll("#baseline input")).map(
		input => [
			parseInt(input.max, 10),
			parseInt(input.min, 10),
			parseInt(input.value, 10),
		],
	)

	const maxDistance = Math.sqrt(
		baseline.reduce((sum, base) => {
			const distance = Math.max(base[2] - base[1], base[0] - base[2])

			return sum + Math.pow(distance, e)
		}, 0),
	)

	maxOutput.innerText = `Max distance: ${maxDistance.toFixed(2)}`

	const scores = {}

	candidates.forEach(fieldset => {
		const rangers = fieldset.querySelectorAll("input")
		const output = fieldset.querySelector("output.distance")
		const name = fieldset.querySelector("legend").innerText

		const distance = Math.sqrt(
			baseline.reduce((sum, base, index) => {
				return sum + Math.pow(base[2] - rangers[index].value, e)
			}, 0),
		)

		const pct = Math.round((1 - distance / maxDistance) * 100)

		scores[name] = pct

		output.innerHTML = `<div>Distance: ${distance.toFixed(2)}</div><div>Score: ${pct}%</div>`
	})

	const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
	const bestScore = sorted?.[0]?.[1]
	const winners = sorted.filter(candidate => candidate[1] === bestScore)

	bestFit.innerText = `Best fit: ${winners.map(winner => winner[0]).join(", ")}`
}
