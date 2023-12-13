import subscriptions from "./subscriptions.js"

export default function (event) {
	const id = event.target?.id

	event.target && subscriptions?.[event.type]?.[id]?.(event)
}
