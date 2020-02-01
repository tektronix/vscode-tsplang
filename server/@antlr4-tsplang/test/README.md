# Naming Parser Tests

The use of keywords from [RFC-2119](https://tools.ietf.org/html/rfc2119) in
each parser test is determined by the rule structure of the underlying grammar
file. This section will attempt to document that structure so that it can be
maintained after everyone has forgotten there was ever a deliberate structure
at all.

## General Guidelines

To name your parser test, follow these guidelines.

1. Rules without alternatives must use the *MUST* keyword for its minimum
viable match.
1. Rules with alternatives must use the *SHOULD* keyword for the minimum viable
match of each alternative.
1. Tests of optional rule components must use the *MAY* keyword.

All letters of a keyword must be capitalized.

If your test falls outside of these rules, then use your best judgement.
Leaving a brief clarifying comment (that starts with `NOTE:`) will earn you
bonus points during code review.

## Example 1

```antlr
operatorStrcat: '..';
```

```javascript
it('MUST parse a ".." token')
```

## Example 2

```antlr
tableConstructor: '{' fieldList? '}';
```

```javascript
it('MUST parse an empty table constructor ("{}")')
it('MAY parse a single fieldList ("{fieldList}")')
```

## Example 3

```antlr
operatorComparison: LT | GT | '<=' | '>=' | NE | '==';
```

```javascript
it("SHOULD parse a LT token")
it("SHOULD parse a GT token")
it('SHOULD parse a "<=" token')
it('SHOULD parse a ">=" token')
it("SHOULD parse a NE token")
it('SHOULD parse a "==" token')
```

## Example 4

```antlr
args
    : '(' (expression (',' expression)*)? ')'
    | tableConstructor
    | string
    ;
```

```javascript
it('SHOULD parse an empty argument list ("()")')
it('MAY parse a single argument expression ("(expression)")')
it('MAY parse multiple argument expressions separated by "," tokens')
it("SHOULD parse a tableConstructor")
it("SHOULD parse a string")
```
