export default function (element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild)
	}
}
