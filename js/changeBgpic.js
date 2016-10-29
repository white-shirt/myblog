/**
 * Created by Administrator on 2016/10/23.
 */
var image = new Array('img/3-1.jpg','img/3-2.jpg','img/3-3.jpg','img/3-4.jpg','img/3-5.jpg');
$(document).ready(function () {
    $('.clickbtn').click(function () {
        $('.part3').fadeOut(500,function () {
            $('.part3').fadeIn(500,function () {
                $('.part3').css('background-image',"url(+image[i]+)");
            });
        });
    });
});