import deleteRow from "./delete-row.js"

export default function (parent) {
	return function () {
		const row = parent.firstElementChild.cloneNode(true)
		const del = row.querySelector(".del")

		del.addEventListener("click", deleteRow)

		parent.appendChild(row)
	}
}
