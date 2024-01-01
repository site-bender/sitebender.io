import subscriptions from "./subscriptions.js"

export default function (topic, token) {
	delete subscriptions?.[topic]?.[token]

	if (Object.keys(subscriptions[topic]) < 1) {
		delete subscriptions[topic]
	}
}
