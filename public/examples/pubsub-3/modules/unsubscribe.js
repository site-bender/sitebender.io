import handlers from "./handlers.js"
import subscriptions from "./subscriptions.js"

export default function (type, key) {
	console.log("Calling unsubscribe with", type, key)

	subscriptions[type] ??= []

	delete subscriptions[type][key]

	if (Object.keys(subscriptions[type]) < 1) {
		delete subscriptions[type]
		document.body.removeEventListener(type, handlers[type], true)
		delete handlers[type]
	}
}
