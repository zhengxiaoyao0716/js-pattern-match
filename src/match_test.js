import match from './../index';

const num = Number.isInteger;
const str = s => typeof (s) == 'string';

/**
 * Base match.
 */
console.log(match([num, str], [401, 'please sign in.']));
console.log(match((...args) => args.length > 2, ['unexpected result.']));

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

const handleResp = match([
    [[r => r instanceof Object], json => console.log('success, result:', json)],
    [[200, str], (code, text) => handleResp(JSON.parse(text))],
    [[403, str], (_, reason) => console.log('403 Err, reason:', reason)],
    [[num, str], (code, reason) => console.log('Failed, code:', code, 'reason:', reason)],
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

let getLength = match([
    [[num, num, num], (x, y, z) => Math.sqrt(x ** 2 + y ** 2 + z ** 2)],
    [[num, num], (x, y) => Math.sqrt(x ** 2 + y ** 2)],
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

console.log('');


/**
 * https://github.com/tc39/proposal-pattern-matching#nested-patterns
 */

// let node = {
//     name: 'If',
//     alternate: { name: 'Statement', value: '...' },
//     consequent: { name: 'Statement', value: '...' }
// };

// match (node) {
//     { name: 'If', alternate }: // if with no else
//         match (alternate) {
//             // ...
//         },
//     { name: 'If', consequent }: // if with an else
//         match(consequent) {
//             // ...
//         }
// }

let nestedLog = match([
    [
        node => node.name == 'If' &&
            match(alternate => alternate.name, [node.alternate]),
        console.log.bind(console, 'matched alternate:')],
    [
        node => node.name == 'If' &&
            match(consequent => consequent.name, [node.consequent]),
        console.log.bind(console, 'matched consequent:')],
], console.warn.bind(console, '[WARN]'));

nestedLog({ name: 'If', alternate: { name: 'fin' }, consequent: {} });
nestedLog({ name: 'If', alternate: {}, consequent: { name: 'fin' } });
nestedLog({ name: 'Else', alternate: {}, consequent: {} });

console.log('');

/**
 * test `this` refer.
 */
const testThis = match([
    [[function (n) { console.log('pattern.n:', this); return num(n); }], function () { console.log('matched:', this); }],
    [function (...args) { console.log('pattern.args:', this); return args.length > 1; }, () => { }],
], function () { console.log('else:', this) }).bind('ok');
testThis(0);
testThis();
