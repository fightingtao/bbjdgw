$(function(){

    $('.fr li').click(function(){
        $(this).addClass('cur').siblings().removeClass('cur');
        $(this).addClass('ah').siblings().removeClass('ah');
    })
})