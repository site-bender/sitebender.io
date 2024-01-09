export default function log(event) {
	switch (event.target.tagName) {
		case "BUTTON":
			console.log("On the button")
			break
		case "STRONG":
			console.log(event.target.innerText)
			break
		case "TEXTAREA":
			console.log("type", event.target.getAttribute("data-type"))
			break
		default:
			console.log(event.target)
	}
}
