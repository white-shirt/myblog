/**
 * Created by Administrator on 2016/10/24.
 */
$(document).ready(function sidebar() {
    var $sidebar = $('.sidebar');                                                               //获取sidebar
    var winHeight = $('body').height();                                                         //获取body高度
    var $Btn_line = $('.Btn_line');                                                             //获取Btn_line
    $sidebar.height(winHeight + 'px');                                                          //sidebar高度
    $sidebar.state = 'closed';                                                                  //初始化sidebar状态，closed

    $('.sidebarBtn').click(function () {                                                        //sidebar按钮单击事件
        var $sidebar_bg = $('.sidebar_bg');                                                     //获取sidebar_bg
        var $sidebar_content = $('.sidebar_content');                                           //获取sidebar_content
        $sidebar_bg.appendTo($sidebar);                                                         //sidebar_bg添加到sidebar里
        $sidebar.width('300px');                                                                //sidebar宽度
        $sidebar.css({'background':'#fff'});                                                    //sidebar背景色
        $('html').append("<div class='mask'></div>");                                           //append .mask标签
        var $mask = $('.mask');                                                                 //获取.mask标签
        var maskHeight = winHeight *3;                                                          //遮罩层高度
        $mask.height(maskHeight + 'px');                                                        //mask高度

        if ($sidebar.state == 'closed') {                                                       //判断sidebar状态
            $Btn_line[0].classList.add('Btn_top_clockwise');                                    //lineTop add class
            $Btn_line[1].classList.add('Btn_mid_hide');                                         //lineMid add class
            $Btn_line[2].classList.add('Btn_bottom_anticlockwise');                             //lineBottom add class
            $sidebar.animate({'right':0,'opacity':1},500);                                      //sidebar向左滑动
            $sidebar_bg.animate({'right':30 + 'px'},600);                                       //sidebar_bg向左滑动
            $sidebar_content.animate({'right':70 + 'px'},600);                                  //sidebar_content向左滑动
            $sidebar.state = 'opened';                                                          //sidebar状态，opened
            }else {
            $Btn_line.removeClass('Btn_top_clockwise Btn_mid_hide Btn_bottom_anticlockwise');   //remove Btn_line add class
            $Btn_line[0].classList.add('Btn_top_anticlockwise');                                //lineTop add class
            $Btn_line[1].classList.add('Btn_mid_show');                                         //lineMid add class
            $Btn_line[2].classList.add('Btn_bottom_clockwise');                                 //lineBottom add class
            setTimeout(function () {
                $Btn_line.removeClass('Btn_top_anticlockwise Btn_mid_show Btn_bottom_clockwise');
            },1000);
            $sidebar.animate({'right':-520 + 'px','opacity':0},500);                            //sidebar向右滑动
            $sidebar_bg.animate({'right':-490 + 'px'},600);                                     //sidebar_bg向右滑动
            $sidebar_content.animate({'right':-490 + 'px'},600);                                //sidebar_content向右滑动
            $mask.remove();                                                                     //移除.mask标签
            $sidebar.state = 'closed';                                                          //sidebar状态closed
        }
    });
});
