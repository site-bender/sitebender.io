export default function domToJson(dom) {
	const { attributes, childNodes, tagName } = dom

	const eventList = dom.getAttribute("data-events")

	const events = eventList?.split(",").reduce((out, evt) => {
		const [key, value] = evt.split(":")

		if (key) {
			out[key] = value
		}

		return out
	}, {})

	const attrs = Object.entries(attributes)
		.map(([_, k]) => k.localName)
		.filter((name) => name !== "data-events")

	return {
		attributes: attrs.reduce((out, attr) => {
			out[attr] = dom.getAttribute(attr)

			return out
		}, {}),
		children: new Array(childNodes.length).fill("").map((_, idx) => {
			const child = childNodes[idx]

			return child.nodeType === Node.TEXT_NODE
				? child.nodeValue
				: domToJson(child)
		}),
		events,
		tagName,
	}
}
