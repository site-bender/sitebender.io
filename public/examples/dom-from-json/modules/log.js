export default function log({ target }) {
	console.log(target?.tagName, target?.innerText || target?.value)
}
