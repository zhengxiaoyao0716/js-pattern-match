(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['./match'], factory);
    } else if (typeof exports !== "undefined") {
        factory(require('./match'));
    } else {
        var mod = {
            exports: {}
        };
        factory(global.match);
        global.match_test = mod.exports;
    }
})(this, function (_match) {
    'use strict';

    var _match2 = _interopRequireDefault(_match);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

    /**
     * Base match.
     */
    console.log((0, _match2.default)([Number.isInteger, function (s) {
        return typeof s == 'string';
    }], [401, 'please sign in.']));
    console.log((0, _match2.default)(function () {
        return arguments.length > 2;
    }, ['unexpected result.']));

    console.log('');

    /**
     * Define a pattern-matched function to handle some values like a response of HTTP request.
     * It will looks like those codes in elixir:
     * ``` elixir
     * handleResp = fn
     *     200, result -> "ok, " <> result
     *     code, result -> "#{code}, #{result}"
     * end
     * ```
     */

    var handleResp = (0, _match2.default)([[[function (r) {
        return r instanceof Object;
    }], function (json) {
        return console.log('success, result:', json);
    }], [[200, function (s) {
        return typeof s == 'string';
    }], function (code, text) {
        return handleResp(JSON.parse(text));
    }], [[403, function (s) {
        return typeof s == 'string';
    }], function (_, reason) {
        return console.log('403 Err, reason:', reason);
    }], [[Number.isInteger, function (s) {
        return typeof s == 'string';
    }], function (code, reason) {
        return console.log('Failed, code:', code, 'reason:', reason);
    }], [function () {
        return arguments.length > 2;
    }, function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return args.forEach(function (arg) {
            return handleResp(arg);
        });
    }]]);

    handleResp(401, 'please sign in.');
    handleResp(200, '{"id": 1, "token": ""}');
    handleResp({ time: new Date().toLocaleString() });
    handleResp(403, 'permissions denied.');
    handleResp([200, 'request.1'], [200, 'request.2'], [200, 'request.3']);
    try {
        handleResp('unexpected result.');
    } catch (error) {
        console.warn('[WARN]', error);
    };

    console.log('');

    /**
     * https://github.com/tc39/proposal-pattern-matching#ecmascript-pattern-matching-syntax
     */

    // let getLength = vector => match (vector) {
    //     { x, y, z }: Math.sqrt(x ** 2 + y ** 2 + z ** 2),
    //     { x, y }:    Math.sqrt(x ** 2 + y ** 2),
    //     [...]:       vector.length,
    //     else: {
    //         throw new Error("Unknown vector type");
    //     }
    // }

    var getLength = (0, _match2.default)([[[Number.isInteger, Number.isInteger, Number.isInteger], function (x, y, z) {
        return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
    }], [[Number.isInteger, Number.isInteger], function (x, y) {
        return Math.sqrt(x ** 2 + y ** 2);
    }], [function () {
        return arguments.length > 1;
    }, function () {
        return arguments.length;
    }]], function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        throw new Error("Unknown vector type: " + String(args));
    });

    var _arr = [[1, 2, 3], [1, 2], [1, 2, 3, 4, 5, 6], [123]];
    for (var _i = 0; _i < _arr.length; _i++) {
        var args = _arr[_i];
        try {
            console.log(args, ':', getLength.apply(undefined, _toConsumableArray(args)));
        } catch (error) {
            console.warn('[WARN]', error);
        }
    }

    console.log('');
});