/**
 * Created by Administrator on 2017/3/11.
 */

/*判断客户端是PC还是移动端*/
function IsMobile() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var i = 0; i < Agents.length; i++) {
        if (userAgentInfo.indexOf(Agents[i]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

/*true为PC端，false为手机端*/
var flag = IsMobile();
/*手机端*/
if (!flag) {
    window.location.href = "http://www.chueng-ows.com/mobile.html";
} else {
    /*pc端*/

}