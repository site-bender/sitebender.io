import formatDate from "./format-date.js"

export default function (type, value) {
	switch (type) {
		case "date":
			return `<time datetime="${value.toISOString().slice(0, 10)}">${formatDate(
				value,
			)}</time>`
		case "boolean":
			return value ? "Yes" : "No"
		case "text":
			return value.split("\r\n\r\n")
		default:
			return value
	}
}
