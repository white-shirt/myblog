/**
 * Created by Administrator on 2016/10/23.
 */
function showTime() {                                                               //创建showTime函数
    var currentDate = new Date();                                                   //创建Date对象
    var month = currentDate.getMonth() + 1;                                         //获取月0-11
    var date = currentDate.getDate();                                               //获取日期
    var hour = currentDate.getHours();                                              //获取小时
    var minutes = currentDate.getMinutes();                                         //获取分钟
    var sec = currentDate.getSeconds();                                             //获取秒数
    var timeArray = [month,date,hour,minutes,sec];                                  //将时间数组储存在变量中
    var timeList = document.getElementsByClassName("timeList");                     //获取显示时间的列表
    for(var i = 0;i < timeList.length;i++){                                         //for循环遍历用来显示时间的列表
        timeList[i].innerHTML = timeArray[i];                                       //将时间数组内数据按顺序填到遍历出来的事件列表里
    }
}
window.onload = function () {                                                       //加载完成，动态显示系统时间
    window.setInterval("showTime()",1000);                                          //每隔1s调用一次showTime函数
};
