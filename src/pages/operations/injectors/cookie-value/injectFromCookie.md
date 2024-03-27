```ts
type InjectFromCookie = {
	cookie: string
	evaluateOnLoad?: boolean | undefined
	operator: "cookieValue"
	name?: string | undefined
	precision?: number | undefined
	returns: ReturnType
	truncation?: TruncationType | undefined
}

type ReturnType = "number" | "string" | "boolean" | "calendar" | "duration" | "plainDate" | "plainDateTime" | "plainMonthDay" | "plainTime" | "plainYearMonth" | "array" | "record" | "map" | "set"

type TruncationType = "ceiling" | "floor" | "round" | "truncate"
```
