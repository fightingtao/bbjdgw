{
	getLocation();
//	showPosition(1234);
}
var x=document.getElementById("btn");
function getLocation() 
{ 
 

    if (navigator.geolocation) 
    { 
        navigator.geolocation.getCurrentPosition(showPosition,showError); 
//      console.log('到底出 什么问题'x.value);
     
//      console.dirxml(navigator);
//      console.group(navigator);
//      var b=1234;
//     console.time(b);
//     console.timeEnd(b);

	var b=12345;
	console.profile(b);
	console.profileEnd(b);
    } 
    else 
    { 
    	console.log('到底出来什么问题');

        x.innerHTML="该浏览器不支持获取地理位置。"; 
    } 
} 

function showPosition(position) 
{ 
    x.innerHTML="纬度: " + position.coords.latitude + 
    "<br>经度: " + position.coords.longitude;   
//  alert(x.innerHTML);
console.log('到底出来什么问题');
    console.log('jing经度'+position.coords.longitude);
    
}
function showError(error)
{
	switch(error.code) 
	{
		case error.PERMISSION_DENIED:
			x.innerHTML="用户拒绝对获取地理位置的请求。"
			break;
		case error.POSITION_UNAVAILABLE:
			x.innerHTML="位置信息是不可用的。"
			break;
		case error.TIMEOUT:
			x.innerHTML="请求用户地理位置超时。"
			break;
		case error.UNKNOWN_ERROR:
			x.innerHTML="未知错误。"
			break;
	}
}