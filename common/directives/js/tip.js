
var tip,
	tipHtml,
	position,
	Vue = require('libs/vue');

require('../css/tip.css');

function createTipElement() {

	var div = document.createElement('div');

	tipHtml = div;

	document.body.appendChild(tipHtml);
}	


function changeStyle(params) {

	var tipClassName = 'com-layer-text dn  com-layer-text-'+params.position;

	tipHtml.className = tipClassName;

	tipHtml.innerHTML = params.tipText;

	position = params.position;
}

function showTip(params) {

	changeStyle(params);

	var event = window.event;

	var left = event.pageX - event.offsetX;

	var top = event.pageY- event.offsetY;

	tipHtml.style.display = 'block';

	var tipHtmlWidth = tipHtml.offsetWidth; 

	var tipHtmlHeight = tipHtml.offsetHeight; 

	switch(position) {

		case 'bottom':

			tipHtml.style.left = left-10+'px';

			tipHtml.style.top = top-tipHtmlHeight-12+'px';

			break;

		case 'top':

			tipHtml.style.left = left+'px';

			tipHtml.style.top = top+event.target.offsetHeight+12+'px';

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

}

function hideTip() {

	tipHtml.style.display = 'none';
}

createTipElement();

Vue.directive('tip',{

	bind(el, binding) { //父节点还没有生成

		tip = el;

		el.addEventListener('mouseover',function(){showTip(binding.value)},false);

		el.addEventListener('mouseout',hideTip,false);
	},
	unbind(el) {

		el.removeEventListener('mouseover');

		el.removeEventListener('mouseout');
	}

});