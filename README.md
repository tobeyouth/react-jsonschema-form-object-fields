## react-jsonshecma-form-object-fields

### What

A field setting for `react-jsonschema-form`

### Preparation

- [json-schema](http://json-schema.org/)

- [react-jsonschema-form](https://github.com/mozilla-services/react-jsonschema-form)

### How

```
// schema
{
    "properties": {
        "title": {
            "title": "this is title",
            "type": "string"
        },
        "aliax": {
            "title": "this is alias",
            "type": "string"
        }
    }
}

// ui schema
{
    "ui:field": "fields",
    "ui:fieldsets": [
		["title", "alias"]
	]
}
```


### deps

- [React](https://github.com/facebook/react)
- [bootstrap](https://github.com/twbs/bootstrap)
- [react-jsonschema-form-object-fields](https://github.com/mozilla-services/react-jsonschema-form)
