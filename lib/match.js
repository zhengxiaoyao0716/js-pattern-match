(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.match = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _slicedToArray = function () {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);

                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }

            return _arr;
        }

        return function (arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    }();

    exports.default = function (isArr, isFn, any, mPns) {
        return function (mFns) {
            return mFns([[[isArr], mFns], [[isArr, isFn], mFns], [[any, isArr], mPns]]);
        }(function (fns, elseFn) {
            return function () {
                var _this = this;

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                return (fns.find(function (_ref) {
                    var _ref2 = _slicedToArray(_ref, 1),
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
});