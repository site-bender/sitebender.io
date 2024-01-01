import castEvent from "./cast-event.js"
import listeners from "./listeners.js"

export default function (eventType, id, callback) {
	const type = castEvent(eventType)

	listeners[type] ??= {}

	if (!Object.keys(listeners[type]).length) {
		document.body.addEventListener(type, function (event) {
			const id = event.target?.id
			const type = event.type

			event.target && listeners?.[type]?.[id]?.(event)
		})
	}

	listeners[type][id] = callback
}
