```jsonc
// This configuration
{
	"operator": "apiValue",
	"path": "data.email",
	"returns": "string",
	"url": "https://reqres.in/api/users/2"
}

// Fetches this data object from that URL:
{
  "data": {
    "id": 2,
    "email": "janet.weaver@reqres.in",
    "first_name": "Janet",
    "last_name": "Weaver",
    "avatar": "https://reqres.in/img/faces/2-image.jpg"
  },
  "support": {
    "url": "https://reqres.in/#support-heading",
    "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
  }
}

// Then uses the path "data.email" to extract this email address:

"janet.weaver@reqres.in"
```
