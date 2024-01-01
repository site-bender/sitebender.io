import listeners from "./modules/listeners.js"
import publish from "./modules/publish.js"
import register from "./modules/register.js"
import subscribe from "./modules/subscribe.js"
import subscriptions from "./modules/subscriptions.js"
import unregister from "./modules/unregister.js"
import unsubscribe from "./modules/unsubscribe.js"

globalThis._xx ??= {}

Object.assign(globalThis._xx, {
	listeners,
	publish,
	register,
	subscribe,
	subscriptions,
	unregister,
	unsubscribe,
})

console.info("« PubSub and event delegation enabled. »")
