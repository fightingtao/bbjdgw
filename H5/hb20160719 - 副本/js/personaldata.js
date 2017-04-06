var notvip = $("#notvip").val();

var noteid = 0;

var bookid = 0;

var jid = $("#jid").val(); //用户名

var isvip = 1; //1-会员 0-非会员

var maleurl = "img/male.png"; //男;

var femaleurl = "img/female.png"; //女;

var take = "img/take.png";

function getuserinfo(jid) {
	$.ajax({
		type: "get",
		url: 'http://s.haowanlab.com:8900/RegisterDemo1/servlet/H5GetUserInfo?jid=' + jid,
		dataType: "jsonp",
		jsonpCallback: "doJsonP",
		jsonp: "callback",
		success: function(data) {
			console.log(data);
			$('.userhead').append("<img class='phead' src='" + data.face + "'/>");
			var sexsex = data.gender == 1 ? maleurl : femaleurl;
			var isvip = data.ismember == 1 ? "<img class='isvip' src='img/vip.png'/>" : "";

			console.log(sexsex);
			console.log(isvip);
			$('.userinfo').append(
				isvip +
				"<p class='name'>" + data.nickname + "</p>" +
				"<img class='sex' src='" + sexsex + "' />" +
				"<p class='age'>" + data.age + "</p>" +
				"<p class='fans'>粉丝：" + data.fansnum + "</p>" +
				"<p class='asign'>" + data.sign + "</p>"
			);
		}
	});
	$.ajax({
		type: "GET",
		url: "http://api.maoyan.com/mmdb/movie/v1/list/wish/order/coming.json",
		dataType: "jsonp",
		jsonpCallback: "doJsonppp",
		jsonp: "callback",
		success: function(data) {
			console.log(data);

		}
	})
}

function getuserworks(jid, noteid) {
	$.ajax({
		type: "get",
		url: 'http://s.haowanlab.com:8900/RegisterDemo1/servlet/H5GetPersonalNotes?jid=' + jid + '&noteid=' + noteid,
		dataType: "jsonp",
		jsonpCallback: "doJsonP2",
		jsonp: "callback",
		success: function(data) {
			$(".zz2").show();
			$('body').css('overflow', 'hidden');
			$(".zz2").on("touchmove", function(e) {
				e.preventDefault();
			});
			setTimeout('$(".zz2").css("display","none")', 1500);
			$('body').css('overflow', 'auto');
			console.log(data);
			var lists = data.relist;
			//最后一个作品的noteid
			$("#noteidHidden").val(lists[lists.length - 1].noteid);

			$.each(lists, function(i) {
				var istake = lists[i].notetype == 5 || lists[i].notetype == 6 ? "<img class='take' src='" + take + "'>" : "";
				console.log(istake);
				$('.grid').append("<div class='grid-item' id='t" + lists[i].noteid + "'><div class='grid-item1'>" +
					"<img src='" + lists[i].url + "' />" + istake +
					"</div></div>");
			});
			$(".grid-item").on('click', function(e) {
				var tid = $(this).attr("id").replace("t", "");
				console.log(tid);
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
			}, 1000)

			window.addEventListener('resize', function() {
				minigrid('.grid', '.grid-item', 6, animate);
			});
		}
	});
}

function getprsonalbooks(jid, bookid) {
	$.ajax({
		type: "get",
		url: 'http://s.haowanlab.com:8900/RegisterDemo1/servlet/H5GetPersonalBooks?jid=' + jid + '&noteid=' + noteid,
		dataType: "jsonp",
		jsonpCallback: "doJsonP3",
		jsonp: "callback",
		success: function(data) {
			$(".zz2").show();
			$('body').css('overflow', 'hidden');
			$(".zz2").on("touchmove", function(e) {
				e.preventDefault();
			});
			setTimeout('$(".zz2").css("display","none")', 1000);
			$('body').css('overflow', 'auto');
			console.log(data);
			var lists = data.relist;
			//最后一个作品的noteid
			$("#bookidHidden").val(lists[lists.length - 1].bookid);
			$.each(lists, function(i) {
				$('.grid').append("<div class='grid-item' id='b" + lists[i].bookid + "'><div class='grid-item1'>" +
					"<img src='" + lists[i].url + "' />" + "<div class='pagenum'>" + lists[i].pagenum + "p</div>" +
					"</div></div>");
			});
			$(".grid-item").on('click', function(e) {
				var bid = $(this).attr("id").replace("b", "");
				console.log(bid);
				var weburl = "http://s.haowanlab.com:9900/RegisterDemo1/servlet/GetBookHtml5?bookid=" + bid + "";
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
$("#pb").click(function() {
	$('.grid').empty();
	$("#pb").addClass("current2");
	$("#work").removeClass("current2");
	setTimeout('$(".zz2").css("display","none")', 1000);
	getprsonalbooks(jid, 0);
});
$("#work").click(function() {
	$('.grid').empty();
	$("#work").addClass("current2");
	$("#pb").removeClass("current2");
	setTimeout('$(".zz2").css("display","none")', 1000);
	getuserworks(jid, 0);
});

$("#downloadapk").click(function() {
	var indexurl = "http://www.haowanlab.com";
	window.open(indexurl);
});

$(function() {
	getuserinfo(jid);
	getuserworks(jid, noteid);
});

$(window).scroll(function() {　　
	var scrollTop = $(this).scrollTop();　　
	var scrollHeight = $(document).height();　　
	var windowHeight = $(this).height();
	noteid = $("#noteidHidden").val();
	bookid = $("#bookidHidden").val();
	if(scrollTop + windowHeight >= scrollHeight) {
		$('#work').hasClass('current2') ? getuserworks(jid, noteid) : getprsonalbooks(jid, bookid);
	}
});
