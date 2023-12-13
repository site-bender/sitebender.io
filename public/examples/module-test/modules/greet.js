export default async function (str) {
	if (str === "hi") {
		return (await import("./hi.js")).default()
	}

	if (str === "bye") {
		return (await import("./bye.js")).default()
	}

	return (await import("./urk.js")).default()
}
