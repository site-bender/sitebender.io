import castEvent from "./cast-event.js"
import subscriptions from "./subscriptions.js"

export default function (eventType, id) {
	const type = castEvent(eventType)

	delete subscriptions?.[type]?.[id]

	if (!Object.keys(subscriptions[type] || {}).length) {
		delete subscriptions[type]
	}
}
