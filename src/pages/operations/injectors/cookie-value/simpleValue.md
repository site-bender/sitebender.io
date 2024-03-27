```jsonc
// This configuration
{
  "cookie": "my-cookie",
  "operator": "cookieValue",
  "precision": 3,
  "returns": "number",
  "truncate": "ceiling"
}

// Given the cookie value
"123.4567"

// Will return the value as a number
// rounded up to 3 decimal places:
123.457

// If we set "truncate" to "floor",
// then we will get this back instead:
123.456
```
