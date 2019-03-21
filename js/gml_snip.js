/*!
 * == GMLsnip.com -> gml_snip.js ==
 *
 * Dependency-free GameMaker Language syntax highlighter, code pretty-printer, and docs-linker for your website, blog.
 * 
 * @file      Generates GameMaker Language code snippets.
 *       
 * @author    Zack Banack <https://zackbanack.com>
 *              Particular code or functions may have their own
 *              "author" tags associated with them.
 *
 * @link      https://github.com/zbanack/GMLsnip
 * @license   GNU GPLv3 <https://github.com/zbanack/GMLsnip/blob/master/LICENSE>
 *              NOTE: Unless otherwise provided with explicit written
 *              permission, this software should be distributed
 *              with visible, clickable links to any of the following:
 *                1) https://github.com/zbanack/GMLsnip
 *                2) https:/www.GMLsnip.com
 *                3) https://zackbanack.com
 *              You may NOT monetize this code/variations of this code.
 *
 * @version   v1.0.4
 * @date      March 21, 2019
 */

// CSS and JS that gets appended to the page via script gm_style()
// TODO, better way to handle this!
let append_stylesheet = '@keyframes fadein{0%{opacity:0!important}to{opacity:.8!important}}@-moz-keyframes fadein{0%{opacity:0!important}to{opacity:.8!important}}@-webkit-keyframes fadein{0%{opacity:0!important}to{opacity:.8!important}}@-ms-keyframes fadein{0%{opacity:0!important}to{opacity:.8!important}}@-o-keyframes fadein{0%{opacity:0!important}to{opacity:.8!important}}.gz_cls_wrap ::selection{z-index:0!important;background:#999!important}.gz_cls_wrap ::-moz-selection{z-index:0!important;background:#999!important}.gz_cls_wrap ::-o-selection{z-index:0!important;background:#999!important}.gz_cls_wrap ::-webkit-selection{z-index:0!important;background:#999!important}.gz_cls_header{z-index:0!important;background-color:#25a083!important;background:linear-gradient(to left, #00b4ab, #25a083);text-align:left!important;padding:6px 10px 5px 18px!important;font-size:14px!important;text-shadow:0 2px 3px rgba(0,0,0,.2)!important;font-weight:400!important;line-height:1.5em!important;font-family:Verdana,Geneva,sans-serif!important;color:#fff!important;display:block!important}.gz_header_col_left{float:left!important;width:80%!important;margin:0!important;padding:0!important}.gz_header_col_right{float:right!important;text-align:right!important;padding:0!important;margin:0 15px 0 0!important}.gz_header_row:after{content:""!important;display:table!important;clear:both!important;overflow:hidden!important}.gz_tooltip .gz_tooltiptext{position:absolute!important;font-size:13px!important;line-height:15px!important;visibility:hidden!important;color:#fff!important;text-align:center!important;border-radius:2px!important;z-index:2!important;bottom:80%!important}.gz_tooltip .gz_tooltiptext::after{content:""!important;top:100%!important}.gz_tooltip:hover .gz_tooltiptext{box-shadow:1px 0 0 0 #000,-1px 0 0 0 #000!important;background-color:#000!important;padding-top:3px!important;padding-bottom:3px!important;visibility:visible!important;-webkit-animation:fadein .25s!important;-moz-animation:fadein .25s!important;-ms-animation:fadein .25s!important;-o-animation:fadein .25s!important;animation:fadein .25s!important}.gz_cls_snippet ::-webkit-scrollbar-track{background-color:#222!important}.gz_cls_snippet ::-webkit-scrollbar{width:10px!important;height:10px!important;background-color:#222!important}.gz_cls_snippet ::-webkit-scrollbar-thumb{background-color:#666!important}.gz_cls_copy_button{background-position:center!important;transition:all .15s ease!important;-webkit-transition:all .15s ease!important;-moz-transition:all .15s ease!important;-o-transition:all .15s ease!important;height:30px!important;width:30px!important;position:absolute!important;top:15px!important;right:15px!important;z-index:1!important;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1NjEgNTYxIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NjEgNTYxOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PGcgaWQ9ImNvbnRlbnQtY29weSI+PHBhdGggZD0iTTM5NS4yNSwwaC0zMDZjLTI4LjA1LDAtNTEsMjIuOTUtNTEsNTF2MzU3aDUxVjUxaDMwNlYweiBNNDcxLjc1LDEwMmgtMjgwLjVjLTI4LjA1LDAtNTEsMjIuOTUtNTEsNTF2MzU3ICAgIGMwLDI4LjA1LDIyLjk1LDUxLDUxLDUxaDI4MC41YzI4LjA1LDAsNTEtMjIuOTUsNTEtNTFWMTUzQzUyMi43NSwxMjQuOTUsNDk5LjgsMTAyLDQ3MS43NSwxMDJ6IE00NzEuNzUsNTEwaC0yODAuNVYxNTNoMjgwLjVWNTEwICAgIHoiIGZpbGw9IiNGRkZGRkYiLz48L2c+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjwvc3ZnPg==)!important;background-size:24px 24px!important;background-repeat:no-repeat!important;opacity:.8!important}.gz_cls_copy_button:hover{opacity:1!important;cursor:pointer!important}.gz_cls_copy_button:active{background-size:20px 20px!important;cursor:pointer!important}.gz_tooltip-text{background-color:#00b4ab!important;color:#fff!important;text-align:center!important}.gz_tooltip{position:relative!important}.gz_cls_box,.gz_tooltip .gz_tooltip-text{font-weight:400!important;line-height:1.5em!important}.gz_tooltip .gz_tooltip-text{visibility:hidden!important;border-radius:3px!important;position:absolute!important;z-index:100!important;bottom:100%!important;left:50%!important;margin-left:calc(-50%)!important;opacity:0!important;transition:.3s!important;transform:translate3d(0,5px,0)!important;text-shadow:0 1px 2px rgba(0,0,0,.25)!important;font-family:Verdana,Geneva,sans-serif!important;font-size:12px!important;width:max-content!important;text-align:center!important;padding:3px 6px!important}.gz_tooltip:hover .gz_tooltip-text{visibility:visible!important;opacity:1!important;transform:translate3d(0,0,0)!important}.gz_cls_box{counter-reset:line!important;background-color:#222!important;font-size:16px!important;font-family:Consolas,"Courier New",Courier,monospace!important;padding:20px!important;color:gray!important;text-align:left!important;min-height:1em!important;width:auto!important;overflow-x:auto!important;overflow-y:hidden!important;white-space:nowrap!important}.gz_cls_box .gz_cls_ln{padding-left:2.5em!important;display:block!important;counter-increment:line!important}.gz_cls_box .gz_cls_ln:before{text-align:right!important;margin-left:-3em!important;padding-right:2em!important;content:counter(line)!important;display:inline-block!important;width:2em!important;color:#97b2c8!important;-webkit-user-select:none!important}.gz_cls_wrap{-webkit-overflow-scrolling:touch!important;position:relative!important;}.pushout{padding-right:30px!important}.gz_gm_str{color:#ff0!important}.gz_gm_kwd{color:#ffb871!important;font-weight:700!important}.gz_gm_fnc{color:#e4a667!important}.gz_gm_com{color:#5b995b!important}.gz_gm_typ{color:#606!important}.gz_gm_lit{color:#58e55a!important}.gz_gm_loc{color:#f5ef94!important}.gz_gm_pnc{color:silver!important}.gz_gm_pln{color:#b2b1ff!important}.gz_gm_tag{color:#008!important}.gz_gm_int{color:#ff8080!important}.gz_gm_atn{color:#606!important}.gz_gm_atv{color:#080!important}.gz_gm_dec{color:#ff8080!important}.gz_gm_glb{color:#ff7eff!important}.gz_gm_mac{color:#ff2d39!important}.gz_gm_obs{color:#00f!important}.gz_gm_fnc a:hover{font-weight:700!important}.gz_header_col_right a{text-decoration:none!important;border:0!important}.gz_gm_fnc a:active,.gz_gm_fnc a:hover,.gz_gm_fnc a:link,.gz_gm_fnc a:visited{color:#e4a667!important;text-decoration:underline!important;border:0!important}';
let append_js = 'let f=document.createElement("textarea");let t=document.createElement("div");let p=document.getElementById(n);if(p==null)return 0;i=p.parentNode.parentNode;let T=i.innerHTML;T=T.replace(/\\<br\\>/g,"\\n");f.id="temp_field";f.type="textarea";f.innerHTML="";f.style.minHeight="0px";f.style.height="0px";f.style.opacity="0";i.insertBefore(t,i.firstChild);t.innerHTML=T;let sp=t.getElementsByClassName("gz_tooltip-text");while(sp.length>0)sp[0].parentNode.removeChild(sp[0]);f.value=t.textContent;i.insertBefore(f,i.firstChild);let copyText=document.getElementById("temp_field");copyText.select();document.execCommand("copy");i.removeChild(t);i.removeChild(f);i.innerHTML=i.innerHTML.replace(/\\n/g,"\\<br\\>");';
let append_js2 = "let gz_btns = document.getElementsByClassName('gz_cls_copy_button'); function gz_f_c() { let gz_attr = this.getAttribute('id'); gm_clipboard(gz_attr); gz_copy_refr(); }; for (let i = 0; i < gz_btns.length; i++) { gz_btns[i].removeEventListener('click', gz_f_c, false); gz_btns[i].addEventListener('click', gz_f_c, false);};";
let gm_clipboard = new Function('n', append_js);
let gz_copy_refr = new Function('', append_js2);

