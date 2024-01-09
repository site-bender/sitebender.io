export default async function jsonToDom(json) {
	const { attributes, children, events, tagName } = json

	const elem = document.createElement(tagName)

	for (const attr in attributes) {
		elem.setAttribute(attr, attributes[attr])
	}

	if (Array.isArray(children)) {
		for (const child of children) {
			typeof child === "object"
				? elem.appendChild(await jsonToDom(child))
				: elem.appendChild(document.createTextNode(child))
		}
	}

	if (events) {
		for (const key in events) {
			const handler = events[key]
				? await import(`./${events[key]}.js`)
				: undefined

			handler && elem.addEventListener(key, handler.default)
		}

		elem.setAttribute("data-events", stringifyEvents(json.events))
	}

	return elem
}

function stringifyEvents(obj = {}) {
	return Object.keys(obj)
		.reduce((out, key) => {
			out.push(`${key}:${obj[key]}`)

			return out
		}, [])
		.join(",")
}
