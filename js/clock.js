/**
 * Created by Administrator on 2017/3/14.
 */
var can = document.getElementById('canClock');
var canWidth = can.width;
var ctx = can.getContext('2d');
var r = canWidth / 2;

/*圆*/
function drawBackground() {
    ctx.save();
    ctx.translate(r, r);
    ctx.beginPath();
    ctx.lineWidth = 6;
    ctx.arc(0, 0, r - 3, 0, 2 * Math.PI, false);
    ctx.strokeStyle = '#fff';
    ctx.stroke();

    /*数字*/
    var hourNum = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    hourNum.forEach(function (number, i) {
        var rad = 2 * Math.PI / 12 * i;
        var x = Math.cos(rad) * (r - 35);
        var y = Math.sin(rad) * (r - 35);
        ctx.fillStyle = '#fff';
        ctx.fillText(hourNum[i], x, y);
    });

    /*小圆点*/
    for (var i = 0; i < 60; i++) {
        var rad = 2 * Math.PI / 60 * i;
        var x = Math.cos(rad) * (r - 18);
        var y = Math.sin(rad) * (r - 18);
        ctx.beginPath();
        if (i % 5 === 0) {
            ctx.fillStyle = '#fff';
            ctx.arc(x, y, 3, 0, 2 * Math.PI, false);
        } else {
            ctx.fillStyle = '#666';
            ctx.arc(x, y, 3, 0, 2 * Math.PI, false);
        }
        ctx.fill();
    }
}

/*绘制时针*/

function drawHour(hour, minutes) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 12 * hour;
    var mrad = 2 * Math.PI / 12 / 60 * minutes;
    ctx.rotate(rad + mrad);
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 5);
    ctx.lineTo(0, -r / 2 + 5);
    ctx.stroke();
    ctx.restore();
}

/*绘制分针*/

function drawMinute(minutes) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 60 * minutes;
    ctx.rotate(rad);
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 5);
    ctx.lineTo(0, -r / 2 - 8);
    ctx.stroke();
    ctx.restore();
}

/*绘制秒针*/

function drawSecond(second) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 60 * second;
    ctx.rotate(rad);
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 10);
    ctx.lineTo(0, -r / 2 - 30);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.restore();
}

/*绘制圆点*/

function drawPoint() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#111";
    ctx.fill();
    ctx.restore();
}

/*动态*/

function draw() {
    ctx.clearRect(0, 0, canWidth, canWidth);
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    drawBackground();
    drawHour(hour, minute);
    drawMinute(minute);
    drawSecond(second);
    drawPoint();
    ctx.restore();
}
draw();
setInterval(draw, 1000);