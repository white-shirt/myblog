/**
 * Created by Administrator on 2016/10/22.
 */

$(document).ready(function mousewheelfuc() {
    var index = 0;
    var $btnLi = $('#btn ul li');                                                                       //导航圆点
    var $p1content1 = $('.part1 .content1');                                                            //第一屏滚动内容1
    var $p1content2 = $('.part .content2');                                                             //第一屏滚动内容2
    var $p2content = $('.part2 .p2Content');                                                            //第二屏滚动内容
    var $p2btn = $('.p2Time,.timeNote,.button');                                                        //第二屏滚动btn
    var $p3content = $('.part3 .p3content');                                                            //第三屏滚动内容
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    var Time = new Date();                                                                              //获取页面刷新时的时间
    setTimeout(function () {                                                                            //刷新页面时，回到最顶端
        $(document).scrollTop(0);
    }, 100);

    $(document).mousewheel(function (ev, dir) {                                                         //鼠标滚动事件,传参event，滚动方向dir,dir判断鼠标滚动方向，向下-x，向上x
        if (new Date() - Time > 800) {                                                                  //判断两次滑动鼠标滚轮的时间间隔
            Time = new Date();                                                                          //将滚轮滚动时的事件储存在Time中
            if (dir < 0) {                                                                              //向下滚动
                index++;                                                                                //index加
                index %= 3;                                                                             //取余数
            } else {                                                                                    //向上滚动
                index--;                                                                                //index减
                if (index < 0) index = 2;                                                               //判断index值，当index减到0，滚轮向上滑动时，index=2，回到第三屏
            }
            $btnLi.eq(index).addClass('on').siblings().removeClass('on');                               //同上，导航圆点
            contentToggle();                                                                            //滚屏内容滑动
            move();                                                                                     //屏幕滚动
        }
    });
    $btnLi.click(function () {                                                                          //给圆点添加点击事件
        index = $(this).index();                                                                        //获取当前点击序列号
        $(this).addClass('on').siblings().removeClass('on');                                            //当前点击圆点addclass on
        contentToggle();                                                                                //调用内容滚动函数
        move();                                                                                         //调用屏幕滚动函数
    });

    function move() {                                                                                   //滚动函数
        var winHeight = $(window).height();                                                             //获取window高度
        $('body,html').animate({'scrollTop': index * winHeight + 'px'}, 800);                           //body滚动
    }

    function contentToggle() {                                                                          //滚动内容
        if (index == 0) {
            $p1content1.animate({'opacity': 1, 'margin-top': -150 + 'px'}, 1500);                       //同下
            $p1content2.animate({'opacity': 1, 'margin-top': -100 + 'px'}, 1000);
        } else {
            $p1content1.animate({'opacity': 0, 'margin-top': -450 + 'px'}, 800);
            $p1content2.animate({'opacity': 0, 'margin-top': -400 + 'px'}, 800);
        }
        if (index == 1) {                                                                               //当滚动到第二屏时内容显示
            $p2content.animate({'right': 150 + 'px', 'opacity': 1}, 2000);
            $p2btn.animate({'right': 316 + 'px', 'opacity': 1}, 2000);
        } else {                                                                                        //当不在第二屏时内容隐藏
            $p2content.animate({'right': -150 + 'px', 'opacity': 1}, 800);
            $p2btn.animate({'right': -316 + 'px', 'opacity': 1}, 800);
        }
        if (index == 2) {                                                                               //当滚动到第三屏时内容显示
            $p3content.animate({'left': 300 + 'px'}, 1500);
        } else {                                                                                        //当不在第三屏时内容隐藏
            $p3content.animate({'left': -300 + 'px'}, 800);
        }
    }
});