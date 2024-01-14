import log from "./log.js"

export default {
	tagName: "DIV",
	attributes: {
		class: "out",
	},
	events: {
		click: log,
	},
}
