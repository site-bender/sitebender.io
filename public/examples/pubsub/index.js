import subscribe from "./modules/subscribe.js"
import subscriptions from "./modules/subscriptions.js"
import unsubscribe from "./modules/unsubscribe.js"

globalThis._xx ??= {}

Object.assign(globalThis._xx, {
	subscribe,
	subscriptions,
	unsubscribe,
})

console.info("« Event bus enabled. »")
