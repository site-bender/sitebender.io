globalThis.addEventListener("DOMContentLoaded", async () => {
	const codeBlock = document.querySelector("code")
	const params = new URLSearchParams(window.location.search)

	if (params.has("code")) {
		sessionStorage.setItem("code", params.get("code"))
		params.delete("code")
		history.replaceState({}, "", window.location.pathname)
	}

	const createRandomString = length => {
		const chars =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

		return Array.from({ length })
			.map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
			.join("")
	}
	const hash = async val => {
		const hashed = await crypto.subtle.digest("SHA-256", val)

		return Buffer.from(hashed)
	}

	const bytesToBase64 = bytes => {
		const binString = String.fromCodePoint(...bytes)

		return btoa(binString)
	}

	const generateSHA256Hash = async data => {
		const encoder = new TextEncoder()
		const dataBuffer = encoder.encode(data)
		const hashed = await hash(dataBuffer)

		return bytesToBase64(hashed)
	}
	const code_verifier =
		sessionStorage.getItem("verifier") ||
		sessionStorage.setItem("verifier", createRandomString(128)) ||
		sessionStorage.getItem("verifier")

	const hashValue = (await generateSHA256Hash(code_verifier)).replace(/=+$/, "")

	const code_challenge =
		sessionStorage.getItem("hash") ||
		sessionStorage.setItem("hash", hashValue) ||
		sessionStorage.getItem("hash")

	const client_id =
		sessionStorage.getItem("client_id") ||
		sessionStorage.setItem("client_id", "gpdqmuss89btgdn2mte1ncvj4") ||
		sessionStorage.getItem("client_id")

	const code = sessionStorage.getItem("code")
	const token = sessionStorage.getItem("token")

	console.log("CODE", code)

	console.log("client_id", client_id)
	console.log("code_challenge", code_challenge)
	console.log("code_verifier", code_verifier)
	console.log("code", code)
	console.log("token", token)

	if (codeBlock) {
		codeBlock.innerHTML = `client_id: ${client_id}<br>
		code_challenge: ${code_challenge}<br>
		code_verifier: ${code_verifier}<br>
		code: ${code}<br>
		token: ${token}<br>`
	}

	const redirect_uri = "https://sitebender.io/theia"
	const response_type = "code"
	const code_challenge_method = "S256"

	if (!code) {
		console.log("Better get a code!")
		const href =
			"https://ariadne.auth.us-west-2.amazoncognito.com/oauth2/authorize"

		const searchParams = new URLSearchParams({
			response_type,
			client_id,
			redirect_uri,
			code_challenge,
			code_challenge_method,
		})

		const url = new URL(`${href}?${searchParams.toString()}`)

		window.location.href = url.href

		console.log("url", url)
	}

	const postUrl =
		"https://ariadne.auth.us-west-2.amazoncognito.com/oauth2/token"
	const grant_type = "authorization_code"
	const body = `grant_type=${grant_type}&client_id=${client_id}&code=${code}&code_verifier=${code_verifier}&redirect_uri=${redirect_uri}`

	console.log("body", body)

	const getToken = async event => {
		event.preventDefault()

		const resp = await fetch(postUrl, {
			body,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			method: "POST",
		})

		if (resp) {
			const json = await resp.json()

			if (json) {
				sessionStorage.setItem("id_token", json.id_token)
				sessionStorage.setItem("access_token", json.access_token)
				sessionStorage.setItem("refresh_token", json.refresh_token)
			}
		}
	}

	if (code && !token) {
		const form = document.createElement("FORM")
		form.setAttribute("action", postUrl)
		form.setAttribute("method", "POST")

		const grantType = document.createElement("INPUT")
		grantType.setAttribute("id", "grant_type")
		grantType.setAttribute("name", "grant_type")
		grantType.setAttribute("type", "text")
		grantType.setAttribute("value", grant_type)
		const grantTypeLabel = document.createElement("LABEL")
		grantTypeLabel.setAttribute("for", "grant_type")
		grantTypeLabel.innerText = "grant_type"
		const grantTypeDiv = document.createElement("DIV")
		grantTypeDiv.appendChild(grantTypeLabel)
		grantTypeDiv.appendChild(document.createElement("BR"))
		grantTypeDiv.appendChild(grantType)
		form.appendChild(grantTypeDiv)

		const redirectUri = document.createElement("INPUT")
		redirectUri.setAttribute("id", "redirect_uri")
		redirectUri.setAttribute("name", "redirect_uri")
		redirectUri.setAttribute("type", "text")
		redirectUri.setAttribute("value", redirect_uri)
		const redirectUriLabel = document.createElement("LABEL")
		redirectUriLabel.setAttribute("for", "redirect_uri")
		redirectUriLabel.innerText = "redirect_uri"
		const redirectUriDiv = document.createElement("DIV")
		redirectUriDiv.appendChild(redirectUriLabel)
		redirectUriDiv.appendChild(document.createElement("BR"))
		redirectUriDiv.appendChild(redirectUri)
		form.appendChild(redirectUriDiv)

		const clientId = document.createElement("INPUT")
		clientId.setAttribute("id", "client_id")
		clientId.setAttribute("name", "client_id")
		clientId.setAttribute("type", "text")
		clientId.setAttribute("value", client_id)
		const clientIdLabel = document.createElement("LABEL")
		clientIdLabel.setAttribute("for", "client_id")
		clientIdLabel.innerText = "client_id"
		const clientIdDiv = document.createElement("DIV")
		clientIdDiv.appendChild(clientIdLabel)
		clientIdDiv.appendChild(document.createElement("BR"))
		clientIdDiv.appendChild(clientId)
		form.appendChild(clientIdDiv)

		const codeInput = document.createElement("INPUT")
		codeInput.setAttribute("id", "code")
		codeInput.setAttribute("name", "code")
		codeInput.setAttribute("type", "text")
		codeInput.setAttribute("value", code)
		const codeInputLabel = document.createElement("LABEL")
		codeInputLabel.setAttribute("for", "code")
		codeInputLabel.innerText = "code"
		const codeInputDiv = document.createElement("DIV")
		codeInputDiv.appendChild(codeInputLabel)
		codeInputDiv.appendChild(document.createElement("BR"))
		codeInputDiv.appendChild(codeInput)
		form.appendChild(codeInputDiv)

		const codeVerifier = document.createElement("TEXTAREA")
		codeVerifier.setAttribute("id", "code_verifier")
		codeVerifier.setAttribute("name", "code_verifier")
		codeVerifier.setAttribute("type", "text")
		codeVerifier.innerHTML = code_verifier
		const codeVerifierLabel = document.createElement("LABEL")
		codeVerifierLabel.setAttribute("for", "code_verifier")
		codeVerifierLabel.innerText = "code_verifier"
		const codeVerifierDiv = document.createElement("DIV")
		codeVerifierDiv.appendChild(codeVerifierLabel)
		codeVerifierDiv.appendChild(document.createElement("BR"))
		codeVerifierDiv.appendChild(codeVerifier)
		form.appendChild(codeVerifierDiv)

		const button = document.createElement("BUTTON")
		button.setAttribute("type", "submit")
		button.innerHTML = "Get token"
		button.addEventListener("click", getToken)
		form.appendChild(button)

		document.querySelector("main")?.appendChild(form)
	}
})
