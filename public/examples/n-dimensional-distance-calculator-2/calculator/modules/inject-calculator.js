import addRangeInput from "./add-range-input.js"
import calculateDistances from "./calculate-distances.js"
import makeCandidates from "./make-candidates.js"
import removeAll from "./remove-all.js"

export default function (config) {
	const form = document.querySelector("form#n-dimensional-calculator")
	const nonLinear = document.querySelector("#non-linear")
	const base = form.querySelector("#baseline .range-inputs")
	const candidates = form.querySelector("#candidates")

	removeAll(base)
	removeAll(candidates)

	const tests = makeCandidates(config, candidates)

	config.axes.forEach((axis, index) => {
		base.appendChild(addRangeInput(`base-${index}`, axis))

		tests.forEach((div, idx) => {
			div.appendChild(addRangeInput(`cdt-${idx}-base-${index}`, axis))
		})
	})

	form.addEventListener("input", calculateDistances)
	nonLinear.addEventListener("input", calculateDistances)
}
