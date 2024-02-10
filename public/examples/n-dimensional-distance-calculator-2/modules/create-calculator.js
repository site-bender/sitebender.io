import makeAddRow from "./make-add-row.js"
import makeCalculator from "./make-calculator.js"

export default function () {
	const form = document.querySelector("#form-generator")

	const axes = form.querySelector("#axes")
	const candidates = form.querySelector("#candidates")

	const addAxisButton = form.querySelector("button#add-axis")
	const addCandidateButton = form.querySelector("button#add-candidate")

	addAxisButton.addEventListener("click", makeAddRow(axes))
	addCandidateButton.addEventListener("click", makeAddRow(candidates))

	form.addEventListener("submit", makeCalculator)
}
