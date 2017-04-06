jQuery(function(){
	console.log('这个是jQuery');
	var screen =$('#screen');
	$('.menu').hover(function(){
		$('.menu').show().animate({
			t: 30,
			step:10,
			mul :{
				o:100,
				h:160,
			}
		});
	},function(){
		$('.menu-list').animate({
			t:30,
			step:10,
			mul :{
				o:0,
				h:0,
			},
			fn :function(){
//				$('#header .mem')
			console.log('也不知道是什么');
			}
			
		})
	});
	
	
//	登录 按钮点击
var login=$('#login');
login.center(350,250).resize(function(){
	if (login.css('display')=='block'){
		screen.lock();
	}
});
$('.login').click(function(){
	login.center(350,250);
	login.css('display','block');
	console.log('登录按钮被点击');
	screen.lock().animate({
		attr:'o',
		target:30,
		t:30,
		step:10
	});
});
 $('#login .close').click(function(){
 	login.css('display','none');
 	screen.animate({
 		attr: 'o',
 		target : 0,
 		t : 30,
 		step : 10,
 		fn: function(){
 			screen.unlock();
 		}
 	});
 });
 $('#login .button').click(function(){
 	console.log('登录annou按钮点击了');
// 	alert('登录成功了');
ajax({
	method :'post',
	url:'http://www.baidu.com',
	 data : $('form').eq(0).serialize(),
	success :function(text){
				$('#loading').hide();

		if (text==1){
			$('#login .info').html('登录失败:用户不从');
		}
		else{

		console.log('登录的接口%@',text);
		}
		console.log('222登录annou按钮点击了');

	},
	
	
});
 });
login.drag($('#login h2').first());

//注册按钮被点击了
	  var register=$('#reg');
	register.center(600,550).resize(function(){
		if (register.css('display')=='block'){
		screen.lock();		
		}
	});
	$('.reg').click(function(){

	register.center(600,550);
	register.css('display','block');
	screen.lock().animate({
		attr:'o',
		target:30,
		t:30,
		step:10
	});
	});
$('#reg .close').click(function(){
	register.css('display','none');
	screen.animate({
		attr:'o',
		target:0,
		t:30,
		step:10,
		fn:function(){
			screen.unlock();
		}
	});
	
});
register.drag($('#reg h2').first());
//   注册的界面交互逻辑
    $('form').eq(1).first().reset();
    //用户名的验证
    $('form').eq(1).form('user').bind('foucus',function(){
    	$('#reg .info_user').css('display','block');
     $('#reg .error_user').css('display','none');
        $('#reg .succ_user').css('display','none');
    }).bind('blur',function(){
        if(trim($(this).value()) == ''){
            $('#reg .info_user').css('display','none');
        }else if(!check_user()){
            $('#reg .info_user').css('display','none');
            $('#reg .error_user').css('display','block');
            $('#reg .succ_user').css('display','none');

        }else{
            $('#reg .info_user').css('display','none');
            $('#reg .error_user').css('display','none');
            $('#reg .succ_user').css('display','block');
        }
    });
    function check_user(){
    	var flag=true;
    	if (!/[\w]{2,20}/.test(trim($('form').eq(1).form('user').value()))){
    		$('#reg .error_user').html('输入不合法,请重新输入!11');
    		  $('#reg dl span.loading').hide();
				console.log('shuru 输入的名字不合法');
    		return false;
    	}
    	else{
    		$('#reg .loading').show();
    		$('#reg .info_user').hide();
    		ajax({
    			method :'post',
    			url: 'is_user.php',
    			data :$('form').eq(1).serialize(),
    			success: function(text){
    				if (text==1){
		//$('#reg .error_user').html('y用户名被占用');
				flag=false;
    				}
    				else{
    					flag=true;
    					
    				}
    				$('#reg dl span.loading').hide();
    			},
    			async:false
    		});
    	}
    	return flag;
    }
    ///mam 密码验证  
    $('form').eq(1).form('pass').bind('focus',function(){
    	$('#reg .info_pass').css('display','block');
    	$('#reg .succ_pass').css('display','none');
    	$('#reg .error_pass').css('display','none');
    }).bind('blur',function(){
    	if(trim($(this).value())==''){
    		$('#reg .info_pass').css('display','none');
    	}
    	else{
    		if (check_pass(this)){
    			$('#reg .info_pass').css('display','none');
    			$('reg .error_pass').css('display','none');
    			$('#reg .succ_pass').css('display','block');
    		}
    	}
    });
        //密码强度验证函数
    function check_pass(){
        var value = trim($('form').eq(1).form('pass').value());
        var value_length = value.length;
        var code_length = 0;
        var flag = false;
        //第一个必须条件的验证6-20位之间
        if (value_length >= 6 && value_length <= 20) {
            $('#reg .info_pass .q1').html('●').css('color', 'green');
        } else {
            $('#reg .info_pass .q1').html('○').css('color', '#666');
        };
        //第二个必须条件的验证，字母或数字或非空字符，任意一个即可
        if (value_length > 0 && !/\s/.test(value)) {
            $('#reg .info_pass .q2').html('●').css('color', 'green');
        } else {
            $('#reg .info_pass .q2').html('○').css('color', '#666');
        };
        //第三个必须条件的验证，大写字母，小写字母，数字，非空字符混拼即可
        if(/[0-9]/.test(value)){
            code_length++;
        }
        if(/[a-z]/.test(value)){
            code_length++;
        }
        if(/[A-Z]/.test(value)){
            code_length++;
        }
        if(/[^0-9A-Za-z]/.test(value)){
            code_length++;
        }
        if(code_length >= 2){
            $('#reg .info_pass .q3').html('●').css('color', 'green');
        }else{
            $('#reg .info_pass .q3').html('○').css('color', '#666');
        }
        //安全级别
        if(value_length >= 10 && code_length >= 3){
            $('#reg .info_pass .s1').css('color','green');
            $('#reg .info_pass .s2').css('color','green');
            $('#reg .info_pass .s3').css('color','green');
            $('#reg .info_pass .s4').html('高').css('color','green');
        }else if(value_length >= 8 && code_length >= 2){
            $('#reg .info_pass .s1').css('color','#f60');
            $('#reg .info_pass .s2').css('color','#f60');
            $('#reg .info_pass .s3').css('color','#ccc');
            $('#reg .info_pass .s4').html('中').css('color','#f60');

        }else if(value_length >= 1){
            $('#reg .info_pass .s1').css('color','maroon');
            $('#reg .info_pass .s2').css('color','#ccc');
            $('#reg .info_pass .s3').css('color','#ccc');
            $('#reg .info_pass .s4').html('低').css('color','maroon');

        }else{
            $('#reg .info_pass .s1').css('color','#ccc');
            $('#reg .info_pass .s2').css('color','#ccc');
            $('#reg .info_pass .s3').css('color','#ccc');
            $('#reg .info_pass .s4').html('');

        }
        if(value_length >= 6 && value_length <= 20 && !/\s/.test(value) && code_length >= 2){
            flag = true;
        }
        return flag;

    }
    
    //滑动导航
    $('#nav .about li').hover(function(){
        //当前li距离ul的水平偏移量
        var target = $(this).first().offsetLeft;
        console.log('kaishi 开始滑动');
        $('#nav .nav_bg').animate({
            attr:'x',
            target:target + 20,
            t:30,
            step:10,
            fn : function(){
                $('#nav  .white').animate({
                    attr:'x',
                     target:-target
        		

                });
            }
        });
    },function(){
        //出现抖动的情况，主要是因为如果你离开了li,那么它会返回初始位置后再偏移，所以就会左右的抖动
        $('#nav .nav_bg').animate({
            attr:'x',
            target: 20,
            t:30,
            step:10,
            fn : function(){
                $('#nav  .white').animate({
                			
                    attr:'x',
                    target:0

                });
            }
        });
    });
$('#sidebar h2').toggle(function(){
	$(this).next().animate({
		mul :{
			h:0,
			o:0
		}
	});
},function(){
	$(this).next().animate({
		mul :{
			h:150,
			o:100
		}
	});
});
//轮播器初始化   图片轮播
$('#banner img').opacity(0);
$('#banner img').eq(0).opacity(100);
$('#banner ul li').eq(0).css('color','#333')
$('banner strong').html($('#banner img').eq(0).attr('alt'))

//轮播计数器
var banner_index=1;
//轮播器种类
var banner_type=1;
//自动播放器
var banner_timer=setInterval(banner_fn,3000);

//手动轮播
$('banner ul li').hover(function(){
	clearInterval(banner_timer);
	if ($(this).css('color')!= 'rgb(51,51,51)' && $(this).css('color')!='#333'){
		banner(this,banner_index==0 ?$('banner ul li').length()-1:banner_index-1)
	}
	
},function(){
		banner_index=$(this).index()+1;
		banner_timer=setInterval(banner_fn,3000);
		
	});
function banner(obj,prev){
	$('#banner ul li').css('color','#999');
	$(obj).css('color','#333');
	$('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));
	if (banner_type ==1){
		$('#banner img').eq(prev).animate({
			attr:'o',
			target:0,
			t:30,
			step:10
		}).css('zIndex',1);
		$('#banner img').eq($(obj).index()).animate({
			attr :'o',
			target:100,
			t:30,
			step:10
		}).css('zIndex',2);
	}else if (banner_type==2){
		$('banner img').eq(prev).animate({
			attr:'y',
			target:150,
			t:30,
			step:10
		}).css('z-Index',1).opacity(100);
		$('#banner img').eq($(obj).index()).animate({
			attr:'y',
			t:30,
			target:0,
			step:10
			
		}).css('top','-150px').css('zIndex',2).opacity(100);
			}
		}
//自动轮播
function banner_fn(){
	if (banner_index >=$('#banner ul li').length())
	banner_index = 0;
        banner($('#banner ul li').eq(banner_index).first(), banner_index == 0 ? $('#banner ul li').length() - 1 : banner_index - 1);
	    banner_index++;
}
  //延迟加载
    //问题1：将xsrc地址替换到src中去
    //当图片进入到可见区域的时候，将图片的xsrc的地址替换到src即可
    //alert($('.wait_load').eq(0).attr('xsrc'));
    //$('.wait_load').eq(0).attr('src', $('.wait_load').eq(0).attr('xsrc'));


    //问题2：获取图片元素到最外层顶点元素的距离
    //alert(offsetTop($('.wait_load').first()));

    //问题3：获取页面可视区域的最低点的位置
    //alert(getInner().height + getScroll().top);
    var wait_load =$('#photo .wait_load');
    wait_load.opacity(0);
	$(window).bind('scroll',_wait_load);
	$(window).bind('resize',_wait_load);

    function _wait_load() {
        setTimeout(function () {
            for (var i = 0; i < wait_load.length(); i ++) {
                var _this = wait_load.ge(i);
                if (getInner().height + getScroll().top >= offsetTop(_this)) {
                    $(_this).attr('src', $(_this).attr('xsrc')).animate({
                        attr : 'o',
                        target : 100,
                        t : 30,
                        step : 10
                    });
                }
            }
        }, 100);
    }
//图片弹窗
     var photo_big=$('#photo_big');
     photo_big.center(620,511).resize(function(){
     	if (reg.css('display')=='block'){
     		screen.lock();
     	}
     });
     $('#photo dl dt img').click(function(){
     	photo_big.center(620,511).show();
     	screen.lock().animate({
     		attr:'o',
     		target:30,
     		t:30,
     		step:10
     	});
    var temp_img = new Image();
    $(temp_img).bind('load',function(){
   	 	$('#photo_big .big img').attr('src',temp_img.src).animate({
    		attr:'o',
    		target:100,
    		t:30,
    		step:10
   	 	}).css('width','600px').css('height','450px').css('top',0).opacity(0);
    });
     	temp_img.src=$(this).attr('bigsrc');
     	var childdren =this.parentNode.parentNode;
     	prev_next_img(children);
     });
$('#photo_big .close').click(function(){
	photo_big.hide();
	screen.animate({
		attr:'o',
		target:0,
		t:30,
		step:10,
		fn:function(){
			screen.unlock();
		}
	});
	$('#photo_big .big img').attr('src','loading.gif').css('width','32px').css('height','32px').css('top','190px');
});
photo_big.drag($('#photo_big h2').last());

//登录按钮被点击了
 //登录
    $('form').eq(0).form('sub').click(function () {
    	console.log('deng 登录');
        if (/[\w]{2,20}/.test(trim($('form').eq(0).form('user').value())) && $('form').eq(0).form('pass').value().length >= 6) {
            var _this = this;
            $('#loading').show().center(200, 40);
            $('#loading p').html('正在尝试登录...');
            _this.disabled = true;
            $(_this).css('backgroundPosition', 'right');
            ajax({
                method : 'post',
                url : 'is_login.php',
                data : $('form').eq(0).serialize(),
                success : function (text) {
                    $('#loading').hide();
                    if (text == 1) {	  //失败
                        $('#login .info').html('登录失败：用户名或密码不正确！');
                    } else {  //成功
                        $('#login .info').html('');
                        $('#success').show().center(200, 40);
                        $('#success p').html('登录成功，请稍后...');
                        setCookie('user', trim($('form').eq(0).form('user').value()));
                        setTimeout(function () {
                            $('#success').hide();
                            login.hide();
                            $('form').eq(0).first().reset();
                            screen.animate({
                                attr : 'o',
                                target : 0,
                                t : 30,
                                step : 10,
                                fn : function () {
                                    screen.unlock();
                                }
                            });
                            $('.top .reg').hide();
                            $('.top .login').hide();
                            $('.top .info').show().html(getCookie('user') + '，您好！');
                        }, 1500);
                    }
                    _this.disabled = false;
                    $(_this).css('backgroundPosition', 'left');
                },
                async : true
            });
        } else {
            $('#login .info').html('登录失败：用户名或密码不合法！');
        }
    });
    

    
    
});