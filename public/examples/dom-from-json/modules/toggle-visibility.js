export default function (event) {
	const button = event.target
	const div = button.closest(".form-field")
	const input = div?.querySelector("input")

	if (input) {
		if (input.type === "password") {
			input.type = "text"
			button.innerText = "hide"
			button.setAttribute("aria-label", "Hide password.")
			return
		}

		input.type = "password"
		button.innerText = "show"
		button.setAttribute("aria-label", "Show password.")
	}
}
