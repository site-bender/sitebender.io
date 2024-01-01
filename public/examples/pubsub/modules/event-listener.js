import subscriptions from "./subscriptions.js"

export default function (event) {
	const id = event.target?.id

	id && subscriptions?.[event.type]?.[id]?.(event)
}
