/**
 * Created by liuxinxin on 2017/7/3.
 */
function hasClass(el, className) {
    var classNames = el.className,
        reg;

    if(!className) {
        return false;
    }
    reg = new RegExp(' ' + className.trim() + ' ', 'g');
    if(reg.test(' ' + classNames + ' ')){
        return true;
    }
    return false;
}

function parent(el, selector) {
    var p,
        char,
        strategy;

    p = el.parentNode;
    if(selector && typeof selector === 'string'){
        //selector只支持三种基本选择器
        strategy = {
            '#': function(element, id) {
                return element.id === id;
            },
            '.': hasClass,
            'default': function(element, tagName) {
                return element.tagName.toLowerCase() === tagName.toLowerCase();
            }
        };
        char = selector.charAt(0);
        if(char === '#' || char === '.'){
            selector = selector.substr(1);
        }else{
            char = 'default';
        }
    }
    while(p){
        if(p.nodeType === 1){
            if(!strategy || strategy[char](p, selector)){
                break;
            }
        }
        p = p.parentNode;
    }

    return p;
}

function prev(el) {
    var rs;

    rs = el.previousSibling;
    while(rs){
        if(rs.nodeType === 1){
            break;
        }
        rs = rs.previousSibling;
    }

    return rs;
}

function next(el) {
    var rs;

    rs = el.nextSibling;
    while(rs){
        if(rs.nodeType === 1){
            break;
        }
        rs = rs.nextSibling;
    }

    return rs;
}

function addClass(el, className) {
    var classList = el.className;

    el.className = (" " + classList + " " + className.trim()).trim();
}

function removeClass(el, className) {
    var classList = el.className,
        name = className.trim(),
        reg = new RegExp(name, 'g');

    if(classList.indexOf(name) > -1){
        el.className = classList.replace(reg, '');
    }
}

function css(el, styles, styleVal) {
    var styleMap,
        camelCaseReg = /([^-])[A-Z]/g,
        p;

    if(typeof styles === 'string'){
        /*if(camelCaseReg.test(p)){
            styles = p.replace(camelCaseReg, '$1-$2').toLowerCase();
        }*/
        el.style[styles] = styleVal;
    }else if(util.isObject(styles)){
        styleMap = clone(styles);
        for(p in styleMap){
            if(styleMap.hasOwnProperty(p)){
                if(camelCaseReg.test(p)){
                    styleMap[p.replace(camelCaseReg, '$1-$2').toLowerCase()] = styleMap[p];
                    delete styleMap[p];
                }
            }
        }
        styleMap = JSON.stringify(styleMap).replace(/[""''{}]/g).split(',').join(';');
        el.style.cssText = styleMap;
    }
}

function show(el) {
    if(!el){
        return;
    }
    el.style = delete el.style.display;
    if(getComputedStyle(el).display === 'none'){
        el.style.display = 'block';
    }
}

function hide(el) {
    if(!el){
        return;
    }
    el.style.display = 'none';
}

module.exports = {
    hasClass: hasClass,
    parent: parent,
    prev: prev,
    next: next,
    addClass: addClass,
    removeClass: removeClass,
    css: css,
    show: show,
    hide: hide
};