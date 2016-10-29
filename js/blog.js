/**
 * Created by Administrator on 2016/10/27.
 */
var Blog = {
    animate: {
        bannerContent: function () {
            alert(1111111111)
            alert(1111111111)
            alert(1111111111)
            alert(1111111111)
            alert(1111111111)
            alert(1111111111)
            alert(1111111111)
            111111111
            alert(1111111111);
            alert(1111111111)
            var $bannerContent = $('.bannerContent');
            $bannerContent.animate({'margin-top': -200 + 'px', 'opacity': 0}, 1000, function () {
                $bannerContent.remove();
                console.log(1111);
            });
        }
    }
};


// 快捷键
// reforomate code：ctrl+alt+l
// 检查语法错误 inspect code  可以自定义快捷键
// 其他的可以自己定义
// 还可以定义动态模板，我给你演示下
// 还可以定义动态模板，我给你演示下