---
caption: "Constants are used to make purpose clear."
---

```ts
import type { Left, Right } from "../../fp/Either"
import { isLeft, right } from "../../fp/Either"

import collectErrors from "../../utilities/collectErrors"
import getOperands from "../../utilities/getOperands"

import { MULTIPLICATION_IDENTITY } from "../../constants"

type Multiply = (o: MultiplyOperation) => () => Left<Array<string>> | Right<number>
const multiply: Multiply = op => {
	const multipliers = getOperands(op.multipliers)("number") as (Left<string[]> | Right<number>)[]

	const error = collectErrors(multipliers) as Left<Array<string>>

	return isLeft(error) ? () => error : () => multipliers.reduce((sum, operand) => right((operand as Right<number>).right * (sum as Right<number>).right), right(MULTIPLICATION_IDENTITY))
}

export default multiply
```
