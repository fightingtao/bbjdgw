 function btnClick(){
	console.log("按钮被点击了"+document.getElementById('texts').value);
	$.ajax({
		type:"post",
		url:"http://127.0.0.1/.230:8082/user/suggest",
		data:{
			keys:'keys',
			digest:"digest"
			
		},
		success:function(data){
			
			console.log("q请求成功");
			
		},
		beforeSend:function(){
			console.log("qing求之前");
		}
		
 
	}) ;
} 


function ta(obj){
	var val=$(obj).val().length;
	if(val>100){
		console.log("至多输入100个字符！");
		$(obj).val($(obj).val().substring(0,100))
		}
}