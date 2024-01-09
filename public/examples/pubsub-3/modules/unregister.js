import castEvent from "./cast-event.js"
import listeners from "./listeners.js"

export default function (eventType, id) {
	const type = castEvent(eventType)

	delete listeners?.[type]?.[id]

	if (!Object.keys(listeners[type])?.length) {
		delete listeners[type]
	}
}
