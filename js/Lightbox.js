;(function(window, $){
	var Lightbox = function(){} 

	Lightbox.prototype = {
		_getWindowSize : function(){
			var _w = $(document).outerWidth(true);
			var _h = $(document).outerHeight(true);
			return {win_w : _w, win_h : _h}; 
		},
		_newElements : function(){
			return $('<li><img/></li>');
		},
		_zoomRatio : function(max_w, max_h, img_w, img_h){
			return Math.min(max_w/img_w, max_h/img_h,1);
		},
		_loadImages : function(src){
			var _this = this;
			var img = new Image();
			img.onload = function(){
				_this._zoomRatio(300, 200, this.width, this.height);
			}
			img.src = src;
		},
		imgEoverEven : function(event){
			event.stopPropagation();
			var $_this = $(this);
			var $_parent = $_this.parent('li');
			$_parent.stop(true);
			var _init_left = parseInt($_parent.attr('data-left'));
			if(_init_left > 100)
				$_parent.animate({"left":_init_left+100});
		},
		imgEoutEven : function(event){
			event.stopPropagation();
			var $_this = $(this);
			var $_parent = $_this.parent('li');
			var _init_left = parseInt($_parent.attr('data-left'));
			$_parent.animate({"left":_init_left});
		},
		imgClickEven : function(event){
			event.stopPropagation();
		},
		setImages : function(imgObjs){
			if(typeof imgObjs != "object") return ;
			var _this = this;
			var $_ul = $('<ul/>')
			var l = imgObjs.length;
			$.each(imgObjs, function(i, n){
				var el = _this._newElements();
				var _left = (i*100)+5;
				el.css({"left":_left, "z-index":l-i})
				    .attr({"data-left":_left});
				el.find('img').attr({"src":n.src, "width":"200px", "height":"150px"});
				$_ul.append(el);
			});
			return $_ul;
		}
	}
	window['lightbox'] = new Lightbox();
})(window, jQuery);