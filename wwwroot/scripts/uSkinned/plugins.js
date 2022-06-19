// Author: uSkinned
// License: uSkinned Commercial License (https://uSkinned.net/license)

// Lazysizes
/*! lazysizes - v4.1.4 - ls.respimg.min.js */
!function(a,b){var c=function(){b(a.lazySizes),a.removeEventListener("lazyunveilread",c,!0)};b=b.bind(null,a,a.document),"object"==typeof module&&module.exports?b(require("lazysizes"),require("../fix-ios-sizes/fix-ios-sizes")):a.lazySizes?c():a.addEventListener("lazyunveilread",c,!0)}(window,function(a,b,c){"use strict";var d,e=c&&c.cfg||a.lazySizesConfig,f=b.createElement("img"),g="sizes"in f&&"srcset"in f,h=/\s+\d+h/g,i=function(){var a=/\s+(\d+)(w|h)\s+(\d+)(w|h)/,c=Array.prototype.forEach;return function(){var d=b.createElement("img"),e=function(b){var c,d,e=b.getAttribute(lazySizesConfig.srcsetAttr);e&&((d=e.match(a))&&(c="w"==d[2]?d[1]/d[3]:d[3]/d[1],c&&b.setAttribute("data-aspectratio",c)),b.setAttribute(lazySizesConfig.srcsetAttr,e.replace(h,"")))},f=function(a){var b=a.target.parentNode;b&&"PICTURE"==b.nodeName&&c.call(b.getElementsByTagName("source"),e),e(a.target)},g=function(){d.currentSrc&&b.removeEventListener("lazybeforeunveil",f)};b.addEventListener("lazybeforeunveil",f),d.onload=g,d.onerror=g,d.srcset="data:,a 1w 1h",d.complete&&g()}}();if(e||(e={},a.lazySizesConfig=e),e.supportsType||(e.supportsType=function(a){return!a}),!a.picturefill&&!e.pf){if(a.HTMLPictureElement&&g)return b.msElementsFromPoint&&i(navigator.userAgent.match(/Edge\/(\d+)/)),void(e.pf=function(){});e.pf=function(b){var c,e;if(!a.picturefill)for(c=0,e=b.elements.length;e>c;c++)d(b.elements[c])},d=function(){var f=function(a,b){return a.w-b.w},i=/^\s*\d+\.*\d*px\s*$/,j=function(a){var b,c,d=a.length,e=a[d-1],f=0;for(f;d>f;f++)if(e=a[f],e.d=e.w/a.w,e.d>=a.d){!e.cached&&(b=a[f-1])&&b.d>a.d-.13*Math.pow(a.d,2.2)&&(c=Math.pow(b.d-.6,1.6),b.cached&&(b.d+=.15*c),b.d+(e.d-a.d)*c>a.d&&(e=b));break}return e},k=function(){var a,b=/(([^,\s].[^\s]+)\s+(\d+)w)/g,c=/\s/,d=function(b,c,d,e){a.push({c:c,u:d,w:1*e})};return function(e){return a=[],e=e.trim(),e.replace(h,"").replace(b,d),a.length||!e||c.test(e)||a.push({c:e,u:e,w:99}),a}}(),l=function(){l.init||(l.init=!0,addEventListener("resize",function(){var a,c=b.getElementsByClassName("lazymatchmedia"),e=function(){var a,b;for(a=0,b=c.length;b>a;a++)d(c[a])};return function(){clearTimeout(a),a=setTimeout(e,66)}}()))},m=function(b,d){var f,g=b.getAttribute("srcset")||b.getAttribute(e.srcsetAttr);!g&&d&&(g=b._lazypolyfill?b._lazypolyfill._set:b.getAttribute(e.srcAttr)||b.getAttribute("src")),b._lazypolyfill&&b._lazypolyfill._set==g||(f=k(g||""),d&&b.parentNode&&(f.isPicture="PICTURE"==b.parentNode.nodeName.toUpperCase(),f.isPicture&&a.matchMedia&&(c.aC(b,"lazymatchmedia"),l())),f._set=g,Object.defineProperty(b,"_lazypolyfill",{value:f,writable:!0}))},n=function(b){var d=a.devicePixelRatio||1,e=c.getX&&c.getX(b);return Math.min(e||d,2.5,d)},o=function(b){return a.matchMedia?(o=function(a){return!a||(matchMedia(a)||{}).matches})(b):!b},p=function(a){var b,d,g,h,k,l,p;if(h=a,m(h,!0),k=h._lazypolyfill,k.isPicture)for(d=0,b=a.parentNode.getElementsByTagName("source"),g=b.length;g>d;d++)if(e.supportsType(b[d].getAttribute("type"),a)&&o(b[d].getAttribute("media"))){h=b[d],m(h),k=h._lazypolyfill;break}return k.length>1?(p=h.getAttribute("sizes")||"",p=i.test(p)&&parseInt(p,10)||c.gW(a,a.parentNode),k.d=n(a),!k.src||!k.w||k.w<p?(k.w=p,l=j(k.sort(f)),k.src=l):l=k.src):l=k[0],l},q=function(a){if(!g||!a.parentNode||"PICTURE"==a.parentNode.nodeName.toUpperCase()){var b=p(a);b&&b.u&&a._lazypolyfill.cur!=b.u&&(a._lazypolyfill.cur=b.u,b.cached=!0,a.setAttribute(e.srcAttr,b.u),a.setAttribute("src",b.u))}};return q.parse=k,q}(),e.loadedClass&&e.loadingClass&&!function(){var a=[];['img[sizes$="px"][srcset].',"picture > img:not([srcset])."].forEach(function(b){a.push(b+e.loadedClass),a.push(b+e.loadingClass)}),e.pf({elements:b.querySelectorAll(a.join(", "))})}()}});
/*! lazysizes - v4.1.2 - ls.bgset.min.js */
!function(a,b){var c=function(){b(a.lazySizes),a.removeEventListener("lazyunveilread",c,!0)};b=b.bind(null,a,a.document),"object"==typeof module&&module.exports?b(require("lazysizes")):a.lazySizes?c():a.addEventListener("lazyunveilread",c,!0)}(window,function(a,b,c){"use strict";if(a.addEventListener){var d=/\s+/g,e=/\s*\|\s+|\s+\|\s*/g,f=/^(.+?)(?:\s+\[\s*(.+?)\s*\])(?:\s+\[\s*(.+?)\s*\])?$/,g=/^\s*\(*\s*type\s*:\s*(.+?)\s*\)*\s*$/,h=/\(|\)|'/,i={contain:1,cover:1},j=function(a){var b=c.gW(a,a.parentNode);return(!a._lazysizesWidth||b>a._lazysizesWidth)&&(a._lazysizesWidth=b),a._lazysizesWidth},k=function(a){var b;return b=(getComputedStyle(a)||{getPropertyValue:function(){}}).getPropertyValue("background-size"),!i[b]&&i[a.style.backgroundSize]&&(b=a.style.backgroundSize),b},l=function(a,b){if(b){var c=b.match(g);c&&c[1]?a.setAttribute("type",c[1]):a.setAttribute("media",lazySizesConfig.customMedia[b]||b)}},m=function(a,c,g){var h=b.createElement("picture"),i=c.getAttribute(lazySizesConfig.sizesAttr),j=c.getAttribute("data-ratio"),k=c.getAttribute("data-optimumx");c._lazybgset&&c._lazybgset.parentNode==c&&c.removeChild(c._lazybgset),Object.defineProperty(g,"_lazybgset",{value:c,writable:!0}),Object.defineProperty(c,"_lazybgset",{value:h,writable:!0}),a=a.replace(d," ").split(e),h.style.display="none",g.className=lazySizesConfig.lazyClass,1!=a.length||i||(i="auto"),a.forEach(function(a){var c,d=b.createElement("source");i&&"auto"!=i&&d.setAttribute("sizes",i),(c=a.match(f))?(d.setAttribute(lazySizesConfig.srcsetAttr,c[1]),l(d,c[2]),l(d,c[3])):d.setAttribute(lazySizesConfig.srcsetAttr,a),h.appendChild(d)}),i&&(g.setAttribute(lazySizesConfig.sizesAttr,i),c.removeAttribute(lazySizesConfig.sizesAttr),c.removeAttribute("sizes")),k&&g.setAttribute("data-optimumx",k),j&&g.setAttribute("data-ratio",j),h.appendChild(g),c.appendChild(h)},n=function(a){if(a.target._lazybgset){var b=a.target,d=b._lazybgset,e=b.currentSrc||b.src;if(e){var f=c.fire(d,"bgsetproxy",{src:e,useSrc:h.test(e)?JSON.stringify(e):e});f.defaultPrevented||(d.style.backgroundImage="url("+f.detail.useSrc+")")}b._lazybgsetLoading&&(c.fire(d,"_lazyloaded",{},!1,!0),delete b._lazybgsetLoading)}};addEventListener("lazybeforeunveil",function(a){var d,e,f;!a.defaultPrevented&&(d=a.target.getAttribute("data-bgset"))&&(f=a.target,e=b.createElement("img"),e.alt="",e._lazybgsetLoading=!0,a.detail.firesLoad=!0,m(d,f,e),setTimeout(function(){c.loader.unveil(e),c.rAF(function(){c.fire(e,"_lazyloaded",{},!0,!0),e.complete&&n({target:e})})}))}),b.addEventListener("load",n,!0),a.addEventListener("lazybeforesizes",function(a){if(a.detail.instance==c&&a.target._lazybgset&&a.detail.dataAttr){var b=a.target._lazybgset,d=k(b);i[d]&&(a.target._lazysizesParentFit=d,c.rAF(function(){a.target.setAttribute("data-parent-fit",d),a.target._lazysizesParentFit&&delete a.target._lazysizesParentFit}))}},!0),b.documentElement.addEventListener("lazybeforesizes",function(a){!a.defaultPrevented&&a.target._lazybgset&&a.detail.instance==c&&(a.detail.width=j(a.target._lazybgset))})}});
/*! lazysizes - v4.1.2 - lazysizes.min.js */
!function(a,b){var c=b(a,a.document);a.lazySizes=c,"object"==typeof module&&module.exports&&(module.exports=c)}(window,function(a,b){"use strict";if(b.getElementsByClassName){var c,d,e=b.documentElement,f=a.Date,g=a.HTMLPictureElement,h="addEventListener",i="getAttribute",j=a[h],k=a.setTimeout,l=a.requestAnimationFrame||k,m=a.requestIdleCallback,n=/^picture$/i,o=["load","error","lazyincluded","_lazyloaded"],p={},q=Array.prototype.forEach,r=function(a,b){return p[b]||(p[b]=new RegExp("(\\s|^)"+b+"(\\s|$)")),p[b].test(a[i]("class")||"")&&p[b]},s=function(a,b){r(a,b)||a.setAttribute("class",(a[i]("class")||"").trim()+" "+b)},t=function(a,b){var c;(c=r(a,b))&&a.setAttribute("class",(a[i]("class")||"").replace(c," "))},u=function(a,b,c){var d=c?h:"removeEventListener";c&&u(a,b),o.forEach(function(c){a[d](c,b)})},v=function(a,d,e,f,g){var h=b.createEvent("CustomEvent");return e||(e={}),e.instance=c,h.initCustomEvent(d,!f,!g,e),a.dispatchEvent(h),h},w=function(b,c){var e;!g&&(e=a.picturefill||d.pf)?(c&&c.src&&!b[i]("srcset")&&b.setAttribute("srcset",c.src),e({reevaluate:!0,elements:[b]})):c&&c.src&&(b.src=c.src)},x=function(a,b){return(getComputedStyle(a,null)||{})[b]},y=function(a,b,c){for(c=c||a.offsetWidth;c<d.minSize&&b&&!a._lazysizesWidth;)c=b.offsetWidth,b=b.parentNode;return c},z=function(){var a,c,d=[],e=[],f=d,g=function(){var b=f;for(f=d.length?e:d,a=!0,c=!1;b.length;)b.shift()();a=!1},h=function(d,e){a&&!e?d.apply(this,arguments):(f.push(d),c||(c=!0,(b.hidden?k:l)(g)))};return h._lsFlush=g,h}(),A=function(a,b){return b?function(){z(a)}:function(){var b=this,c=arguments;z(function(){a.apply(b,c)})}},B=function(a){var b,c=0,e=d.throttleDelay,g=d.ricTimeout,h=function(){b=!1,c=f.now(),a()},i=m&&g>49?function(){m(h,{timeout:g}),g!==d.ricTimeout&&(g=d.ricTimeout)}:A(function(){k(h)},!0);return function(a){var d;(a=a===!0)&&(g=33),b||(b=!0,d=e-(f.now()-c),0>d&&(d=0),a||9>d?i():k(i,d))}},C=function(a){var b,c,d=99,e=function(){b=null,a()},g=function(){var a=f.now()-c;d>a?k(g,d-a):(m||e)(e)};return function(){c=f.now(),b||(b=k(g,d))}};!function(){var b,c={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:0,throttleDelay:125};d=a.lazySizesConfig||a.lazysizesConfig||{};for(b in c)b in d||(d[b]=c[b]);a.lazySizesConfig=d,k(function(){d.init&&F()})}();var D=function(){var g,l,m,o,p,y,D,F,G,H,I,J,K,L,M=/^img$/i,N=/^iframe$/i,O="onscroll"in a&&!/(gle|ing)bot/.test(navigator.userAgent),P=0,Q=0,R=0,S=-1,T=function(a){R--,a&&a.target&&u(a.target,T),(!a||0>R||!a.target)&&(R=0)},U=function(a,c){var d,f=a,g="hidden"==x(b.body,"visibility")||"hidden"!=x(a.parentNode,"visibility")&&"hidden"!=x(a,"visibility");for(F-=c,I+=c,G-=c,H+=c;g&&(f=f.offsetParent)&&f!=b.body&&f!=e;)g=(x(f,"opacity")||1)>0,g&&"visible"!=x(f,"overflow")&&(d=f.getBoundingClientRect(),g=H>d.left&&G<d.right&&I>d.top-1&&F<d.bottom+1);return g},V=function(){var a,f,h,j,k,m,n,p,q,r=c.elements;if((o=d.loadMode)&&8>R&&(a=r.length)){f=0,S++,null==K&&("expand"in d||(d.expand=e.clientHeight>500&&e.clientWidth>500?500:370),J=d.expand,K=J*d.expFactor),K>Q&&1>R&&S>2&&o>2&&!b.hidden?(Q=K,S=0):Q=o>1&&S>1&&6>R?J:P;for(;a>f;f++)if(r[f]&&!r[f]._lazyRace)if(O)if((p=r[f][i]("data-expand"))&&(m=1*p)||(m=Q),q!==m&&(y=innerWidth+m*L,D=innerHeight+m,n=-1*m,q=m),h=r[f].getBoundingClientRect(),(I=h.bottom)>=n&&(F=h.top)<=D&&(H=h.right)>=n*L&&(G=h.left)<=y&&(I||H||G||F)&&(d.loadHidden||"hidden"!=x(r[f],"visibility"))&&(l&&3>R&&!p&&(3>o||4>S)||U(r[f],m))){if(ba(r[f]),k=!0,R>9)break}else!k&&l&&!j&&4>R&&4>S&&o>2&&(g[0]||d.preloadAfterLoad)&&(g[0]||!p&&(I||H||G||F||"auto"!=r[f][i](d.sizesAttr)))&&(j=g[0]||r[f]);else ba(r[f]);j&&!k&&ba(j)}},W=B(V),X=function(a){s(a.target,d.loadedClass),t(a.target,d.loadingClass),u(a.target,Z),v(a.target,"lazyloaded")},Y=A(X),Z=function(a){Y({target:a.target})},$=function(a,b){try{a.contentWindow.location.replace(b)}catch(c){a.src=b}},_=function(a){var b,c=a[i](d.srcsetAttr);(b=d.customMedia[a[i]("data-media")||a[i]("media")])&&a.setAttribute("media",b),c&&a.setAttribute("srcset",c)},aa=A(function(a,b,c,e,f){var g,h,j,l,o,p;(o=v(a,"lazybeforeunveil",b)).defaultPrevented||(e&&(c?s(a,d.autosizesClass):a.setAttribute("sizes",e)),h=a[i](d.srcsetAttr),g=a[i](d.srcAttr),f&&(j=a.parentNode,l=j&&n.test(j.nodeName||"")),p=b.firesLoad||"src"in a&&(h||g||l),o={target:a},p&&(u(a,T,!0),clearTimeout(m),m=k(T,2500),s(a,d.loadingClass),u(a,Z,!0)),l&&q.call(j.getElementsByTagName("source"),_),h?a.setAttribute("srcset",h):g&&!l&&(N.test(a.nodeName)?$(a,g):a.src=g),f&&(h||l)&&w(a,{src:g})),a._lazyRace&&delete a._lazyRace,t(a,d.lazyClass),z(function(){(!p||a.complete&&a.naturalWidth>1)&&(p?T(o):R--,X(o))},!0)}),ba=function(a){var b,c=M.test(a.nodeName),e=c&&(a[i](d.sizesAttr)||a[i]("sizes")),f="auto"==e;(!f&&l||!c||!a[i]("src")&&!a.srcset||a.complete||r(a,d.errorClass)||!r(a,d.lazyClass))&&(b=v(a,"lazyunveilread").detail,f&&E.updateElem(a,!0,a.offsetWidth),a._lazyRace=!0,R++,aa(a,b,f,e,c))},ca=function(){if(!l){if(f.now()-p<999)return void k(ca,999);var a=C(function(){d.loadMode=3,W()});l=!0,d.loadMode=3,W(),j("scroll",function(){3==d.loadMode&&(d.loadMode=2),a()},!0)}};return{_:function(){p=f.now(),c.elements=b.getElementsByClassName(d.lazyClass),g=b.getElementsByClassName(d.lazyClass+" "+d.preloadClass),L=d.hFac,j("scroll",W,!0),j("resize",W,!0),a.MutationObserver?new MutationObserver(W).observe(e,{childList:!0,subtree:!0,attributes:!0}):(e[h]("DOMNodeInserted",W,!0),e[h]("DOMAttrModified",W,!0),setInterval(W,999)),j("hashchange",W,!0),["focus","mouseover","click","load","transitionend","animationend","webkitAnimationEnd"].forEach(function(a){b[h](a,W,!0)}),/d$|^c/.test(b.readyState)?ca():(j("load",ca),b[h]("DOMContentLoaded",W),k(ca,2e4)),c.elements.length?(V(),z._lsFlush()):W()},checkElems:W,unveil:ba}}(),E=function(){var a,c=A(function(a,b,c,d){var e,f,g;if(a._lazysizesWidth=d,d+="px",a.setAttribute("sizes",d),n.test(b.nodeName||""))for(e=b.getElementsByTagName("source"),f=0,g=e.length;g>f;f++)e[f].setAttribute("sizes",d);c.detail.dataAttr||w(a,c.detail)}),e=function(a,b,d){var e,f=a.parentNode;f&&(d=y(a,f,d),e=v(a,"lazybeforesizes",{width:d,dataAttr:!!b}),e.defaultPrevented||(d=e.detail.width,d&&d!==a._lazysizesWidth&&c(a,f,e,d)))},f=function(){var b,c=a.length;if(c)for(b=0;c>b;b++)e(a[b])},g=C(f);return{_:function(){a=b.getElementsByClassName(d.autosizesClass),j("resize",g)},checkElems:g,updateElem:e}}(),F=function(){F.i||(F.i=!0,E._(),D._())};return c={cfg:d,autoSizer:E,loader:D,init:F,uP:w,aC:s,rC:t,hC:r,fire:v,gW:y,rAF:z}}});
// Lazysizes END  
// // // // // // // // // // // // // // // // // // // //

// Video fill area
// http://jsfiddle.net/4dgaurav/bZrWk/2/
// http://stackoverflow.com/questions/23248441/resizing-video-element-to-parent-div
var min_w = 1600; // minimum video width allowed
var vid_w_orig; // original video dimensions
var vid_h_orig;
jQuery(function() { // runs after DOM has loaded
    vid_w_orig = parseInt(jQuery('.component.usn_cmp_banner .item.item_takeover-banner .video .video-player, .component.usn_cmp_banner .item.item_medium-banner .video .video-player, .component.usn_cmp_banner .item.item_short-banner .video .video-player').attr('width'));
    vid_h_orig = parseInt(jQuery('.component.usn_cmp_banner .item.item_takeover-banner .video .video-player, .component.usn_cmp_banner .item.item_medium-banner .video .video-player, .component.usn_cmp_banner .item.item_short-banner .video .video-player').attr('height'));
    $('#debug').append("<p>DOM loaded</p>");
    jQuery(window).resize(function() { resizeToCover(); });
    jQuery(window).trigger('resize');
});
function resizeToCover() {
    // set the video viewport to the window size
    jQuery('.component.usn_cmp_banner .item.item_takeover-banner .video, .component.usn_cmp_banner .item.item_medium-banner .video, .component.usn_cmp_banner .item.item_short-banner .video').width(jQuery(window).width());
    jQuery('.component.usn_cmp_banner .item.item_takeover-banner .video, .component.usn_cmp_banner .item.item_medium-banner .video, .component.usn_cmp_banner .item.item_short-banner .video').height(jQuery(window).height());
    // use largest scale factor of horizontal/vertical
    var scale_h = jQuery(window).width() / vid_w_orig;
    var scale_v = jQuery(window).height() / vid_h_orig;
    var scale = scale_h > scale_v ? scale_h : scale_v;
    // don't allow scaled width < minimum video width
    if (scale * vid_w_orig < min_w) { scale = min_w / vid_w_orig; };
    // now scale the video
    jQuery('.component.usn_cmp_banner .item.item_takeover-banner .video .video-player, .component.usn_cmp_banner .item.item_medium-banner .video .video-player, .component.usn_cmp_banner .item.item_short-banner .video .video-player').width(scale * vid_w_orig);
    jQuery('.component.usn_cmp_banner .item.item_takeover-banner .video .video-player, .component.usn_cmp_banner .item.item_medium-banner .video .video-player, .component.usn_cmp_banner .item.item_short-banner .video .video-player').height(scale * vid_h_orig);
    // and center it by scrolling the video viewport
    jQuery('.component.usn_cmp_banner .item.item_takeover-banner .video, .component.usn_cmp_banner .item.item_medium-banner .video, .component.usn_cmp_banner .item.item_short-banner .video').scrollLeft((jQuery('video, iframe').width() - jQuery(window).width()) / 2);
    jQuery('.component.usn_cmp_banner .item.item_takeover-banner .video, .component.usn_cmp_banner .item.item_medium-banner .video, .component.usn_cmp_banner .item.item_short-banner .video').scrollTop((jQuery('video, iframe').height() - jQuery(window).height()) / 2);
};
// Video fill area END
// // // // // // // // // // // // // // // // // // // //


// Lazyframe for Videos
// https://github.com/vb/lazyframe
!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define(t) : (e.lazyframe = t());
})(this, function () {
    "use strict";
    var e =
        Object.assign ||
        function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
            }
            return e;
        };
    return (function () {
        function t(t) {
            if (((d = e({}, m, arguments.length <= 1 ? void 0 : arguments[1])), "string" == typeof t)) for (var i = document.querySelectorAll(t), o = 0; o < i.length; o++) n(i[o]);
            else if (void 0 === t.length) n(t);
            else if (t.length > 1) for (var r = 0; r < t.length; r++) n(t[r]);
            else n(t[0]);
            d.lazyload && a();
        }
        function n(e) {
            var t = this;
            if (e instanceof HTMLElement != !1 && !e.classList.contains("lazyframe--loaded")) {
                var n = { el: e, settings: i(e) };
                n.el.addEventListener("click", function () {
                    n.el.appendChild(n.iframe);
                    var i = e.querySelectorAll("iframe");
                    n.settings.onAppend.call(t, i[0]);
                }),
                    d.lazyload ? l(n) : u(n, !!n.settings.thumbnail);
            }
        }
        function i(t) {
            var n = Array.prototype.slice
                    .apply(t.attributes)
                    .filter(function (e) {
                        return "" !== e.value;
                    })
                    .reduce(function (e, t) {
                        return (e[0 === t.name.indexOf("data-") ? t.name.split("data-")[1] : t.name] = t.value), e;
                    }, {}),
                i = e({}, d, n, { y: t.offsetTop, parameters: o(n.src) });
            if (i.vendor) {
                var r = i.src.match(p.regex[i.vendor]);
                i.id = p.condition[i.vendor](r);
            }
            return i;
        }
        function o(e) {
            var t = e.split("?");
            if (t[1]) {
                t = t[1];
                return -1 !== t.indexOf("autoplay") ? t : t + "&autoplay=1";
            }
            return "autoplay=1";
        }
        function r(e) {
            return !!e.vendor && (!e.title || !e.thumbnail) && (("youtube" !== e.vendor && "youtube_nocookie" !== e.vendor) || !!e.apikey);
        }
        function u(e) {
            var t = this;
            r(e.settings)
                ? s(e, function (n, i) {
                      if (!n) {
                          var o = i[0],
                              r = i[1];
                          if ((r.settings.title || (r.settings.title = p.response[r.settings.vendor].title(o)), !r.settings.thumbnail)) {
                              var u = p.response[r.settings.vendor].thumbnail(o);
                              (r.settings.thumbnail = u), e.settings.onThumbnailLoad.call(t, u);
                          }
                          l(r, !0);
                      }
                  })
                : l(e, !0);
        }
        function s(e, t) {
            var n = p.endpoints[e.settings.vendor](e.settings),
                i = new XMLHttpRequest();
            i.open("GET", n, !0),
                (i.onload = function () {
                    if (i.status >= 200 && i.status < 400) {
                        var n = JSON.parse(i.responseText);
                        t(null, [n, e]);
                    } else t(!0);
                }),
                (i.onerror = function () {
                    t(!0);
                }),
                i.send();
        }
        function a() {
            var e = this,
                t = window.innerHeight,
                n = f.length,
                i = function (t, i) {
                    (t.settings.initialized = !0), t.el.classList.add("lazyframe--loaded"), n--, u(t), t.settings.initinview && t.el.click(), t.settings.onLoad.call(e, t);
                };
            f.filter(function (e) {
                return e.settings.y < t;
            }).forEach(i);
            var o = (function (e, t, n) {
                    var i = void 0;
                    return function () {
                        var o = this,
                            r = arguments,
                            u = function () {
                                (i = null), n || e.apply(o, r);
                            },
                            s = n && !i;
                        clearTimeout(i), (i = setTimeout(u, t)), s && e.apply(o, r);
                    };
                })(function () {
                    (s = r < window.pageYOffset),
                        (r = window.pageYOffset),
                        s &&
                            f
                                .filter(function (e) {
                                    return e.settings.y < t + r && !1 === e.settings.initialized;
                                })
                                .forEach(i),
                        0 === n && window.removeEventListener("scroll", o, !1);
                }, d.debounce),
                r = 0,
                s = !1;
            window.addEventListener("scroll", o, !1);
        }
        function l(e, t) {
            if (((e.iframe = c(e.settings)), e.settings.thumbnail && t && (e.el.style.backgroundImage = "url(" + e.settings.thumbnail + ")"), e.settings.title && 0 === e.el.children.length)) {
                var n = document.createDocumentFragment(),
                    i = document.createElement("span");
                (i.className = "lazyframe__title"), (i.innerHTML = e.settings.title), n.appendChild(i), e.el.appendChild(n);
            }
            d.lazyload || (e.el.classList.add("lazyframe--loaded"), e.settings.onLoad.call(this, e), f.push(e)), e.settings.initialized || f.push(e);
        }
        function c(e) {
            var t = document.createDocumentFragment(),
                n = document.createElement("iframe");
            if (
                (e.vendor && (e.src = p.src[e.vendor](e)),
                n.setAttribute("id", "lazyframe-" + e.id),
                n.setAttribute("src", e.src),
                n.setAttribute("frameborder", 0),
                n.setAttribute("allowfullscreen", ""),
                n.setAttribute("allow", "autoplay;encrypted-media"),
                "vine" === e.vendor)
            ) {
                var i = document.createElement("script");
                i.setAttribute("src", "https://platform.vine.co/static/scripts/embed.js"), t.appendChild(i);
            }
            return t.appendChild(n), t;
        }
        var d = void 0,
            f = [],
            m = {
                vendor: void 0,
                id: void 0,
                src: void 0,
                thumbnail: void 0,
                title: void 0,
                apikey: void 0,
                initialized: !1,
                parameters: void 0,
                y: void 0,
                debounce: 250,
                lazyload: !0,
                initinview: !1,
                onLoad: function (e) {},
                onAppend: function (e) {},
                onThumbnailLoad: function (e) {},
            },
            p = {
                regex: {
                    youtube_nocookie: /(?:youtube-nocookie\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=)))([a-zA-Z0-9_-]{6,11})/,
                    youtube: /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/,
                    vimeo: /vimeo\.com\/(?:video\/)?([0-9]*)(?:\?|)/,
                    vine: /vine.co\/v\/(.*)/,
                },
                condition: {
                    youtube: function (e) {
                        return !(!e || 11 != e[1].length) && e[1];
                    },
                    youtube_nocookie: function (e) {
                        return !(!e || 11 != e[1].length) && e[1];
                    },
                    vimeo: function (e) {
                        return !!((e && 9 === e[1].length) || 8 === e[1].length) && e[1];
                    },
                    vine: function (e) {
                        return !(!e || 11 !== e[1].length) && e[1];
                    },
                },
                src: {
                    youtube: function (e) {
                        return "https://www.youtube.com/embed/" + e.id + "/?" + e.parameters;
                    },
                    youtube_nocookie: function (e) {
                        return "https://www.youtube-nocookie.com/embed/" + e.id + "/?" + e.parameters;
                    },
                    vimeo: function (e) {
                        return "https://player.vimeo.com/video/" + e.id + "/?" + e.parameters;
                    },
                    vine: function (e) {
                        return "https://vine.co/v/" + e.id + "/embed/simple";
                    },
                },
                endpoints: {
                    youtube: function (e) {
                        return "https://www.googleapis.com/youtube/v3/videos?id=" + e.id + "&key=" + e.apikey + "&fields=items(snippet(title,thumbnails))&part=snippet";
                    },
                    youtube_nocookie: function (e) {
                        return "https://www.googleapis.com/youtube/v3/videos?id=" + e.id + "&key=" + e.apikey + "&fields=items(snippet(title,thumbnails))&part=snippet";
                    },
                    vimeo: function (e) {
                        return "https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/" + e.id;
                    },
                    vine: function (e) {
                        return "https://vine.co/oembed.json?url=https%3A%2F%2Fvine.co%2Fv%2F" + e.id;
                    },
                },
                response: {
                    youtube: {
                        title: function (e) {
                            return e.items[0].snippet.title;
                        },
                        thumbnail: function (e) {
                            var t = e.items[0].snippet.thumbnails;
                            return (t.maxres || t.standard || t.high || t.medium || t.default).url;
                        },
                    },
                    youtube_nocookie: {
                        title: function (e) {
                            return e.items[0].snippet.title;
                        },
                        thumbnail: function (e) {
                            var t = e.items[0].snippet.thumbnails;
                            return (t.maxres || t.standard || t.high || t.medium || t.default).url;
                        },
                    },
                    vimeo: {
                        title: function (e) {
                            return e.title;
                        },
                        thumbnail: function (e) {
                            return e.thumbnail_url;
                        },
                    },
                    vine: {
                        title: function (e) {
                            return e.title;
                        },
                        thumbnail: function (e) {
                            return e.thumbnail_url;
                        },
                    },
                },
            };
        return t;
    })();
});
// Passing a selector
lazyframe('.lazyframe-video');
// Lazyframe for Videos END
// // // // // // // // // // // // // // // // // // // //


