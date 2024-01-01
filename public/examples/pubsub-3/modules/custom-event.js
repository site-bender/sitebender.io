export default function (event) {
	console.log("click baby!")
	const customEvent = new CustomEvent(
		"DO_IT",
		{
			bubbles: false,
			detail: {
				name: "Bob ",
				age: 7,
				surname: " Dobbs"
			}
		}
	)

	document.body.dispatchEvent(customEvent)
}
