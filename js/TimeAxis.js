;(function(window, $, lightbox) {

    var TimeAxis = function() {
        this.timeAxisObj = $('<div id="timeAxis"><ul></ul></div>');
        this._init();
    }

    TimeAxis.prototype = {
        _init: function() {
            var _this = this;
            $('body').prepend(_this.timeAxisObj);
        },
        _newPointTime: function(id) {
        	var _this = this;
            	var pointTime = $('<li >' +
			                '<div class="time">' +
			               		'<div class="icon"></div>' +
			                	'<div class="desc">' +
			                		' <div class="title"></div>' +
			                		'<div class="desc-center"></div>' +
			                	'</div>' +
			                ' </div>' +

			                '<div class="center">' +
			                ' </div>' +
                		'</li>');
            	return pointTime;
        },
        setPointTime : function(obj){
        	if(typeof obj != "object") return ;
        	var _this = this;
        	var $_temp = $("<ul/>");
        	$.each(obj, function(i, n){
        		var $newPointTime = _this._newPointTime('point-time-'+i);
        		$newPointTime.attr({id:'point-time-'+i});
        		$newPointTime.find("div.icon").text(n.icon);
        		$newPointTime.find("div.title").text(n.title);
        		$newPointTime.find("div.desc-center").text(n.desc);
        		$newPointTime.find("div.center").append(lightbox.setImages(n.images));
        		$_temp.append($newPointTime);
        	});
        	 _this.timeAxisObj.delegate('.center>ul>li', 'mouseover',lightbox.imgEoverEven);
        	 _this.timeAxisObj.delegate('.center>ul>li', 'mouseout',lightbox.imgEoutEven);
        	 _this.timeAxisObj.delegate('.center>ul>li>img', 'click',lightbox,lightbox.imgClickEven);
	_this.timeAxisObj.find("ul").append($_temp.html());
        }
    }

    window['TimeAxis'] = TimeAxis;

})(window, jQuery, lightbox);