/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.Context.refreshAll();for(var e in i)i[e].enabled=!0;return this},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,n.windowContext||(n.windowContext=!0,n.windowContext=new e(window)),this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical),i=this.element==this.element.window;t&&e&&!i&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s];if(null!==a.triggerPoint){var l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var a in this.waypoints[r]){var l,h,p,u,c,d=this.waypoints[r][a],f=d.options.offset,w=d.triggerPoint,y=0,g=null==w;d.element!==d.element.window&&(y=d.adapter.offset()[s.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(s.contextDimension*f/100))),l=s.contextScroll-s.contextOffset,d.triggerPoint=Math.floor(y+l-f),h=w<s.oldScroll,p=d.triggerPoint>=s.oldScroll,u=h&&p,c=!h&&!p,!g&&u?(d.queueTrigger(s.backward),o[d.group.id]=d.group):!g&&c?(d.queueTrigger(s.forward),o[d.group.id]=d.group):g&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),o[d.group.id]=d.group)}}return n.requestAnimationFrame(function(){for(var t in o)o[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();
// Waypoints END 
// // // // // // // // // // // // // // // // // // // //

// Detect device & browser
$(window).bind('load resize', function() {

    // BROWSER CLASS
    if ( navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1 ) {
        $("body").addClass("browser-safari");
    }
    if( navigator.userAgent.indexOf("Chrome") != -1 ) {
        $("body").addClass("browser-chrome");
    }
    if( navigator.userAgent.indexOf("Edg") != -1 && navigator.userAgent.indexOf("Chrome") != -1 ) {
        $("body").removeClass("browser-chrome");
        $("body").addClass("browser-edge");
    }
    if( navigator.userAgent.indexOf("Firefox") != -1 ) {
        $("body").addClass("browser-firefox");
    }
    if ( navigator.userAgent.match(/iP(hone|od|ad)/i)) {
        $("body").removeClass("browser-safari");
        $('body').addClass('browser-ios');
    }

    // Get browser 
    $.each($.browser, function(i) {
        $('html').addClass(i);
        return false;  
    });
    // Get OS
    var os = [
        'iphone',
        'ipad',
        'windows',
        'mac',
        'linux'
    ];
    var match = navigator.appVersion.toLowerCase().match(new RegExp(os.join('|')));
    if (match) {
        $('html').addClass(match[0]);
    };

});
//Check Mobile Devices
var checkTouch = function(){
    //Check Device
    var isTouch = ('ontouchstart' in document.documentElement);
    //Check Device //All Touch Devices
    if ( isTouch ) {
        $('html').addClass('touch');
    }
    else {
        $('html').addClass('no-touch');
    };
};
checkTouch();
// Detect device & browser END
// // // // // // // // // // // // // // // // // // // //


// Improve scroll performance of animation
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
var myEfficientScroll = debounce(function() {
    // Trigger animations
    // http://www.oxygenna.com/tutorials/scroll-animations-using-waypoints-js-animate-css
    function onScrollInit(items, trigger) {
        items.each(function() {
            var osElement = $(this),
                osAnimationClass = osElement.attr('data-os-animation'),
                osAnimationDelay = osElement.attr('data-os-animation-delay'),
                osAnimationDuration = osElement.attr('data-os-animation-duration');
            osElement.css({
                '-webkit-animation-delay': osAnimationDelay,
                'animation-delay': osAnimationDelay,
                '-webkit-animation-duration': osAnimationDuration,
                'animation-duration': osAnimationDuration
            });
            var osTrigger = (trigger) ? trigger : osElement;
            osTrigger.waypoint(function() {
                osElement.addClass('animated').addClass(osAnimationClass);
            }, {
                triggerOnce: true,
                offset: '90%'
            });
        });
    }
    onScrollInit($('.os-animation'));
}, 250);
window.addEventListener('load', myEfficientScroll);
// Improve scroll performance of animation END
// // // // // // // // // // // // // // // // // // // //


// Header on scroll
var didScroll;
var lastScrollTop = 0;
var delta = 60;
var navbarHeight = $('header#site-header').outerHeight();

$(window).scroll(function(event) {
    didScroll = true;
    var scroll = $(window).scrollTop();
    if (scroll >= 60) {
        $('html').removeClass('reached-top');
    } else {
        $('html').addClass('reached-top').removeClass('nav-down').removeClass('nav-up');
    }
});
setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);
function hasScrolled() {
    var st = $(this).scrollTop();
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('html').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        $('html').addClass('nav-down').removeClass('nav-up');
    }
    lastScrollTop = st;
}
// Header on scroll END
// // // // // // // // // // // // // // // // // // // //


// Show password function
function showPasswordFunction(label) {
    var x = document.getElementById(label);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}
// Show password function END
// // // // // // // // // // // // // // // // // // // //


// Lightbox
$(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});
// Lightbox END
// // // // // // // // // // // // // // // // // // // //


// Cookie Helpers


// Get cookie
function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}
// Set cookie
function setCookie(c_name, value, expiresDays) {
    var exdate = new Date();
    if(expiresDays!=null)
        exdate.setDate(exdate.getDate() + expiresDays);
    var c_value = value + ((expiresDays == null) ? "" : "; path=/; expires=" + exdate.toUTCString());
    document.cookie = c_name + " =" + c_value; 
}
// Cookie Helpers END
// // // // // // // // // // // // // // // // // // // //


// Amount Scrolled function
function amountscrolled() {
    var winheight = $(window).height();
    var docheight = $(document).height();
    var scrollTop = $(window).scrollTop();
    var trackLength = docheight - winheight;
    var pctScrolled = Math.floor(scrollTop / trackLength * 100); // gets percentage scrolled (ie: 80 NaN if tracklength == 0)
    return pctScrolled;
}
// Amount Scrolled function END
// // // // // // // // // // // // // // // // // // // //
