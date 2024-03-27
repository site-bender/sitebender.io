```jsonc
// This configuration
{
  "cookie": "my-cookie",
  "operator": "cookieValue",
  "name": "name",
  "returns": "string"
}

// Fetches the name from this cookie value:
// Assuming the cookie name is "my-cookie"
"date=2024-03-27; name=Bob Dobbs; seeks=slack"

// And returns
"Bob Dobbs"

// If we asked for the date instead, and set returns to "plainDate"

{
  "cookie": "my-cookie",
  "operator": "cookieValue",
  "name": "name",
  "returns": "plainDate"
}

// It will return a Temporal.PlainDate object
// for the date 27 March 2024
// Or we could set it to return a string:
{
  "cookie": "my-cookie",
  "operator": "cookieValue",
  "name": "name",
  "returns": "string"
}

// And get back the date as a string:
"2024-03-27"
```
