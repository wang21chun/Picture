;(function(window, $){
	var Lightbox = function(){
		this._mask = $('<div class="lightbox-mask"/>');
		this._img = $('<div class="lightbox-img">'+
				        '<div class="lightbox-left"><div class="icon-left"></div></div>'+
				        '<div class="lightbox-right"><div class="icon-right"></div></div>'+
				        ' <div class="icon-load"></div>'+
				        '<img>'+
				    '</div>');
		this.data = [];
		this.index = -1;
	} 

	Lightbox.prototype = {
		_getWindowSize : function(){
			var _w = $(document).outerWidth(true);
			var _h = $(document).outerHeight(true);
			return {win_w : _w, win_h : _h}; 
		},
		_initLightobox : function(){
			var _this = this;
			_this._mask.click(function(){
				_this._hide();
			});
			_this._img.delegate('.lightbox-left,.lightbox-right','click', function(event){
				event.stopPropagation();
				var _class = $(this).attr("class");
				if(_class.indexOf('lightbox-left') > -1){
					_this._prev();
				}
				if(_class.indexOf('lightbox-right') > -1){
					_this._next();
				}
			})
			 $('body').prepend(_this._mask).prepend(_this._img);
			 return this;
		},
		_show : function(obj){
			var _this = this;
			_this._mask.fadeIn();
			_this._img.fadeIn().animate({"width":obj.width,"height":obj.height,"left":obj.left,"top":obj.top},function(){
					_this._img.find("img").attr({"src":obj.src,"width":obj.width,"height":obj.height}).fadeIn();
			}).find(".lightbox-left,.lightbox-right").css({"height":obj.height});
		},
		_hide : function(){
			var _this = this;
			_this._mask.fadeOut();
			_this._img.fadeOut().find("img").fadeOut();
		},
		_newElements : function(){
			return $('<li><img/></li>');
		},
		_zoomRatio : function(max_w, max_h, img_w, img_h){
			return Math.min(max_w/img_w, max_h/img_h,1);
		},
		_loadImages : function(src){
			var _this = this;
			var _w_h = _this._getWindowSize();
			var img = new Image();
			img.onload = function(){
				var _ratio = _this._zoomRatio(_w_h.win_w-10, _w_h.win_h-10, this.width, this.height);
				var _w = this.width*_ratio;
				var _h = this.height*_ratio;
				var _left = (_w_h.win_w - _w -10 )/2;
				var _top = (_w_h.win_h - _h -10 )/2;
				_this._show({"src":src, "width":_w, "height":_h,"left":_left,"top":_top});
			}
			img.src = src;
		},
		_next : function(){
			var _this = this;
			if(_this.index >= _this.data.length - 1){
				return false;
			}
			_this.index +=  1;
			_this._img.find("img").fadeOut();
			_this._loadImages( _this.data[_this.index]);
			
		},
		_prev : function(){
			var _this = this;
			if(_this.index <=  0){
				return false;
			}
			_this.index -=  1;
			_this._img.find("img").fadeOut();
			_this._loadImages( _this.data[_this.index]);
		},
		imgEoverEven : function(event){
			event.stopPropagation();
			var $_this = $(this);
			$_this.stop(true);
			var _init_left = parseInt($_this.attr('data-left'));
			if(_init_left > 0)
				$_this.animate({"left":_init_left+100});
		},
		imgEoutEven : function(event){
			event.stopPropagation();
			var $_this = $(this);
			var _init_left = parseInt($_this.attr('data-left'));
			$_this.animate({"left":_init_left});
		},
		imgClickEven : function(event){
			
			event.stopPropagation();
			var _this = event.data;
			var $_this = $(this);
			var src = $_this.attr("src");
			_this._loadImages(src);
			if(_this.data.length <= 0){
				var _prev = $_this.parent('li').prevAll();
				var _next = $_this.parent('li').nextAll();
				var prev = [];
				var next = [];
				$.each(_prev, function(i,n){
					prev.push($(n).children().attr("src"));
				})
				_this.index = prev.length;
				$.merge(prev.reverse(),[src]);
				$.each(_next, function(i,n){
					next.push($(n).children().attr("src"));
				})
				_this.data = $.merge(prev,next);
			}else{
				_this.index = $.inArray(src,_this.data);
			}

		
			
			
		},
		setImages : function(imgObjs){
			if(typeof imgObjs != "object") return ;
			var _this = this;
			var $_ul = $('<ul/>')
			var l = imgObjs.length;
			$.each(imgObjs, function(i, n){
				var el = _this._newElements();
				var _left = (i*100);
				el.css({"left":_left, "z-index":l-i})
				    .attr({"data-left":_left});
				el.find('img').attr({"src":n.src, "width":"200px", "height":"150px"});
				$_ul.append(el);
			});
			return $_ul;
		}
	}
	window['lightbox'] = new Lightbox()._initLightobox();
})(window, jQuery);