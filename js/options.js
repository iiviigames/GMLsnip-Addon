const DEFAULT_TOGGLE_LINES = true;
const DEFAULT_TOGGLE_CLIPBOARD = true;
const DEFAULT_TOGGLE_HYPERLINK = true;
const DEFAULT_TOGGLE_TOOLTIPS = true;
const DEFAULT_NUMB = 0;

function save_options() {
    var _check_lines = document.getElementById('check_lines').checked;
    var _check_clipboard = document.getElementById('check_clipboard').checked;
    var _check_hyperlink = document.getElementById('check_hyperlink').checked;
    var _check_tooltips = document.getElementById('check_tooltips').checked;
    chrome.storage.sync.set({
        check_lines: _check_lines,
        check_clipboard: _check_clipboard,
        check_hyperlink: _check_hyperlink,
        check_tooltips: _check_tooltips,
    }, function() {
        var status = document.getElementById('status');
        status.innerHTML = 'Options saved. Reloading page...';
        chrome.tabs.reload();
        setTimeout(function() {
            status.innerHTML = '&nbsp;';
        }, 750);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        check_lines: DEFAULT_TOGGLE_LINES,
        check_clipboard: DEFAULT_TOGGLE_CLIPBOARD,
        check_hyperlink: DEFAULT_TOGGLE_HYPERLINK,
        check_tooltips: DEFAULT_TOGGLE_TOOLTIPS,
        counter: DEFAULT_NUMB
    }, function(items) {
        document.getElementById('check_lines').checked = items.check_lines;
        document.getElementById('check_clipboard').checked = items.check_clipboard;
        document.getElementById('check_hyperlink').checked = items.check_hyperlink;
        document.getElementById('check_tooltips').checked = items.check_tooltips;
        document.getElementById('check_numb').innerHTML = items.counter;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
window.addEventListener('click', function(e) {
    if (e.target.href !== undefined) {
        chrome.tabs.create({
            url: e.target.href
        })
    }
});