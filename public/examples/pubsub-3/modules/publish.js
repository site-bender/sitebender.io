export default function (topic, detail, channel) {
	const customEvent = new CustomEvent(topic, {
		bubbles: false,
		detail,
	})

	document.body.dispatchEvent(customEvent)

	if (channel) {
		const bc = new BroadcastChannel(channel)

		bc.postMessage({
			topic,
			detail,
		})
	}
}
