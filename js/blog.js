/**
 * Created by oneWhitShirt on 2016/10/30.
 */
function getData(page) {
    $.ajax({
        url: '/getArticle?callback=?',                                     // 请求的后端地址
        data: {page: page},                                                                                                             // 请求的参数
        type: 'get',                                                                                                                    // 请求的方式，get or post
        dataType: 'jsonp',                                                                                                              // 预期服务器返回的数据类型
        success: function (returnData) {                                                                                                // 后端返回成功后前端将会做的处理
            $('.title,.articleRemark,.abstract,.articleBtn,.articleContent').remove();                                                  //移除旧文章
            setTimeout(function () {                                                                                                    //刷新页面时，回到最顶端
                $(document).scrollTop(0);
            }, 100);
            var articles = returnData.articles;                                                                                         //后台返回文章
            for (var i in articles) {
                var title = $('<div class="title"></div>').text(articles[i].title);
                var articleRemark = $('<div class="articleRemark"></div>').text(articles[i].articleRemark);
                var abstract = $('<div class="abstract"></div>').text(articles[i].abstract);
                var articleBtn = $('<div class="articleBtn"><a>展开/收起</a></div>');
                var content = $('<div class="articleContent"></div>').text(articles[i].articleContent);
                $('.wrapInner').append(title, articleRemark, abstract, content, articleBtn);
            }
            $(".title").click(function () {                                                                                             //点击标题阅读全文
                $(this).next().next(".abstract").slideToggle(1000);                                                                     //文章摘要收起
                $(this).next().next().next(".articleContent").slideToggle(2000);                                                        //内容展开
            });
            $('.articleBtn').click(function () {
                $(this).prev('.articleContent').slideToggle(2000);
                $(this).prev().prev('.abstract').slideToggle(1000);
            });
        },
        error: function () {
            alert("异常！");
        }
    })
}
getData(1);                                                                                                                             //第一页
//回到顶部
window.onload = function () {
    var obtn = document.getElementById("arrowTopBtn");                                                                                  //获取回到顶部按钮
    var timer = null;
    var ostop = document.documentElement.scrollTop || document.body.scrollTop;
    obtn.onclick = function () {
        timer = setInterval(function () {
            var ostop = document.documentElement.scrollTop || document.body.scrollTop;                                                  // 获取滚动条距离顶部的高度
            var ispeed = Math.floor(-ostop / 6);                                                                                          //向下取整，滚动条的速度。
            document.documentElement.scrollTop = document.body.scrollTop = ostop + ispeed;                                              //滚动条距离顶部的高度
            if (ostop == 0) {
                clearInterval(timer);
            }
        }, 30);
    };
    var nowPage = 1;                                                                                                                    //页码
    var totalPage = 4;
    for (var i = 1; i < totalPage; i++) {
        var isActive = "inactive";
        if (i == nowPage) isActive = "active";
        page = '<a class="' + isActive + '" onclick="getData(' + i + ')">' + i + "</a>";
        $(".pagenation").append(page);
    }
    var $Num = $('.pagenation a');
    $Num.click(function () {                                                                                                            //页码背景
        $(this).addClass('active').siblings().removeClass('active');
    });
};
