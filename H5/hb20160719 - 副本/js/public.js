//loading
document.onreadystatechange = function() {
		if (document.readyState == "complete") {
			setTimeout('$(".zz").css("display","none")', 500);
//			$(".zz").css("display", "none");
		}
	}
	//判断是否横屏
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
	if (window.orientation === 180 || window.orientation === 0) {
		$('.lock_wrp').css("display", "none");
	}
	if (window.orientation === 90 || window.orientation === -90) {
		$('.lock_wrp').css("display", "block");
		//阻止冒泡
		$(".lock_wrp").on("touchmove", function(e) {
			e.preventDefault();
		});
	}
}, false);

//$("img").bind('dragstart', function(evt){return false;})
//禁止网页中拖动图片
$('img').each(function() {
	this.ondragstart = function() {
		return false;
	};
});

$(document).ready(function() {
	//-----------------
	var DEFAULT_WIDTH = 640, // 页面的默认宽度
		ua = navigator.userAgent.toLowerCase(), // 根据 user agent 的信息获取浏览器信息
		deviceWidth = window.screen.width, // 设备的宽度
		devicePixelRatio = window.devicePixelRatio || 1, // 物理像素和设备独立像素的比例，默认为1
		targetDensitydpi;
	// Android4.0以下手机不支持viewport的width，需要设置target-densitydpi
	if (ua.indexOf("android") !== -1 && parseFloat(ua.slice(ua.indexOf("android") + 8)) < 4) {
		targetDensitydpi = DEFAULT_WIDTH / deviceWidth * devicePixelRatio * 160;
		$('meta[name="viewport"]').attr('content', 'target-densitydpi=' + targetDensitydpi + ', width=device-width, user-scalable=no');
	}
	$('#regBox_inputPhone').on('input', function() {
		if ($(this).val().replace(/\s/g, '').length == 11) {
			colspanKeyboard();
		}
	});
	$('#regBox_inputPhonePWD').on('input', function() {
		if ($(this).val().replace(/\s/g, '').length == 4) {
			colspanKeyboard();
		}
	});

	function colspanKeyboard() {
		var input = $('input');
		input.attr('readonly', 'readonly');
		input.attr('disabled', 'true');
		setTimeout(function() {
			input.blur();
			input.removeAttr('readonly');
			input.removeAttr('disabled');
		}, 50);
	}

})