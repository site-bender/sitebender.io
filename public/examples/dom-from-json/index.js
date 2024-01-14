import formJson from "./modules/form-json.js"
import jsToDom from "./modules/js-to-dom.js"
import outJs from "./modules/out-js.js"

export async function injectForm() {
	const main = document.querySelector("main")

	main.appendChild(await jsToDom(outJs))

	main.appendChild(await jsToDom(formJson))
}

globalThis.addEventListener("DOMContentLoaded", injectForm)
