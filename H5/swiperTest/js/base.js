//.load(){
//	
//}
$.ajax({
	type : "post",
	url  : "http://121.41.114.230:8082/crowd-sourcing-consumer/user/login/code",
	data : {
		telephone :"18118282",
	},
	async:false,
	success :function(html){
	 	
		console.log("是不是啊"+html+document.getElementById("#images"));
	}
	
})