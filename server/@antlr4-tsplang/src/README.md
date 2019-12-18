## Naming Conventions

* Generated files (\*.generated.ts) are the only files that start with an
uppercase letter. All other files must start with a lowercase letter.
* All types extending generated types must begin with "Extended" followed by
the original type name.<br/>
For example, [extendedTspLexer.ts](./extendedTspLexer.ts) declares an
`ExtendedTspLexer` type that extends `TspLexer`.
* All types extending `antlr4ts` types must begin with "Tsp" followed by the
original type name.<br/>
For example, [tspCommonToken.ts](./tspCommonToken.ts) declares a
`TspCommonToken` type that extends `antlr4ts.CommonToken`.
* All overriding types that are exposed by this submodule must use the same
name as the type they override.<br/>
For example, `ExtendedTspLexer` is exposed as `TspLexer`.
