// const matchPns = function (pattern, args) {
//     return pattern instanceof Function ?
//         pattern.apply(this, args) : pattern.length == args.length && pattern.every((p, i) => p instanceof Function ? p.call(this, args[i]) : p === args[i]);
// };

// const matchFns = (fns, elseFn) => function (...args) {
//     const [_, fn] = Array.find(fns, ([pattern]) => matchPns.call(this, pattern, args)) || [, elseFn || (() => { throw new Error('no matched pattern.'); })];
//     return fn.apply(this, args);
// }

// export default matchFns([
//     [[fns => fns instanceof Array], matchFns],
//     [[fns => fns instanceof Array, elseFn => elseFn instanceof Function], matchFns],
//     [[() => true, args => args instanceof Array], matchPns],
// ])

// lambda.
export default ((isArr, isFn, any, mPns) => (mFns => mFns([[[isArr], mFns], [[isArr, isFn], mFns], [[any, isArr], mPns]]))(
    (fns, elseFn) => function (...args) {
        return (
            Array.find(fns, ([pattern]) => mPns.call(this, pattern, args)) || [, elseFn || (() => { throw new Error('no matched pattern.'); })]
        )[1].apply(this, args);
    }
))(arr => arr instanceof Array, fn => fn instanceof Function, () => true, function (pattern, args) {
    return pattern instanceof Function ?
        pattern.apply(this, args) : pattern.length == args.length && pattern.every((p, i) => p instanceof Function ? p.call(this, args[i]) : p === args[i]);
});