// Whether the unique styles have been appended to the document
// TODO: avoid global scope
let gm_style_applied = false;

/**
 * Pretty-prints GameMaker Language with (optional) documentation-linking
 *
 * @author  Zack Banack <https://zackbanack.com>
 *
 * @param [String]      input_str       The string (GML) to pretty-print
 *        [String]      snippet_name    The title of the GML snippet
 *        [Boolean]     use_lines       Whether to display line numbers in the code
 *        [Boolean]     use_docs        Whether to link functions to their doc entry
 *        [Boolean]     use_copy        Whether to display the clipboard button
 *        [Boolean]     use_tooltips    Whether to set the title attribute of a function
 *                                          link to the function's definition
 *
 * @return {Object}     return_css      The CSS/JS used to render the code snippet
 *                      return_html     The HTML used to create the code snippet
 */
function gm_generate(input_str, snippet_name, use_lines, use_docs, use_copy, use_tooltips) {

    // Append unique CSS to the page if first generation
    if (!gm_style_applied) {
        gm_style_applied = true;
        gm_style();
    }

    // Generate a number (unique ID), based on current UNIX timestamp
    let UID = new Date().valueOf();
    
    // Generate unique ID for divs using the UID
    let id_header   = 'gz_id_header_' + UID;
    let id_box      = 'gz_id_box_'    + UID;
    let id_copy     = 'gz_id_copy_'   + UID;
    let id_wrap     = 'gz_id_wrap_'   + UID;

    // Calls the syntax highlighter
    let return_str = gml_syntax(input_str, use_docs);

    // Create easy for the highlighter return tokens
    let tkn_con = return_str.gm_contents;
    let tkn_cls = return_str.gm_classes;

    // Not using line numbers
    let append_style = (!use_lines) ? "style=\"padding-left:2em;\"" : "";
    let output_str = "<div id=\"" + id_box + "\" class=\"gz_dev_scroll gz_cls_box\" " + append_style + ">";

    // Fallback for no title
    if (snippet_name.replace(/\s/g, '').length < 1) snippet_name = 'GML Code Snippet';

    // Fallback for no GML
    if (input_str.replace(/\s/g, '').length < 1) input_str = '// enter your GML';

    // Create the header
    let data_header = (
        "<div id=\"" + id_header + "\" class=\"gz_cls_header\">" +
        "<div class=\"gz_header_row\"><div class=\"gz_header_col_left\" title=\"" + snippet_name + "\">" + snippet_name + "</div><div class=\"gz_header_col_right\">" +
        "<a href=\"https://www.GMLsnip.com/\" target=\"_blank\" title=\"GMLsnip.com\" style=\"opacity:0.25;color:black; text-decoration:none;\">&#x2764;&#xFE0E;</a>" +
        "</div></div></div>"
    );

    // Tweak-specific additions
    if (use_copy) output_str += '<div id="' + id_copy + '" class="gz_cls_copy_button" title="Copy GML"></div>';
    if (use_lines) output_str += '<div class="gz_cls_ln">';

    // Iterate over tokens
    for (let i = 0; i < tkn_con.length; i++) {
        let val = tkn_con[i];

        // Line breaks
        let newline = false;
        if (val.indexOf('<br />') !== -1) {
            newline = true;
            val = use_lines ? val.replace(/<br \/>/, '\n') : val;
        }

        // Documentation-linking for functions
        if (tkn_cls[i] === 'gm_fnc' && use_docs) {
            let save_val = val;
            let pull = null;

            // Search for match in JSON
            for(let j = 0; j < gm_functions.length; j++) {
                if (gm_functions[j].name === save_val) pull = gm_functions[j];
            }

            // Function description
            let use_desc = use_tooltips ? pull.description.trunc(120) : save_val;

            // Craft a href/spans for the function link
            val = '<a href="' + pull.url + '" target="_blank" title="' + use_desc + '">' + '<span class="gz_tooltip">' + save_val + '<span class="gz_tooltip-text">' + val + '(' + pull.args.toString() + ')' + '</span></span>' + '</a>';
        }

        // Add additional output
        output_str += "<span class=\"" + 'gz_' + tkn_cls[i] + "\">" + val + "</span>";
        if (newline && use_lines) output_str += '</div><div class="gz_cls_ln">';
    }

    // Close open divs
    if (use_lines) output_str += '</div>';
    output_str+='</div>';

    // Craft the HTML to render the code snippet
    let HTML = data_header + '<div id = "' + id_wrap + '" class="gz_cls_wrap">' + output_str;

    
    // The CSS/JS to return
    let css_output = '<!-- GMLsnip.com CSS begin -->\n<style>' + append_stylesheet + '</style>\n<!-- GMLsnip.com CSS end -->\n\n<!-- GMLsnip.com JS begin -->\n<script>function gm_clipboard(n){' + append_js + '} function gz_copy_refr(){' + append_js2 + '}' + "window.addEventListener('DOMContentLoaded', (event) => { gz_copy_refr(); });" + '<\/script>\n<!-- GMLsnip.com JS end -->';
    
    // The HTML to return
    let html_out = '<!-- GMLsnip.com codeblock begin -->\n<div id="gz_capsule_' + UID + '" class="gz_cls_snippet">' + HTML + '</div></div>\n<!-- GMLsnip.com codeblock end -->';

    // Return the HTML and CSS/JS
    return {
        return_css: css_output,
        return_html: html_out
    }
}

/**
 * Appends additional CSS and JS to the body of the page.
 */
function gm_style() {
    let sty = document.createElement("style");
    sty.id = 'gz_dev_css';
    sty.type = "text/css";
    sty.innerHTML = append_stylesheet;
    document.body.appendChild(sty);
}

/**
 * Truncates a string and adds ellipsis if length exceeds arg0
 * @author  Kooilnc <https://stackoverflow.com/a/1199420>
 *
 * @param {real}    n  Max length of a string before truncating
 */
String.prototype.trunc = String.prototype.trunc || function(n) {
  return (this.length > n) ? this.substr(0, n-1) + '&hellip;' : this;
};