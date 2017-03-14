/**
 * Created by Administrator on 2017/3/12.
 */

var bgFade = function () {
    var $bg = $('.bg');
    var $content = $('.content');
    $bg.animate({opacity: 0}, 3000, function () {
        $content.animate({bottom: 1.2 + 'rem'}, 600);
    });
};

$(function () {
    setTimeout(bgFade, 3000);
});