define(["jquery","jhere"],function(e){var t=function(e,t){this.init(e,t)};return t.prototype={init:function(t,n){this.$el=t,this.options=n,t.css({position:"fixed",top:0,left:0,overflow:"hidden"}),this.resize(),t.on("resize",this.resize),t.jHERE({enable:["behavior","zoombar","scalebar","typeselector","overview","contextmenu"],zoom:15,center:[parseFloat(this.options.home_latitude),parseFloat(this.options.home_longitude)]}),e.each(window.LPP_STATIONS,function(e,n){t.jHERE("marker",[parseFloat(n.latitude),parseFloat(n.longitude)],{text:n.name,textColor:"#333333",fill:"#ff6347",stroke:"#333333",icon:"images/marker.png",anchor:{x:12,y:32}})})},resize:function(){this.$el.css({width:e(window).width(),height:e(window).height()})},center:function(e,t){this.$el.jHERE("center",[parseFloat(e),parseFloat(t)])},home:function(){this.center(this.options.home_latitude,this.options.home_longitude)}},t});