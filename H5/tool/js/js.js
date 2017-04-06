//jQuery(function(){
////	var str="        嘿嘿嘿";
////	alert(str);
////	console.log("怎么办");
////	alert($.trim(str));
//
////var ary=["张三","李四","王麻子"];
////$.each(ary,function(index,value){
////	$('#list').html($('#list').html()+(index+1)+"---"+value+'<br>');
////});
////var ary =[1,2,3,4,4,4,32,1,1,4];
////var aryGrep=$.grep(ary,function(element,index){
////	return index<4 ,element<32;//筛选条件 返回的是数组
////});
////$.each(aryGrep,function(index,value){
////	$('#list').html($('#list').html()+index+"+++"+value+'<br>');
////	
////});
////document.querySelector('.tmp\\:test');//转义
//
//});
////$(document).ready(function() {
////$('a[href*=#]').click(function() {
//// if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
//// && location.hostname == this.hostname) {
//// var $target = $(this.hash);
//// $target = $target.length && $target
//// || $('[name=' + this.hash.slice(1) +']');
//// if ($target.length) {
////var targetOffset = $target.offset().top;
////$('html,body')
////.animate({scrollTop: targetOffset}, 900);
////  return false;
//// }
////}
////});
////// how to use
////// place this where you want to scroll to
////<A name=top></A>
////// the link
////<A href="#top">go to top</A>
////});

//获取鼠标位置
$(document).ready(function() {
   $("#list").mousemove(function(e){
     //display the x and y axis values inside the div with the id XY
    $('#XY').html("X Axis : " + e.pageX + " | Y Axis " + e.pageY);
  });
// 用法
<DIV id=XY></DIV>
 
});