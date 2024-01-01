export function jsonToDom(json) {
	const { attributes, children, tagName } = json

	const elem = document.createElement(tagName)

	for (const attr in attributes) {
		elem.setAttribute(attr, attributes[attr])
	}

	if (Array.isArray(children)) {
		for (const child of children) {
			typeof child === "object"
				? elem.appendChild(jsonToDom(child))
				: elem.appendChild(document.createTextNode(child))
		}
	}

	return elem
}

export function domToJson(dom) {
	const { attributes, childNodes, tagName } = dom

	const attrs = Object.entries(attributes).map(([_, k]) => k.localName)

	console.log("dom", Object.entries(dom))

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
		tagName,
	}
}

export function enhanceForm() {
	const form = document.querySelector("form")
	const textarea = document.querySelector("textarea")
	const out = document.querySelector("#out")

	form.addEventListener("submit", (event) => {
		event.preventDefault()

		const json = JSON.parse(textarea.value)

		out.appendChild(jsonToDom(json))

		const form = document.querySelector("form")

		const newForm = domToJson(form)

		console.log(JSON.stringify(newForm, null, 2))

		document.querySelector("main").appendChild(jsonToDom(newForm))
	})
}

globalThis.addEventListener("DOMContentLoaded", enhanceForm)
