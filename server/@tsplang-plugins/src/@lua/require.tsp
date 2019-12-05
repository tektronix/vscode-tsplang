
--[[[
    This command will error if run by a TSP instrument.

    Used by TSPLang plugins to reference symbols found in other files. If the
    package is a path starting with the "." or "..", then the reference is
    local. If the package is a directory name starting with "@", then the
    reference is to a built-in TSPLang plugin.

    If the given reference has not been loaded, then its loading takes
    precedence over the requiring package.

    When the given reference is available, its global scope is copied into the
    requiring package's global scope.

    If the given reference cannot be found, then a parse error is raised by
    the TSPLang extension.

    @param {string} packagename The package to load into this package's global
        scope.
]]
function require(packagename)
end
