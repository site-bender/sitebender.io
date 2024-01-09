import subscriptions from "./subscriptions.js"

export default function (topic, callback) {
	subscriptions[topic] ??= {}

	if (Object.keys(subscriptions[topic]) < 1) {
		document.body.addEventListener(
			topic,
			(event) => {
				for (const cb of Object.values(subscriptions[topic])) {
					cb(event)
				}
			},
			true,
		)
	}

	const token = crypto.randomUUID()

	subscriptions[topic][token] = callback

	return token
}
