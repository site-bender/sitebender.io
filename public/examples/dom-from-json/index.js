import jsonToDom from "./modules/json-to-dom.js"

export async function enhanceForm() {
	const main = document.querySelector("main")

	main.appendChild(
		await jsonToDom({
			attributes: {
				id: "out",
			},
			tagName: "DIV",
		}),
	)

	main.appendChild(
		await jsonToDom({
			attributes: {
				action: "#",
				name: "form",
				id: "form-id",
				method: "POST",
			},
			children: [
				{
					attributes: {
						"data-type": "json",
						id: "json",
					},
					children: [
						JSON.stringify(
							{
								attributes: {
									class: "sb-test",
									"data-type": "string",
									id: "sb-test-id",
								},
								children: [
									{
										tagName: "STRONG",
										children: ["Bob's yer uncle."],
									},
								],
								events: {
									click: "log",
								},
								tagName: "DIV",
							},
							null,
							2,
						),
					],
					tagName: "TEXTAREA",
				},
				{
					attributes: {
						"aria-label": "Run this baby",
						type: "submit",
					},
					children: ["Run"],
					tagName: "BUTTON",
				},
			],
			events: {
				focusin: "log",
				submit: "parse-submission",
			},
			tagName: "FORM",
		}),
	)
}

globalThis.addEventListener("DOMContentLoaded", enhanceForm)
