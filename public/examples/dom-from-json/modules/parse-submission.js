import domToJson from "./dom-to-json.js"
import jsonToDom from "./json-to-dom.js"

export default async function (event) {
	event.preventDefault()

	const form = event.target
	const textarea = form.querySelector("textarea")
	const out = document.querySelector("#out")

	const json = JSON.parse(textarea.value)

	out.appendChild(await jsonToDom(json))

	const newForm = domToJson(form)

	document.querySelector("main").appendChild(await jsonToDom(newForm))
}
