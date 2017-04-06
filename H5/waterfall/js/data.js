var notvip = $("#notvip").val();
var usertype = $("#userType").val();
var orderid = 0;

$('#userType').change(function() {
	var userType = $(this).val();
	usertypeHidden = userType;
	$('.grid').empty();
	getdata(usertypeHidden, notvip, 0);
});
$("#free").click(function() {
	notvip = 0;
	$('.grid').empty();
	getdata(usertype, notvip, 0);
});
$("#vip").click(function() {
	$("#free").removeClass("current");
	$("#vip").addClass("current");
	notvip = 1;
	if(notvip == 1) {
		alert("您不是包月用户，下面将为您加载免费内容");
		$("#vip").removeClass("current");
		$("#free").addClass("current");
	}
	//此处不是包月用户，默认加载免费内容
	$('.grid').empty();
	getdata(usertype, 0, 0);
});

function getfirstdata(usertype, notvip) {
	$.ajax({
		type: "get",
		url: 'http://n.haowanlab.com:8900/RegisterDemo1/servlet/H5GetNotes?usertype=' + usertype + '&isfree=' + notvip + '&orderid=' + 0,
		dataType: "jsonp",
		jsonpCallback: "doJsonP",
		jsonp: "callback",
		success: function(data) {
			var lists = data.relist;
			//最后一个作品的orderid
			$("#orderidHidden").val(lists[lists.length - 1].orderid);

			$('.grid').empty();
			$.each(lists, function(i) {
				//				$('.grid').append('<div class="grid-item" id='+lists.noteid+'>' + '<img class="noteimg" src="' + lists[i].url + '" />' + '</div>');
				$('.grid').append("<div class='grid-item'   id='t" + lists[i].noteid + "'><div class='grid-item1'>" +
					"<img src='" + lists[i].url + "' />" +
					"<img class='face' src='" + lists[i].faceurl + "'/>" +
					"<p class='notetitle'>" + lists[i].title + "</p></div></div>");
			});
			console.log('getfirstdata+请求成功'+"<div class='grid-item'   id='t" + lists[i].noteid + "'><div class='grid-item1'>" +
					"<img src='" + lists[i].url + "' />" +
					"<img class='face' src='" + lists[i].faceurl + "'/>" +
					"<p class='notetitle'>" + lists[i].title + "</p></div></div>");

			$(".grid-item").on('click', function(e) {
				var tid = $(this).attr("id").replace("t", "");
				console.log(tid);
				//				location.href = "http://s.haowanlab.com:9900/RegisterDemo1/servlet/GetHtml5?noteid=" + tid + "";
				var weburl = "http://s.haowanlab.com:9900/RegisterDemo1/servlet/GetHtml5?noteid=" + tid + "";
				window.open(weburl);
			});
			//下拉的usertype
			var usertypes = data.relist2;
			console.log(usertypes);
			$('#userType').empty();
			$.each(usertypes, function(j) {
				$('#userType').append('<option value="' + usertypes[j].usertype + '">' + usertypes[j].name + '</option>');
			});

			function animate(item, x, y, index) {
				dynamics.animate(item, {
					translateX: x,
					translateY: y,
					opacity: 1
				}, {
					type: dynamics.spring,
					duration: 600,
					frequency: 120,
					delay: 100 + index * 30
				});
			}
			//防止异步
			//var imgNum = $('img').length;
			//$('img').load(function() {
			//if (!--imgNum) {

			//}
			//});
			setTimeout(function() {
				minigrid('.grid', '.grid-item', 6, animate);
			}, 1000);
			//			setTimeout(function() {
			//				
			//			}, 1500)

			window.addEventListener('resize', function() {
				minigrid('.grid', '.grid-item', 6, animate);
			});

		}
	});
}

function getdata(usertype, notvip, orderid) {
	var usertype = $("#userType").val();

	$.ajax({
		type: "get",
		url: 'http://n.haowanlab.com:8900/RegisterDemo1/servlet/H5GetNotes?usertype=' + usertype + '&isfree=' + notvip + '&orderid=' + orderid,
		dataType: "jsonp",
		jsonpCallback: "doJsonP",
		jsonp: "callback",
		success: function(data) {
			//		  	$("#loading").stop().animate({ "display": "block" }, 3000, function () {
			//                  $("#loading").css("display", "none");
			//          });
			$(".zz2").show();
			$('body').css('overflow', 'hidden');
			$(".zz2").on("touchmove", function(e) {
				e.preventDefault();
			});
			setTimeout('$(".zz2").css("display","none")', 2000);
			$('body').css('overflow', 'auto');
			var lists = data.relist;
			console.log(data.relist);
			//最后一个作品的orderid
			$.each(lists, function(i) {
				$('.grid').append("<div class='grid-item' id='t" + lists[i].noteid + "'><div class='grid-item1'>" +
					"<img src='" + lists[i].url + "' />" +
					"<img class='face' src='" + lists[i].faceurl + "'/>" +
					"<p class='notetitle'>" + lists[i].title + "</p></div></div>");
			});
			$(".grid-item").on('click', function(e) {
				var tid = $(this).attr("id").replace("t", "");
				console.log(tid);
				//				location.href = "http://s.haowanlab.com:9900/RegisterDemo1/servlet/GetHtml5?noteid=" + tid + "";
				var weburl = "http://s.haowanlab.com:9900/RegisterDemo1/servlet/GetHtml5?noteid=" + tid + "";
				window.open(weburl);
			});

			function animate(item, x, y, index) {
				dynamics.animate(item, {
					translateX: x,
					translateY: y,
					opacity: 1
				}, {
					type: dynamics.spring,
					duration: 600,
					frequency: 120,
					delay: 100 + index * 30
				});
			}
			//防止异步
			setTimeout(function() {
				minigrid('.grid', '.grid-item', 6, animate);
			}, 500)

			window.addEventListener('resize', function() {
				minigrid('.grid', '.grid-item', 6, animate);
			});

		}
	});
}
$(function() {

	getfirstdata(1, 0);
	$(".footfixedimg").on("click", function() {
		window.open("http://wxunion.cn/huaban666/");
	});
});

$(window).scroll(function() {　　
	var scrollTop = $(this).scrollTop();　　
	var scrollHeight = $(document).height();　　
	var windowHeight = $(this).height();
	if(scrollTop + windowHeight >= scrollHeight) {
		orderid = $("#orderidHidden").val();
		getdata(usertype, notvip, orderid);
	}
});
