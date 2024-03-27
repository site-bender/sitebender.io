import subscriptions from "./subscriptions.js"

export default function (topic, callback, channel) {
	subscriptions[topic] ??= {}

	if (Object.keys(subscriptions[topic]) < 1) {
		document.body.addEventListener(
			topic,
			event => {
				for (const cb of Object.values(subscriptions[topic])) {
					cb(event)
				}
			},
			true,
		)
	}

	if (channel) {
		const bc = new BroadcastChannel(channel)

		bc.onmessage = event => {
			const { topic: type, detail } = event.data

			if (type === topic) {
				for (const cb of Object.values(subscriptions[topic])) {
					cb({
						type,
						detail,
					})
				}
			}
		}
	}

	const token = crypto.randomUUID()

	subscriptions[topic][token] = callback

	return token
}
