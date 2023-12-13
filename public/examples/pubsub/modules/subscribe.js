import castEvent from "./cast-event.js"
import eventListener from "./event-listener.js"
import subscriptions from "./subscriptions.js"

export default function (eventType, id, callback) {
	const type = castEvent(eventType)

	subscriptions[type] ??= {}

	if (!subscriptions[type].length) {
		document.body.addEventListener(type, eventListener)
	}

	subscriptions[type][id] = callback

	console.log("Subscribed to", type, "on id", id)
}
