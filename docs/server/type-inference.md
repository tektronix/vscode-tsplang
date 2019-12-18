## Type Inference

1. Declaring a variable with a specific type restricts the variable to that type.
2. Declaring a variable with a nil type uses the last assigned type.

## Notes

* In JSDoc, typedefs of type unions are inlined:
```javascript
/**
 * @typedef T1
 * @property {any} p
 */
/**
 * @typedef T2JudgementDay
 * @property {any} p
 */
/**
 * @typedef T3RiseOfTheMachines
 * @property {any} p
 */

/**
 * A really long type union.
 * @typedef {(string|number|boolean|function|symbol|T1|T2JudgementDay|T3RiseOfTheMachines)} SuperUnion
 */

/**
 * @param {SuperUnion} arg
 * @returns {(boolean|number)}
 */
function doSomething(arg) {
    /*
     * hovering shows over `arg` displays
     * "(parameter) arg: string | number | boolean | symbol | Function | T1 | T2JudgementDay | T3RiseOfTheMachines"
     */

    // ...
}
```
