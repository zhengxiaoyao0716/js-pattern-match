# js-pattern-match
## Implement pattern match in JS.

***
## Usage:
Node:
``` javascript
// npm i js-pattern-match --save-dev
import match from 'js-pattern-match';
```

Browser:
``` html
<script src="zhengxiaoyao0716.github.io/js-pattern-match/dist/match.min.js"></script>
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

See [match_test.es6](./match_test.es6) for more.
