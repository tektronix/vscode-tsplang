# tsplang-plugins

## Enchancements

A running list of nice-to-have features.

### Plugin Provider

#### Updates

1. Use an event model to notify when plugins need refreshing.
<br/>
This will be useful when the user-defined TSPLang plugin directory changes.

#### Loading

1. Cache a plugin's associated TSP files.
1. Accept plugin aliases.

### Configuration Files

1. Toggle keyword inheritance.
<br/>
Add an option to the TSPLang plugin configuration schema that toggles keyword
inheritance on/off.
<br/>
Add a new entry to
[tsplang.plugin.schema.json#/definitions/pluginExtensionObject/properties](./tsplang.plugin.schema.json).

### Other

1. Show a plugin's license on shebang entry hover.
