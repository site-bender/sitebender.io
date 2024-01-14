export default {
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
				name: "json",
			},
			children: [
				'{\n  "tagName": "DIV",\n  "attributes": {\n    "class": "sb-test",\n    "data-type": "string",\n    "id": "sb-test-id"\n  },\n  "events": {\n    "click": "log"\n  },\n  "children": [\n    {\n      "tagName": "STRONG",\n      "children": [\n        "Bob\'s yer uncle."\n      ]\n    }\n  ]\n}',
			],
		},
		{
			tagName: "BUTTON",
			attributes: {
				"aria-label": "Run this baby",
				type: "submit",
			},
			children: ["Run"],
		},
	],
}
