
var tip,
	tipHtml,
	position,
	Vue = require('libs/vue');

require('../css/tip.css');

//底层共用
var iBase = {
    //设置元素透明度,透明度值按IE规则计,即0~100
    SetOpacity: function(ev, v){
        ev.filters ? ev.style.filter = 'alpha(opacity=' + v + ')' : ev.style.opacity = v / 100;
    }
};
function getElementTop(element){
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null){
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}
//淡入效果(含淡入到指定透明度)
function fadeIn(elem, speed, opacity){
    /*
     * 参数说明
     * elem==>需要淡入的元素
     * speed==>淡入速度,正整数(可选)
     * opacity==>淡入到指定的透明度,0~100(可选)
     */
    var speedspeed = speed || 20,
        opacityopacity = opacity || 100,
        val = 0,
        timerId = '';
    //循环将透明值以5递增,即淡入效果

    var timerId = setInterval(function () {
        val += 5;
        if(val <= opacityopacity) {
            iBase.SetOpacity(elem, val);
        }
        else {
            clearInterval(timerId);
        }
    },speed);
}

//淡出效果(含淡出到指定透明度)
function fadeOut(elem, speed, opacity){
    /*
     * 参数说明
     * elem==>需要淡入的元素
     * speed==>淡入速度,正整数(可选)
     * opacity==>淡入到指定的透明度,0~100(可选)
     */
    var speedspeed = speed || 20,
        opacityopacity = opacity || 0,
        //初始化透明度变化值为0
        val = 100,
        //循环将透明值以5递减,即淡出效果
        timerId = '';
    //循环将透明值以5递增,即淡入效果

    var timerId = setInterval(function () {
        val -= 5;
        if(val >= 0) {
            iBase.SetOpacity(elem, val);
        }
        else {
            clearInterval(timerId);
        }
    },speed);
}

function createTipElement() {

    var div = document.createElement('div');

    tipHtml = div;

    tipHtml.style.display = 'none';

    document.body.appendChild(tipHtml);
}


function changeStyle(params) {

    var tipClassName = 'com-layer-text layer-opacity com-layer-text-'+params.position;

    tipHtml.className = tipClassName;

    tipHtml.innerHTML = params.tipText;

    position = params.position;
}

function showTip(e,params) {

    changeStyle(params);

    tipHtml.style.display = 'block';

    var event = e,

        left = event.pageX - event.offsetX,

        bottom = document.body.offsetHeight - getElementTop(event.target),
        top = getElementTop(event.target) + event.target.offsetHeight,

        tipHtmlWidth = tipHtml.offsetWidth,

        tipHtmlHeight = tipHtml.offsetHeight;


    switch(position) {

        case 'bottom':
            tipHtml.style.cssText = 'left:' + (left - 10) + 'px;bottom:' + (bottom + 12) + 'px;';
            break;

        case 'top':
            tipHtml.style.cssText = 'left:' + left +'px;top:' + (top + 12) + 'px;';
            break;

        case 'left':

            tipHtml.style.left = left+event.target.offsetWidth+12+'px';

            tipHtml.style.top = top-tipHtmlHeight/2+12+'px';

            break;

        case 'right':

            tipHtml.style.left = left-tipHtmlWidth-12+'px';

            tipHtml.style.top = top-tipHtmlHeight/2+12+'px';

            break;
    }

    fadeIn(tipHtml,10,100);
}

function hideTip() {

    fadeOut(tipHtml,10,0);

    tipHtml.style.display = 'none';
}

createTipElement();

Vue.directive('tip',function (el,binding) {

    tip = el;

    tipHtml.innerHTML = binding.value.tipText;
    
    el.addEventListener('mouseover',function(event){showTip(event, binding.value)},false);

    el.addEventListener('mouseout',hideTip,false);
});