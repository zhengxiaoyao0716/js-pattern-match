# js-pattern-match
## Implement pattern match in JS.

***
## Install:
Node:
``` javascript
// npm i js-pattern-match --save-dev
import match from 'js-pattern-match';
```

Browser:
``` html
<script src="https://zhengxiaoyao0716.github.io/js-pattern-match/dist/match.min.js"></script>
```

Or if you are using es6, you need only add those code, and it will works well:
``` javascript
const match = ((isArr, isFn, any, mPns) => (mFns => mFns([[[isArr], mFns], [[isArr, isFn], mFns], [[any, isArr], mPns]]))(
    (fns, elseFn) => (...args) => (
        fns.find(([pattern]) => mPns(pattern, args)) || [, elseFn || ((...args) => { throw new Error('no matched pattern.'); })]
    )[1](...args)
))(arr => arr instanceof Array, fn => fn instanceof Function, () => true,
    (pattern, args) => pattern instanceof Function ?
        pattern(...args) : pattern.length == args.length && pattern.every((p, i) => p instanceof Function ? p(args[i]) : p === args[i]));
```

***
## Usage:
Define a pattern-matched function to handle some values like a response of HTTP request, It will looks like those codes in elixir:
``` elixir
handleResp = fn
    200, result -> "ok, " <> result
    code, result -> "#{code}, #{result}"
end
```
``` javascript
const any = () => true;
const matchResp = match([
    [[200, any], console.log],
    [[any, any], console.warn],
], console.error);
matchResp(200, 'fin.');
matchResp(404, 'not found.');
matchResp('unexpected.');
```

Implement the example [tc39]((https://github.com/tc39/proposal-pattern-matching#ecmascript-pattern-matching-syntax)) given:
``` javascript
// let getLength = vector => match (vector) {
//     { x, y, z }: Math.sqrt(x ** 2 + y ** 2 + z ** 2),
//     { x, y }:    Math.sqrt(x ** 2 + y ** 2),
//     [...]:       vector.length,
//     else: {
//         throw new Error("Unknown vector type");
//     }
// }
const num = Number.isInteger;
const res = (...args) => args.length > 1;
const els = (..._) => true;
let getLength = match([
    [[num, num, num],   (x, y, z) => Math.sqrt(x ** 2 + y ** 2 + z ** 2)],
    [[num, num],        (x, y) => Math.sqrt(x ** 2 + y ** 2)],
    [res,               (...vector) => vector.length],
    [els, (...args) => { throw new Error("Unknown vector type: " + String(args)); }]
]);
```

It looks alike, and if we have some macro or syntactic sugar we can easier to implements it. See [match_test.es6](./match_test.es6) for more details usage.
