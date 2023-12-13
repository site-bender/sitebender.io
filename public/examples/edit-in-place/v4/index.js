import makeTablesEditable from "../modules/make-tables-editable.js"

document.querySelector("tbody")?.classList.add("hide-body")

globalThis.addEventListener("DOMContentLoaded", makeTablesEditable)
