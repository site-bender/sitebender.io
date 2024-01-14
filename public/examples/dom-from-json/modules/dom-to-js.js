export default function domToJs(dom) {
	const { attributes, childNodes, tagName } = dom

	const eventList = dom.getAttribute("data-events")

	const events = eventList?.split(",").reduce((out, evt) => {
		const [key, value] = evt.split(":")

		if (key) {
			out[key] = value
		}

		return out
	}, {})

	const attrs = Object.values(attributes)
		.map((v) => v.localName)
		.filter((name) => name !== "data-events")

	return {
		tagName,
		attributes: attrs.reduce((out, attr) => {
			out[attr] = dom.getAttribute(attr)

			return out
		}, {}),
		events,
		children: Array.from(childNodes).map((_, idx) => {
			const child = childNodes[idx]

			return child.nodeType === Node.TEXT_NODE
				? child.nodeValue
				: domToJs(child)
		}),
	}
}
