

window.onload=function(){
var lis=document.getElementsByTagName("li");

for (var i=0;i<lis.length;i++) {
	lis[i].onmouseover=function(){
		this.className='dog';
		console.log('执行了这个方法dog');
	};
	lis[i].onmouseout=function(){
		this.className='';
		console.log('执行了这个方法');
	};
}

}
