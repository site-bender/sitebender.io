---
caption: "Written Haskell-style."
---

```ts
type GetOrdinal = (c: number) => string
const getOrdinal: GetOrdinal = cardinalNumber => {
	const onesDigit = cardinalNumber % 10

	switch (onesDigit) {
		case 1:
			return `${cardinalNumber}st`
		case 2:
			return `${cardinalNumber}nd`
		case 3:
			return `${cardinalNumber}rd`
		default:
			return `${cardinalNumber}th`
	}
}

export default getOrdinal
```
