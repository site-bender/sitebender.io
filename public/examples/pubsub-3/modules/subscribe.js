import handlers from "./handlers.js"
import subscriptions from "./subscriptions.js"

export default function (type, callback) {
	subscriptions[type] ??= {}

	const key = crypto.randomUUID()

	if (Object.keys(subscriptions[type]) < 1) {
		handlers[type] = (event) => {
			for (const cb of Object.values(subscriptions[type] || {})) {
				cb(event)
			}
		}

		document.body.addEventListener(type, handlers[type], true)
	}

	subscriptions[type][key] = callback

	return key
}
