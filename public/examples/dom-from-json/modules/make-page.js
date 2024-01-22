import jsToDom from "./js-to-dom.js"

const headJson = {
	tagName: "HEAD",
	attributes: {},
	children: [
		"\n    ",
		{
			tagName: "META",
			attributes: {
				charset: "UTF-8",
			},
			children: [],
		},
		"\n    ",
		{
			tagName: "META",
			attributes: {
				name: "description",
				content: "Astro description",
			},
			children: [],
		},
		"\n    ",
		{
			tagName: "META",
			attributes: {
				name: "viewport",
				content: "width=device-width",
			},
			children: [],
		},
		"\n    ",
		{
			tagName: "LINK",
			attributes: {
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg",
				sizes: "any",
			},
			children: [],
		},
		"\n    ",
		{
			tagName: "TITLE",
			attributes: {},
			children: ["DOM from JSON (and back)"],
		},
		"\n    ",
		{
			tagName: "STYLE",
			attributes: {},
			children: [
				"\n      body {\n        display: flex;\n        flex-direction: column;\n        font-family: sans-serif;\n        font-size: clamp(1rem, 0.822rem + 0.678vw, 1.5rem);\n        margin: 0;\n        padding: 0;\n        min-height: 100vh;\n      }\n\n      header {\n        align-content: start;\n        background-color: darkslategray;\n        color: ghostwhite;\n        display: grid;\n        padding: 1rem;\n      }\n\n      header h1 {\n        font-family: sans-serif;\n        font-size: 2.4rem;\n        font-weight: 400;\n      }\n\n      footer,\n      main {\n        align-items: center;\n        display: flex;\n        flex: 1;\n        flex-direction: column;\n        gap: 2rem;\n        justify-content: flex-start;\n        padding-block: 3rem;\n      }\n\n      footer {\n        margin: auto;\n        max-width: min(90vw, 64rem);\n      }\n\n      form {\n        align-items: flex-start;\n        display: flex;\n        flex-direction: column;\n        gap: 1rem;\n        justify-content: center;\n      }\n\n      textarea {\n        border-radius: 12px;\n        font-family: monospace;\n        font-size: 1.2rem;\n        height: 28rem;\n        padding: 0.5rem;\n        width: 64rem;\n      }\n\n      button {\n        background-color: ghostwhite;\n        border: 2px solid darkslateblue;\n        border-radius: 5px;\n        color: darkslateblue;\n        display: block;\n        font-family: sans-serif;\n        font-size: 1.25rem;\n        font-weight: 500;\n        padding: 0.5rem 1rem;\n        place-content: center;\n        text-transform: uppercase;\n      }\n\n      .form-field {\n        align-items: stretch;\n        display: flex;\n        gap: 0;\n        justify-content:space-between;\n        margin-block: 1rem;\n        width: min(90vw, 32rem);\n      }\n\n      .form-field input {\n        border: 2px solid darkslateblue;\n        border-top-left-radius : 5px;\n        border-bottom-left-radius : 5px;\n        font-size: 1.2rem;\n        padding-inline: 0.5rem;\n        width: 100%;\n      }\n\n      .form-field button {\n        border-top-left-radius : 0;\n        border-bottom-left-radius : 0;\n        margin-inline-start: -2px;\n      }\n\n      code > pre {\n        background-color: #eee;\n        font-size: 1.1rem;\n        padding: 1rem;\n      }\n\n      .out {\n        background-color: #eee;\n        border-radius: 5px;\n        min-height: 3rem;\n        min-width: 32rem;\n        padding: 0.5rem;\n      }\n    ",
			],
		},
		"\n  ",
	],
}

