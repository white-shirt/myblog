// 建立mysql连接
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'zk19911111',
    database: 'cheung_ows_com'
});
connection.connect();                                                                                                                                       // 响应前端ajax请求
var pageSize = 5;                                                                                                                                          // 每个page大小是10
var http = require('http');
var urllib = require('url');
http.createServer(
    function (req, res) {
        res.charset = 'utf-8';
        var returnJson;                                                                                                                                     // 将要返回给前端的json串
        var params = urllib.parse(req.url, true);
        var total;                                                                                                                                          // 文章总数

console.log(params)
        switch (params.pathname) {
            case "/getArticle":                                                                                                                             // 如果url是/getArticle就从数据库查寻出结果并返回
                var returnData = {
                    totalPage: null,                                                                                                                        // page总数
                    articles: null,                                                                                                                         // 文章总数
                    nowPage: params.query.page                                                                                                              // 当前页号,随url传过来
                };
                res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
                var sql = "select count(*) count from article";                                                                                             //从mysql查询总数
                connection.query(sql, function (err, rows, fields) {                                                                                        // connection。mysql连接
                    if (err) throw err;
                    returnJson = rows;
                    total = rows[0].count;                                                                                                                  // 计算页数
                    returnData.totalPage = Math.ceil(total / pageSize);                                                                                     //页码总数
                    var sql = "select * from article limit " + (returnData.nowPage - 1 ) * pageSize + ", " + pageSize
                    connection.query(sql, function (err, rows, fields) {
                        if (err) throw err;
                        returnData.articles = rows;
                        var str = params.query.callback + '(' + JSON.stringify(returnData) + ')';                                                           // 将returnJson转换成json格式，同时返回给前端
                        res.end(str);
                    });
                });
                break;
            case "/delArticle":
                // todo build sql to del article
                break;
            case "/addArticle":
                // todo add article
                break;
            case "/updateArticle":
                // todo update article
                break;
            // 其余情况返回错误
            default :
                res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
                res.end(JSON.stringify("{'error':'你请求的地址是错的哈哈哈哈'}"));
                break;
        }

    }).listen(1337, "127.0.0.1");                                                                                                                           // 监听浏览器的http://127.0.0.1:1337请求

console.log('Server running at http://127.0.0.1:1337/');                                                                                                    // 打印帮助提示
