/***************************************************************************************************
LoadingOverlay - A flexible loading overlay jQuery plugin
    Author          : Gaspare Sganga
    Version         : 1.1
    License         : MIT
    Documentation   : http://gasparesganga.com/labs/jquery-loading-overlay
****************************************************************************************************/
!function(a,b){function d(c,d){c=a(c);var e=c.is("body"),g=c.data("LoadingOverlayCount");if(g===b&&(g=0),0==g){var h=a("<div>",{"class":"loadingoverlay",css:{"background-color":d.color,display:"flex","flex-direction":"column","align-items":"center","justify-content":"center"}});if(d.image&&h.css({"background-image":"url("+d.image+")","background-position":"center center","background-repeat":"no-repeat"}),d.fontawesome&&a("<div>",{"class":"loadingoverlay_fontawesome "+d.fontawesome}).appendTo(h),d.custom&&a(d.custom).appendTo(h),e?h.css({position:"fixed",top:0,left:0,width:"100%",height:"100%"}):(h.css({position:"absolute",top:0,left:0}),"static"==c.css("position")&&h.css({top:c.position().top+parseInt(c.css("margin-top"))+parseInt(c.css("border-top-width")),left:c.position().left+parseInt(c.css("margin-left"))+parseInt(c.css("border-left-width"))})),f(c,h,d,e),d.resizeInterval>0){var i=setInterval(function(){f(c,h,d,e)},d.resizeInterval);c.data("LoadingOverlayResizeIntervalId",i)}h.appendTo(c)}g++,c.data("LoadingOverlayCount",g)}function e(c,d){c=a(c);var e=c.data("LoadingOverlayCount");if(e!==b)if(e--,d||0>=e){var f=c.data("LoadingOverlayResizeIntervalId");f&&clearInterval(f),c.removeData("LoadingOverlayCount").removeData("LoadingOverlayResizeIntervalId"),c.children(".loadingoverlay").remove()}else c.data("LoadingOverlayCount",e)}function f(b,c,d,e){e||c.css({width:b.innerWidth(),height:b.innerHeight()});var f="auto";if(d.size&&"auto"!=d.size){var g=e?a(window):b;f=Math.min(g.innerWidth(),g.innerHeight())*parseFloat(d.size)/100,d.maxSize&&f>parseInt(d.maxSize)&&(f=parseInt(d.maxSize)+"px"),d.minSize&&f<parseInt(d.minSize)&&(f=parseInt(d.minSize)+"px")}c.css("background-size",f),c.children(".loadingoverlay_fontawesome").css("font-size",f)}var c={color:"rgba(255, 255, 255, 0.8)",custom:"",fontawesome:"",image:"http://www.arabianbusiness.com/skins/ab.main/gfx/loading_spinner.gif",maxSize:"100px",minSize:"20px",resizeInterval:0,size:"50%"};a.LoadingOverlaySetup=function(b){a.extend(!0,c,b)},a.LoadingOverlay=function(b,f){switch(b.toLowerCase()){case"show":var g=a.extend(!0,{},c,f);d("body",g);break;case"hide":e("body",f)}},a.fn.LoadingOverlay=function(b,f){switch(b.toLowerCase()){case"show":var g=a.extend(!0,{},c,f);return this.each(function(){d(this,g)});case"hide":return this.each(function(){e(this,f)})}}}(jQuery);

 $( document ).ready(function() {
        $.LoadingOverlay("show");

        // Hide it after 3 seconds
        setTimeout(function () {
            $.LoadingOverlay("hide");
        }, 3000);
    });