const bodyJson = {
	tagName: "BODY",
	attributes: {},
	children: [
		"\n    ",
		{
			tagName: "HEADER",
			attributes: {},
			children: [
				"\n      ",
				{
					tagName: "H1",
					attributes: {},
					children: ["DOM from JSON (and back)"],
				},
				"\n      ",
				{
					tagName: "P",
					attributes: {},
					children: [
						"Have fun modifying the JSON to generate your own DOM elements.",
					],
				},
				"\n    ",
			],
		},
		"\n    ",
		{
			tagName: "MAIN",
			attributes: {},
			children: [
				"\n    ",
				{
					tagName: "DIV",
					attributes: {
						class: "out",
					},
					children: [],
				},
				{
					tagName: "FORM",
					attributes: {
						action: "#",
						method: "POST",
						name: "form",
					},
					events: {
						focusin: "log",
						submit: "parse-submission",
					},
					children: [
						{
							tagName: "TEXTAREA",
							attributes: {
								"data-type": "json",
								"name": "json",
							},
							children: [
								'{\n  "tagName": "DIV",\n  "attributes": {\n    "class": "sb-test",\n    "data-type": "string",\n    "id": "sb-test-id"\n  },\n  "events": {\n    "click": "log"\n  },\n  "children": [\n    {\n      "tagName": "STRONG",\n      "children": [\n        "Bob\'s yer uncle."\n      ]\n    }\n  ]\n}',
							],
						},
						{
							tagName: "BUTTON",
							attributes: {
								"aria-label": "Run this baby",
								"type": "submit",
							},
							children: ["Run"],
						},
					],
				},
			],
		},
		"\n    ",
		{
			tagName: "FOOTER",
			attributes: {},
			children: [
				"\n      ",
				{
					tagName: "P",
					attributes: {},
					children: [
						"The above form was generated on-the-fly and injected into the\n        ",
						{
							tagName: "CODE",
							attributes: {},
							children: ["main"],
						},
						" element using the following JSON:\n      ",
					],
				},
				"\n      ",
				{
					tagName: "CODE",
					attributes: {},
					children: [
						{
							tagName: "PRE",
							attributes: {},
							children: [
								'{\n  "tagName": "FORM",\n  "attributes": {\n    "action": "#",\n    "name": "form",\n    "method": "POST"\n  },\n  "events": {\n    "focusin": "log",\n    "submit": "parse-submission"\n  },\n  "children": [\n    {\n      "tagName": "TEXTAREA",\n      "attributes": {\n        "data-type": "json",\n        "name": "json"\n      },\n      "children": ["see below"]\n    },\n    {\n      "tagName": "BUTTON",\n      "attributes": {\n        "aria-label": "Run this baby",\n        "type": "submit"\n      },\n      "children": [\n        "Run"\n      ]\n    }\n  ]\n}',
							],
						},
					],
				},
				"\n\t\t\t",
				{
					tagName: "P",
					attributes: {},
					children: [
						'\n\t\t\t\tIf you want to prefill the textarea as above, use JSON.stringify on the code below and replace "see below" with the resulting string.\n\t\t\t',
					],
				},
				"\n\t\t\t",
				{
					tagName: "CODE",
					attributes: {},
					children: [
						{
							tagName: "PRE",
							attributes: {},
							children: [
								'{\n  "tagName": "DIV",\n  "attributes": {\n    "class": "sb-test",\n    "data-type": "string",\n    "id": "sb-test-id"\n  },\n  "events": {\n    "click": "log"\n  },\n  "children": [\n    {\n      "tagName": "STRONG",\n      "children": [\n        "Bob\'s yer uncle."\n      ]\n    }\n  ]\n}',
							],
						},
					],
				},
				"\n      ",
				{
					tagName: "P",
					attributes: {},
					children: [
						"\n        You can try the following example. Note that the ",
						{
							tagName: "CODE",
							attributes: {},
							children: ["toggleVisibility"],
						},
						"\n        function is already a ",
						{
							tagName: "A",
							attributes: {
								href: "./modules/toggle-visibility.js",
							},
							children: ["available module."],
						},
						"\n        If you want to try something else, use the ",
						{
							tagName: "CODE",
							attributes: {},
							children: ["log"],
						},
						" module, e.g.,\n        ",
						{
							tagName: "CODE",
							attributes: {},
							children: ['"events": { "click": "log" }'],
						},
						". Don't forget to escape the quotation marks (\\\").\n      ",
					],
				},
				"\n      ",
				{
					tagName: "CODE",
					attributes: {},
					children: [
						{
							tagName: "PRE",
							attributes: {},
							children: [
								'{\n  "tagName": "DIV",\n  "attributes": {\n    "class": "form-field"\n  },\n  "events": {\n    "click": "log"\n  },\n  "children": [\n    {\n      "tagName": "INPUT",\n      "attributes": {\n        "type": "password"\n      }\n    },\n    {\n      "tagName": "BUTTON",\n      "attributes": {\n        "aria-label": "Show password.",\n        "class": "xx-toggle-password",\n        "type": "button"\n      },\n      "events": {\n        "click": "toggle-visibility"\n      },\n      "children": ["show"]\n    }\n  ]\n}',
							],
						},
					],
				},
				"\n    ",
			],
		},
		"\n    ",
		{
			tagName: "SCRIPT",
			attributes: {
				src: "./index.js",
				type: "module",
			},
			children: [],
		},
		"\n  \n\n",
	],
}

globalThis.addEventListener("DOMContentLoaded", async () => {
	const h = document.querySelector("head")
	const b = document.querySelector("body")

	h.replaceWith(await jsToDom(headJson))

	b.replaceWith(await jsToDom(bodyJson))
})
