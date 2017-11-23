'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _find = require('babel-runtime/core-js/array/find');

var _find2 = _interopRequireDefault(_find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
exports.default = function (isArr, isFn, any, mPns) {
    return function (mFns) {
        return mFns([[[isArr], mFns], [[isArr, isFn], mFns], [[any, isArr], mPns]]);
    }(function (fns, elseFn) {
        return function () {
            var _this = this;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return ((0, _find2.default)(fns, function (_ref) {
                var _ref2 = (0, _slicedToArray3.default)(_ref, 1),
                    pattern = _ref2[0];

                return mPns.call(_this, pattern, args);
            }) || [, elseFn || function () {
                throw new Error('no matched pattern.');
            }])[1].apply(this, args);
        };
    });
}(function (arr) {
    return arr instanceof Array;
}, function (fn) {
    return fn instanceof Function;
}, function () {
    return true;
}, function (pattern, args) {
    var _this2 = this;

    return pattern instanceof Function ? pattern.apply(this, args) : pattern.length == args.length && pattern.every(function (p, i) {
        return p instanceof Function ? p.call(_this2, args[i]) : p === args[i];
    });
});

//# sourceMappingURL=match.js.map