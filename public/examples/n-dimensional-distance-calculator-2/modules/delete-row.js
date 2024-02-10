export default function (event) {
	const fs = event.target.closest("fieldset")

	if (fs.parentNode.children.length > 1) {
		fs.remove()
	}
}
