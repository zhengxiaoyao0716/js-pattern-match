import match from './match';

/**
 * Base match.
 */
console.log(match([Number.isInteger, s => typeof (s) == 'string'], [401, 'please sign in.']));
console.log(match((...args) => args.length > 2, ['unexpected result.']));

console.log('')


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

const handleResp = match([
    [[r => r instanceof Object], json => console.log('success, result:', json)],
    [[200, s => typeof (s) == 'string'], (code, text) => handleResp(JSON.parse(text))],
    [[403, s => typeof (s) == 'string'], (_, reason) => console.log('403 Err, reason:', reason)],
    [[Number.isInteger, s => typeof (s) == 'string'], (code, reason) => console.log('Failed, code:', code, 'reason:', reason)],
    [(...args) => args.length > 2, (...args) => args.forEach((arg) => handleResp(arg))],
]);

handleResp(401, 'please sign in.');
handleResp(200, '{"id": 1, "token": ""}');
handleResp({ time: new Date().toLocaleString() });
handleResp(403, 'permissions denied.');
handleResp([200, 'request.1'], [200, 'request.2'], [200, 'request.3']);
try {
    handleResp('unexpected result.')
} catch (error) {
    console.warn('[WARN]', error);
};

console.log('')


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

let getLength = match([
    [[Number.isInteger, Number.isInteger, Number.isInteger], (x, y, z) => Math.sqrt(x ** 2 + y ** 2 + z ** 2)],
    [[Number.isInteger, Number.isInteger], (x, y) => Math.sqrt(x ** 2 + y ** 2)],
    [(...args) => args.length > 1, (...vector) => vector.length],
    // [(..._) => true, (...args) => { throw new Error("Unknown vector type: " + String(args)); }]
], (...args) => {
    throw new Error("Unknown vector type: " + String(args));
});

for (let args of [
    [1, 2, 3],
    [1, 2],
    [1, 2, 3, 4, 5, 6],
    [123],
]) {
    try {
        console.log(args, ':', getLength(...args));
    } catch (error) {
        console.warn('[WARN]', error);
    }
}

console.log('')
