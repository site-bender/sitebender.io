export default function (config, candidates) {
	return config.candidates.map((candidate) => {
		const fs = document.createElement("fieldset")
		const legend = document.createElement("legend")
		const div = document.createElement("div")
		const out = document.createElement("output")

		div.classList.add("range-inputs")
		out.classList.add("distance")
		out.innerText = "Distance: 0"

		legend.innerText = candidate
		fs.appendChild(legend)
		fs.appendChild(div)
		fs.appendChild(out)

		candidates.appendChild(fs)

		return div
	})
}
