# tsplang-plugins

## Enchancements

A running list of nice-to-have features.

### Plugin Provider

#### Available Plugins

1. Expose a method that returns all available plugin names.
<br/>
The list of available plugins MUST NOT include aliases.

#### Updates

1. Use an event model to notify when plugins need refreshing.
<br/>
This will be useful when the user-defined TSPLang plugin directory changes.

#### Loading

1. Protect against circular extends dependencies.

#### VSCode Configuration

1. Adjust maximum scan depth of plugin folders.
<br/>
Currently hard-coded to 10.

#### `extends` Filtering

1. The current filtering method is only smart enough to filter
symbols that exist as TSP files in the filesystem. For example, for
SMU2450 commands, we can filter on "buffer" but not
"buffer.DIGIT_3_5".
   1. WORKAROUND: If we want to include only the "buffer.DIGIT_3_5" symbol, we
   would include "buffer" since all command tables have an associated
   file. In our extending plugin, we would create our own "buffer.tsp"
   file and set all undesired fields of the buffer table to nil.
   1. WORKAROUND: If we want to exclude only the "buffer.DIGIT_3_5" symbol, we
   would include "buffer" since all command tables have an associated
   file. In our extending plugin, we would create our own "buffer.tsp"
   file and set the "DIGIT_3_5" field of the buffer table to nil.

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
