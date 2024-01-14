export default async function jsToDom(js) {
	const { attributes, children, events, tagName } = js

	const elem = document.createElement(tagName)

	for (const attr in attributes) {
		elem.setAttribute(attr, attributes[attr])
	}

	if (Array.isArray(children)) {
		for (const child of children) {
			typeof child === "object"
				? elem.appendChild(await jsToDom(child))
				: elem.appendChild(document.createTextNode(child))
		}
	}

	if (events) {
		for (const key in events) {
			if (!events[key]) {
				break
			}

			const handler =
				typeof events[key] === "function"
					? events[key]
					: (await import(`./${events[key]}.js`)).default

			handler && elem.addEventListener(key, handler)
		}

		setDataEvents(elem, js.events)
	}

	return elem
}

function setDataEvents(elem, obj = {}) {
	const eventString = Object.keys(obj)
		.reduce((out, key) => {
			if (typeof obj[key] === "string") {
				out.push(`${key}:${obj[key]}`)
			}

			return out
		}, [])
		.join(",")

	if (eventString) {
		elem.setAttribute("data-events", eventString)
	}
}
