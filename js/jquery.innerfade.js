/* Innerfade */
(function(a){a.fn.innerfade=function(b){return this.each(function(){a.innerfade(this,b)})};a.innerfade=function(b,c){var e={animationtype:"fade",speed:"normal",type:"sequence",timeout:2000,containerheight:"auto",runningclass:"innerfade",children:null};if(c){a.extend(e,c)}if(e.children===null){var g=a(b).children()}else{var g=a(b).children(e.children)}if(g.length>1){a(b).css("position","relative").css("height",e.containerheight).addClass(e.runningclass);for(var d=0;d<g.length;d++){a(g[d]).css("z-index",String(g.length-d)).css("position","absolute").hide()}if(e.type=="sequence"){setTimeout(function(){a.innerfade.next(g,e,1,0)},e.timeout);a(g[0]).show()}else{if(e.type=="random"){var f=Math.floor(Math.random()*(g.length));setTimeout(function(){do{h=Math.floor(Math.random()*(g.length))}while(f==h);a.innerfade.next(g,e,h,f)},e.timeout);a(g[f]).show()}else{if(e.type=="random_start"){e.type="sequence";var h=Math.floor(Math.random()*(g.length));setTimeout(function(){a.innerfade.next(g,e,(h+1)%g.length,h)},e.timeout);a(g[h]).show()}else{alert("Innerfade-Type must either be 'sequence', 'random' or 'random_start'")}}}}};a.innerfade.next=function(d,b,e,c){if(b.animationtype=="slide"){a(d[c]).slideUp(b.speed);a(d[e]).slideDown(b.speed)}else{if(b.animationtype=="fade"){a(d[c]).fadeOut(b.speed);a(d[e]).fadeIn(b.speed,function(){removeFilter(a(this)[0])})}else{alert("Innerfade-animationtype must either be 'slide' or 'fade'")}}if(b.type=="sequence"){if((e+1)<d.length){e=e+1;c=e-1}else{e=0;c=d.length-1}}else{if(b.type=="random"){c=e;while(e==c){e=Math.floor(Math.random()*d.length)}}else{alert("Innerfade-Type must either be 'sequence', 'random' or 'random_start'")}}setTimeout((function(){a.innerfade.next(d,b,e,c)}),b.timeout)}})(jQuery);function removeFilter(a){if(a.style.removeAttribute){a.style.removeAttribute("filter")}};
/* Changer */
$(document).ready(function(){if(!window.XMLHttpRequest)return;else
$('#portfolio').show();$('#portfolio').innerfade({speed:'slow',timeout:7000,type:'random',containerheight:'244px'});$('#wrapTest').show();$('#wrapTest').innerfade({speed:'slow',timeout:17500,type:'sequence'});$('#wrapTest2').show();$('#wrapTest2').innerfade({speed:'slow',timeout:17500,type:'sequence',containerheight:'150px'});});
/* Hover */
$(document).ready(function(){$(".fadeThis").append('<span class="hover"></span>').each(function(){var a=$("> span.hover",this).css("opacity",0);$(this).hover(function(){a.stop().fadeTo(150,1)},function(){a.stop().fadeTo(500,0)})});$(".fadeThat").append('<span class="hover"></span>').each(function(){var a=$("> span.hover",this).css("opacity",0);$(this).hover(function(){a.stop().fadeTo(200,1)},function(){a.stop().fadeTo(200,0)})});$("#ad2 a").css("opacity",0);$("#ad2 a").show();$("#ad2 a").hover(function(){$(this).stop().animate({opacity:0.9},200)},function(){$(this).stop().animate({opacity:0},400)});$(".promo a").css("opacity",0);$(".promo a").show();$(".promo a").hover(function(){$(this).stop().animate({opacity:0.8},200)},function(){$(this).stop().animate({opacity:0},400)})});