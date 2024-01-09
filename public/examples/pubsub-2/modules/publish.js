export default function (topic, detail = {}) {
	const customEvent = new CustomEvent(topic, {
		bubbles: false,
		detail,
	})

	document.body.dispatchEvent(customEvent)
}
