import domToJs from "./dom-to-js.js"
import jsToDom from "./js-to-dom.js"

export default async function (event) {
	event.preventDefault()

	const form = event.target
	const textarea = form.querySelector("textarea")
	const out = document.querySelector(".out")

	const js = JSON.parse(textarea.value)

	out.appendChild(await jsToDom(js))

	const newForm = domToJs(form)

	document.querySelector("main").appendChild(await jsToDom(newForm))
}
