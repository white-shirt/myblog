
getComment();

$('#sub_btn').on("click", function() {
    var subUserName = $('#input_name').val();
    var subUserTime = $('#input_time').val();
    var subUserComment = $('#input_comment').val();
    addComment(subUserName,subUserTime,subUserComment);
    console.log(subUserName);
    $('#input_name').val("");
    $('#input_time').val("");

});

function getComment() {
    $.ajax({
        url: '/getComment',                                                                                                   // 请求的后端地址
        data: {},                                                                                                             // 请求的参数
        type: 'get',                                                                                                          // 请求的方式，get or post
        dataType: 'json',                                                                                                     // 预期服务器返回的数据类型
        success: function (returnData) {                                                                                      // 后端返回成功后前端将会做的处理
            for (var i = returnData.length-1 ; i >= 0 ; i--) {
                var userInfo = $('<div class="user_info"></div>');
                var userComment = $('<div class="user_comment"></div>');
                var userReply = $('<div class="user_reply"></div>');
                var userImg = $('<img src="../img/logo.gif" class="user_img" alt="">');
                var userName = $('<div class="user_name"></div>');
                var userTime = $('<div class="user_time"></div>');
                var firstComment = $('<div class="first_comment"></div>');
                var replyComment = $('<div class="reply_comment"></div>');
                var reply = $('<div class="reply">回复</div>');
                var replyUp = $('<div class="reply_up">点个赞</div>');
                var newUserInfo = userInfo.append(userImg,userName,userTime);
                var newUserComment = userComment.append(firstComment,replyComment);
                var newUserReply = userReply.append(reply,replyUp);
                var commentPart = $('<div class="commentPart"></div>');
                var newCommentPart = commentPart.append(userInfo,userComment,userReply);
                var commentaryWrap = $('.commentaryWrap');
                commentaryWrap.append(newCommentPart);
                $('.user_name')[returnData.length-1 - i].innerHTML= returnData[i].name;
                $('.user_time')[returnData.length-1 - i].innerHTML= returnData[i].time;
                $('.first_comment')[returnData.length-1 - i].innerHTML= returnData[i].commentary;
            }
        },
        error: function () {
            alert("get异常！");
        }
    })
};
function addComment(subUserName,subUserTime,subUserComment) {
    $.ajax({
        url: '/addComment',                                                                                                  // 请求的后端地址
        data: {comment:subUserComment,time:subUserTime,name:subUserName},                                                                                                 // 请求的参数
        type: 'post',                                                                                                         // 请求的方式，get or post
        dataType: 'json',  
        beforeSend:function() {
            if(subUserName == ""||subUserTime == ""||subUserComment == ""){
                return false;
            }    
        },                                                                                                 // 预期服务器返回的数据类型
        success: function () {
            $('.commentPart').remove();
            getComment();                                                                 
        },
        error: function () {
            alert("add异常！");
        }
    })
};


   