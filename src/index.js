const out = (...args) => document.querySelector('#result').appendChild(...args)
const print = (raw, ref) =>
    (...args) => {
        raw(...args);
        const p = document.createElement('p');
        p.style.minHeight = '24px';
        p.style.margin = 0;
        ref && ref(p);
        p.innerHTML = args.join(' ');
        out(p);
    };
console.log = print(console.log);
console.warn = print(console.warn, p => p.style.backgroundColor = '#EE0000');

const fetch = window.fetch || (url => new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('Get', url, true);
    request.responseType = 'text';
    request.addEventListener("load", ({ srcElement }) => resolve({ text: () => srcElement.responseText }), false);
    request.addEventListener("error", reject, false);
    request.send();
}));
fetch('./src/match_test.js').then(r => r.text()).then(text => {
    var code = document.querySelector('#code');
    code.innerHTML = text;
    hljs.highlightBlock(code);
});
require('./match_test');
