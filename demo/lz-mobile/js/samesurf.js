// samesurf stuff
(function(x,c) {
var b=[];var t=new Date().getTime();var p;try{p=parent.samesurf_sidebar_check;}catch(e){};p=p||false;
var s = document.createElement('script');s.id="samesurf.activate";s.type='text/javascript';s.async=true;
b.push('https:' == document.location.protocol ? 'https:/' : 'http:/');b.push(c);b.push("v/1/c");
b.push(document.location.hostname);b.push(x);b.push(p);b.push(t); s.src = b.join("/");
var t = document.getElementsByTagName('script')[0]; t.parentNode.insertBefore(s, t);
})(window.top==window.self, "code.samesurf.com");
