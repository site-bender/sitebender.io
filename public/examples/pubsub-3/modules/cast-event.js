export default function (type) {
	if (type === "blur") {
		return "focusout"
	}

	if (type === "focus") {
		return "focusin"
	}

	return type
}
