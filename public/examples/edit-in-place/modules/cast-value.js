export default function (type, value) {
	switch (type) {
		case "integer":
			return parseInt(value, 10)
		case "date":
			return new Date(value)
		case "checkbox":
			return Boolean(value)
		default:
			return value
	}
}
