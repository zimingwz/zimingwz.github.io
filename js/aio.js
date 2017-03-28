;/*!js/clipboard.min.js*/
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.Clipboard=e()}}(function(){var e;return function t(e,n,r){function o(a,u){if(!n[a]){if(!e[a]){var c="function"==typeof require&&require;if(!u&&c)return c(a,!0);if(i)return i(a,!0);var s=new Error("Cannot find module '"+a+"'");throw s.code="MODULE_NOT_FOUND",s}var l=n[a]={exports:{}};e[a][0].call(l.exports,function(t){var n=e[a][1][t];return o(n?n:t)},l,l.exports,t,e,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(e,t){function n(e,t){for(;e&&e.nodeType!==r;){if(e.matches(t))return e;e=e.parentNode}}var r=9;if("undefined"!=typeof Element&&!Element.prototype.matches){var o=Element.prototype;o.matches=o.matchesSelector||o.mozMatchesSelector||o.msMatchesSelector||o.oMatchesSelector||o.webkitMatchesSelector}t.exports=n},{}],2:[function(e,t){function n(e,t,n,o,i){var a=r.apply(this,arguments);return e.addEventListener(n,a,i),{destroy:function(){e.removeEventListener(n,a,i)}}}function r(e,t,n,r){return function(n){n.delegateTarget=o(n.target,t),n.delegateTarget&&r.call(e,n)}}var o=e("./closest");t.exports=n},{"./closest":1}],3:[function(e,t,n){n.node=function(e){return void 0!==e&&e instanceof HTMLElement&&1===e.nodeType},n.nodeList=function(e){var t=Object.prototype.toString.call(e);return void 0!==e&&("[object NodeList]"===t||"[object HTMLCollection]"===t)&&"length"in e&&(0===e.length||n.node(e[0]))},n.string=function(e){return"string"==typeof e||e instanceof String},n.fn=function(e){var t=Object.prototype.toString.call(e);return"[object Function]"===t}},{}],4:[function(e,t){function n(e,t,n){if(!e&&!t&&!n)throw new Error("Missing required arguments");if(!a.string(t))throw new TypeError("Second argument must be a String");if(!a.fn(n))throw new TypeError("Third argument must be a Function");if(a.node(e))return r(e,t,n);if(a.nodeList(e))return o(e,t,n);if(a.string(e))return i(e,t,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function r(e,t,n){return e.addEventListener(t,n),{destroy:function(){e.removeEventListener(t,n)}}}function o(e,t,n){return Array.prototype.forEach.call(e,function(e){e.addEventListener(t,n)}),{destroy:function(){Array.prototype.forEach.call(e,function(e){e.removeEventListener(t,n)})}}}function i(e,t,n){return u(document.body,e,t,n)}var a=e("./is"),u=e("delegate");t.exports=n},{"./is":3,delegate:2}],5:[function(e,t){function n(e){var t;if("SELECT"===e.nodeName)e.focus(),t=e.value;else if("INPUT"===e.nodeName||"TEXTAREA"===e.nodeName){var n=e.hasAttribute("readonly");n||e.setAttribute("readonly",""),e.select(),e.setSelectionRange(0,e.value.length),n||e.removeAttribute("readonly"),t=e.value}else{e.hasAttribute("contenteditable")&&e.focus();var r=window.getSelection(),o=document.createRange();o.selectNodeContents(e),r.removeAllRanges(),r.addRange(o),t=r.toString()}return t}t.exports=n},{}],6:[function(e,t){function n(){}n.prototype={on:function(e,t,n){var r=this.e||(this.e={});return(r[e]||(r[e]=[])).push({fn:t,ctx:n}),this},once:function(e,t,n){function r(){o.off(e,r),t.apply(n,arguments)}var o=this;return r._=t,this.on(e,r,n)},emit:function(e){var t=[].slice.call(arguments,1),n=((this.e||(this.e={}))[e]||[]).slice(),r=0,o=n.length;for(r;o>r;r++)n[r].fn.apply(n[r].ctx,t);return this},off:function(e,t){var n=this.e||(this.e={}),r=n[e],o=[];if(r&&t)for(var i=0,a=r.length;a>i;i++)r[i].fn!==t&&r[i].fn._!==t&&o.push(r[i]);return o.length?n[e]=o:delete n[e],this}},t.exports=n},{}],7:[function(t,n,r){!function(o,i){if("function"==typeof e&&e.amd)e(["module","select"],i);else if("undefined"!=typeof r)i(n,t("select"));else{var a={exports:{}};i(a,o.select),o.clipboardAction=a.exports}}(this,function(e,t){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=n(t),i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=function(){function e(t){r(this,e),this.resolveOptions(t),this.initSelection()}return a(e,[{key:"resolveOptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=e.action,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var e=this,t="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return e.removeFake()},this.fakeHandler=document.body.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[t?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,document.body.appendChild(this.fakeElem),this.selectedText=o.default(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(document.body.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(document.body.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=o.default(this.target),this.copyText()}},{key:"copyText",value:function(){var e=void 0;try{e=document.execCommand(this.action)}catch(t){e=!1}this.handleResult(e)}},{key:"handleResult",value:function(e){this.emitter.emit(e?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.target&&this.target.blur(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(e){if(void 0!==e){if(!e||"object"!==("undefined"==typeof e?"undefined":i(e))||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&e.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(e.hasAttribute("readonly")||e.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=e}},get:function(){return this._target}}]),e}();e.exports=u})},{select:5}],8:[function(t,n,r){!function(o,i){if("function"==typeof e&&e.amd)e(["module","./clipboard-action","tiny-emitter","good-listener"],i);else if("undefined"!=typeof r)i(n,t("./clipboard-action"),t("tiny-emitter"),t("good-listener"));else{var a={exports:{}};i(a,o.clipboardAction,o.tinyEmitter,o.goodListener),o.clipboard=a.exports}}(this,function(e,t,n,r){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function c(e,t){var n="data-clipboard-"+e;return t.hasAttribute(n)?t.getAttribute(n):void 0}var s=o(t),l=o(n),f=o(r),d=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),h=function(e){function t(e,n){i(this,t);var r=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return r.resolveOptions(n),r.listenClick(e),r}return u(t,e),d(t,[{key:"resolveOptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText}},{key:"listenClick",value:function(e){var t=this;this.listener=f.default(e,"click",function(e){return t.onClick(e)})}},{key:"onClick",value:function(e){var t=e.delegateTarget||e.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new s.default({action:this.action(t),target:this.target(t),text:this.text(t),trigger:t,emitter:this})}},{key:"defaultAction",value:function(e){return c("action",e)}},{key:"defaultTarget",value:function(e){var t=c("target",e);return t?document.querySelector(t):void 0}},{key:"defaultText",value:function(e){return c("text",e)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],t="string"==typeof e?[e]:e,n=!!document.queryCommandSupported;return t.forEach(function(e){n=n&&!!document.queryCommandSupported(e)}),n}}]),t}(l.default);e.exports=h})},{"./clipboard-action":7,"good-listener":4,"tiny-emitter":6}]},{},[8])(8)});
;/*!js/index.js*/
function setColor(e,s,a){var t=e.parents(".text");if("color"==a)switch(s){case 1:0==bgcolor?t.css(a,"#000"):t.css(a,"#fff"),setValue(t,a,"00");break;case 2:t.css(a,"#000000"),setValue(t,a,"30");break;case 3:t.css(a,"#97080e"),setValue(t,a,"31");break;case 4:t.css(a,"#23a326"),setValue(t,a,"32");break;case 5:t.css(a,"#9a9728"),setValue(t,a,"33");break;case 6:t.css(a,"#0021ad"),setValue(t,a,"34");break;case 7:t.css(a,"#af25ae"),setValue(t,a,"35");break;case 8:t.css(a,"#19a6b1"),setValue(t,a,"36");break;case 9:t.css(a,"#bfbfbf"),setValue(t,a,"37")}else switch(s){case 1:0==bgcolor?t.css(a,"#fff"):t.css(a,"#000"),setValue(t,a,"00");break;case 2:t.css(a,"#000000"),setValue(t,a,"40");break;case 3:t.css(a,"#97080e"),setValue(t,a,"41");break;case 4:t.css(a,"#23a326"),setValue(t,a,"42");break;case 5:t.css(a,"#9a9728"),setValue(t,a,"43");break;case 6:t.css(a,"#0021ad"),setValue(t,a,"44");break;case 7:t.css(a,"#af25ae"),setValue(t,a,"45");break;case 8:t.css(a,"#19a6b1"),setValue(t,a,"46");break;case 9:t.css(a,"#bfbfbf"),setValue(t,a,"47")}}function setValue(e,s,a){if("color"==s){var t=e.attr("value").substr(2);e.attr("value",a+t)}else{var t=e.attr("value").substr(0,2);e.attr("value",t+a)}}function showPs1(){var e=$("#ps1 li"),s="",a="",t="0000",o=!1,l=[];l.hostname="\\h",l.dir="\\W",l.fdir="\\w",l.username="\\u",l.prompt="\\$",l.date="\\d",l.time24="\\t",l.time12="\\T",l.time="\\A",l.count="\\#";for(var i=0;i<e.length;i++){var c="";if(a=e.eq(i).attr("value"),a!=t&&"0000"!=a){var r=a.substr(0,2),n=a.substr(2);c="00"!=r&&"00"!=n?"\\e["+r+";"+n+"m":"00"!=r?"\\e["+r+"m":"\\e["+n+"m",o=!0,t=a,s+=c,c=""}else a==t&&"0000"!=a?(s=s.slice(0,-5),o=!0,t=a,s+=c,c=""):a!=t&&"0000"==a&&(t=a);var p=e.eq(i).attr("id"),u=e.eq(i).text();void 0!==p?(p=p.substr(5),c+=l[p]):c+=u,o&&(c+="\\e[0m",o=!1),s+=c}return"export PS1='"+s+" '"}$(function(){$("#ps1").sortable(),$("#ps1").disableSelection(),$(".select>ul>li").controlgroup({direction:"vertical"}),$("#dialog-message").dialog({autoOpen:!1,modal:!0,width:800,buttons:{"关闭":function(){$(this).dialog("close")}}})});var bgcolor=0,x="",y="";$(window).ready(function(){$("html,body").css("display","block");for(var e=!1,s="",a=0;23>a;a++)s+='<span class="odd"></span><span class="even"></span>';var t='<span></span><div class="panel"><ul class="font-color"><li>文字</li><li>'+s+'</li> <li></li> <li></li> <li></li> <li></li> <li></li> <li></li> <li></li> <li></li> </ul> <ul class="font-bg-color"> <li>背景</li> <li>'+s+'</li><li></li><li></li><li></li> <li></li> <li></li> <li></li> <li></li> <li></li> </ul> <b class="panel-del">删</b><b class="panel-close">关</b> </div>';$("#ps1").on("click",".text",function(e){e.stopPropagation()}),$("#ps1").on("mouseover",".text",function(){$("#ps1>li").css("border","1px dotted #90bf92")}),$("#ps1").on("mouseout",".text",function(){$("#ps1>li").css("border","1px dotted transparent")}),$("#ps1").on("mousedown",".text",function(s){e=!1,x=s.pageX,y=s.pageY,$("#ps1>li").css("border","1px dotted red")}),$("#ps1").on("mouseup",".text",function(e){x=Math.abs(e.pageX-x),y=Math.abs(e.pageY-y),3>x+y&&($(".panel").prev().remove(),$(".text").css("box-shadow","0 0 0 red"),$(".panel").remove(),$(this).append(t),$(this).css("box-shadow","0 0 2px red")),$("#ps1>li").css("border","1px dotted transparent")}),$("#ps1").on("mouseover",".panel",function(e){e.stopPropagation()}),$("#ps1").on("mousedown",".panel",function(e){e.stopPropagation()}),$("#ps1").on("click",".panel",function(e){e.stopPropagation()}),$("#ps1").on("click",".font-color>li",function(e){setColor($(this),$(this).index(),"color"),e.stopPropagation()}),$("#ps1").on("click",".font-bg-color>li",function(e){setColor($(this),$(this).index(),"background-color"),e.stopPropagation()}),$("#ps1").on("click",".panel-close",function(e){$(this).parents(".panel").prev().remove(),$(this).parents(".panel").remove(),$(".text").css("box-shadow","0 0 0 red"),e.stopPropagation()}),$("#ps1").on("click",".panel-del",function(e){var s=$(this).parents(".text"),a=s.attr("id");a?$("#"+a.substring(5)).trigger("click"):s.remove(),e.stopPropagation()}),$("#radio-0").click(function(){$(".terminal").css({color:"#000","background-color":"#FFF"}),bgcolor=0}),$("#radio-1").click(function(){$(".terminal").css({color:"#fff","background-color":"#000"}),bgcolor=1}),$(".select input[type=checkbox]").click(function(){var e=$(this).attr("id"),s="show-"+e,a=$(this).attr("name");$(this).is(":checked")?$("#ps1").append('<li class="text" id='+s+' value="0000">'+a+"</li>"):$("#"+s).remove()}),$(".input-btn").click(function(){var e=$(this).prev().val().trim();e=""==e?"&nbsp;":e,$("#ps1").append('<li class="text" value="0000">'+e+"</li>"),$(this).prev().val("")}),$(".container").click(function(){$(".panel").prev().remove(),$(".text").css("box-shadow","0 0 0 red"),$(".panel").remove()}),$(".build-ps1").click(function(){$(".panel").prev().remove(),$(".panel").remove(),$("#dialog-message").dialog("open"),$("#dialog-message>p").text(showPs1());var e=showPs1();$(this).attr("data-clipboard-text",e);new Clipboard(".build-ps1")})});