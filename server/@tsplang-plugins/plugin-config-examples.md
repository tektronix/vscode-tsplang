## Plugin Configuration Examples

Wholly extend one or more plugins:

```json
{
    "extends": ["2450", "lua"]
}
```

Only extend some of a plugin:

```jsonc
{
    "extends": [
        {
            "plugin": "2450",
            "include": [
                // Include entire command tables.
                "smu.measure",

                // Include individual commands.
                "smu.reset"
            ],
            "exclude": [
                // Exclude entire command tables.
                "smu.measure.math",

                // Exclude individual commands.
                "smu.measure.sense"
            ]
        },
        {
            "plugin": "lua",

            // Include is optional and defaults to the entire command set.
            // "include": ["*"],

            // Exclude is optional and defaults to an empty set.
            // "exclude": []
        }
    ]
}
```
