// const matchPns = (pattern, args) => pattern instanceof Function ?
//     pattern(...args) : pattern.length == args.length && pattern.every((p, i) => p instanceof Function ? p(args[i]) : p === args[i]);

// const matchFns = (fns, elseFn) => (...args) => {
//     const [_, fn] = fns.find(([pattern]) => matchPns(pattern, args)) || [, elseFn || ((...args) => { throw new Error('no matched pattern.'); })];
//     return fn(...args);
// }

// export default matchFns([
//     [[fns => fns instanceof Array], matchFns],
//     [[fns => fns instanceof Array, elseFn => elseFn instanceof Function], matchFns],
//     [[() => true, args => args instanceof Array], matchPns],
// ])

// lambda.
export default ((isArr, isFn, any, mPns) => (mFns => mFns([[[isArr], mFns], [[isArr, isFn], mFns], [[any, isArr], mPns]]))(
    (fns, elseFn) => (...args) => (
        fns.find(([pattern]) => mPns(pattern, args)) || [, elseFn || ((...args) => { throw new Error('no matched pattern.'); })]
    )[1](...args)
))(arr => arr instanceof Array, fn => fn instanceof Function, () => true,
    (pattern, args) => pattern instanceof Function ?
        pattern(...args) : pattern.length == args.length && pattern.every((p, i) => p instanceof Function ? p(args[i]) : p === args[i]));
