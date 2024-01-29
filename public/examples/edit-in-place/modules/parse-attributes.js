export default function (attrs) {
	return Array.from({ length: attrs.length })
		.fill("")
		.reduce((out, _, idx) => {
			const name = attrs[idx].name
			const value = attrs[idx].value

			switch (name) {
				case "form":
					out.formId = value
					break
				case "max":
				case "min":
				case "step":
					out[name] = parseInt(value, 10)
					break
				default:
					out[name] = value
			}

			return out
		}, {})
}
