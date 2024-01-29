import injectCalculator from "./modules/inject-calculator.js"

globalThis.addEventListener("DOMContentLoaded", () => {
	const params = new URLSearchParams(globalThis.location.search)
	const data = Object.fromEntries(params).data

	if (data) {
		const config = JSON.parse(data)

		injectCalculator(config)
	}
})
