const DEFAULT_TOGGLE_LINES = true;
const DEFAULT_TOGGLE_CLIPBOARD = true;
const DEFAULT_TOGGLE_HYPERLINK = true;
const DEFAULT_TOGGLE_TOOLTIPS = true;
const DEFAULT_NUMB = 0;
let GM_increment = 0;
let _check_lines = DEFAULT_TOGGLE_LINES;
let _check_clipboard = DEFAULT_TOGGLE_CLIPBOARD;
let _check_hyperlink = DEFAULT_TOGGLE_HYPERLINK;
let _check_tooltips = DEFAULT_TOGGLE_TOOLTIPS;
window.onload = function() {
    pull_opts();
}

function ready() {
    // GameMaker subreddit (/r/gamemaker)
    let blocks = document.getElementsByTagName('pre');
    for (let i = 0, l = blocks.length; i < l; i++) {
        let gen = craft(blocks[i], false);
        blocks[i].innerHTML = gen.return_html;
    }
    // TODO, better handling of <pre> tag removal
    document.body.innerHTML = document.body.innerHTML.replace(/<pre[\s\S]*?>/g,
        '<div>').replace(/<\/pre>/g, '</div>');
    // docs.yyg, docs2.yyg
    blocks = document.getElementsByClassName('code');
    for (let i = 0, l = blocks.length; i < l; i++) {
        let gen = craft(blocks[i], true);
        blocks[i].innerHTML = gen.return_html;
    }
    // forum.yyg cleanup
    let rem = document.getElementsByClassName("bbCodeCode");
    let lst = [];
    for (let i = 0, l = rem.length; i < l; i++) {
        lst.push(rem[i]);
    }
    for (let i = 0, l = lst.length; i < l; i++) {
        lst[i].className = '';
    }
    let count = DEFAULT_NUMB;
    chrome.storage.sync.get('counter', function(data) {
        if (typeof data.counter !== 'undefined') count = data.counter +
            GM_increment;
        chrome.storage.sync.set({
            counter: count
        });
    });
}

function craft(dv, nl) {
    // clean up input string
    let pass = (dv.innerHTML.replace(/<code>/g, '').replace(/<\/code>/g, '').replace(
        /<code[\s\S]*?>/g, '').replace(/&nbsp;/g, ' ').replace(/&lt;/g,
        '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'));
    // new lines
    if (nl) {
        pass = pass.replace(/(?:\n)/g, '').replace(/<br>/g, '\n');
    }
    GM_increment++;
    // create the snippet
    return gm_generate(pass, '', _check_lines, _check_hyperlink,
        _check_clipboard, _check_tooltips);
}

function pull_opts() {
    chrome.storage.sync.get({
        check_lines: DEFAULT_TOGGLE_LINES,
        check_clipboard: DEFAULT_TOGGLE_CLIPBOARD,
        check_hyperlink: DEFAULT_TOGGLE_HYPERLINK,
        check_tooltips: DEFAULT_TOGGLE_TOOLTIPS
    }, function(items) {
        _check_lines = items.check_lines;
        _check_clipboard = items.check_clipboard;
        _check_hyperlink = items.check_hyperlink;
        _check_tooltips = items.check_tooltips;
        ready();
    });
}