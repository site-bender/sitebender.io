```ts
type InjectFromAPI = {
	evaluateOnLoad?: boolean | undefined
	method?: Method
	operator: "apiValue"
	options?: RequestInit | undefined
	path: string
	precision?: number | undefined
	returns: ReturnType
	truncation?: TruncationType | undefined
	url: URL
}

type ReturnType = "number" | "string" | "boolean" | "calendar" | "duration" | "plainDate" | "plainDateTime" | "plainMonthDay" | "plainTime" | "plainYearMonth" | "array" | "record" | "map" | "set"

type TruncationType = "ceiling" | "floor" | "round" | "truncate"

type Method = "GET" | "PATCH" | "POST" | "PUT"
```
