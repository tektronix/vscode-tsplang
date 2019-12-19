# Conventions

## Names

* All plugin folders must start with "@" so that plugins are grouped together
and float above/below implementation folders when viewed in the filesystem.

## Configuration Files

In addition to starting with a "@" character, all plugin folders must contain a
file named `tsplang.plugin`. This file must be located in the root of the
plugin folder and adhere to the schema defined by the
[tsplang.plugin.schema.json](../tsplang.plugin.schema.json) file.
