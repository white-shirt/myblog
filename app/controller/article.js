// 建立mysql连接
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'www',
    password: 'Zk1991.11.11',
    database: 'cheung_ows_com'
});
connection.connect();

// 响应前端ajax请求
var pageSize = 5;                                                                                                                                          // 每个page大小是10
var http = require('http');
var urllib = require('url');

http.createServer(
    function (req, res) {
        res.charset = 'utf-8';
        var returnJson;                                                                                                                                     // 将要返回给前端的json串
        var params = urllib.parse(req.url, true);
        var total;                                                                                                                                          // 文章总数
        res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});

        switch (params.pathname) {
            case "/getArticle":                                                                                                                             // 如果url是/getArticle就从数据库查寻出结果并返回
                var returnData = {
                    totalPage: null,                                                                                                                        // page总数
                    articles: null,                                                                                                                         // 文章总数
                    nowPage: params.query.page                                                                                                              // 当前页号,随url传过来
                };
                var sql = "select count(*) count from article";                                                                                             //从mysql查询总数
                connection.query(sql, function (err, rows, fields) {                                                                                        // connection。mysql连接
                    if (err) throw err;
                    returnJson = rows;
                    total = rows[0].count;                                                                                                                  // 计算页数
                    returnData.totalPage = Math.ceil(total / pageSize);                                                                                     //页码总数
                    var sql = "select * from article limit " + (returnData.nowPage - 1) * pageSize + ", " + pageSize
                    connection.query(sql, function (err, rows, fields) {
                        if (err) throw err;
                        returnData.articles = rows;
                        var str = params.query.callback + '(' + JSON.stringify(returnData) + ')';                                                           // 将returnJson转换成json格式，同时返回给前端
                        res.end(str);
                    });
                });
                break;
            case "/getComment":  // 查询留言
                connection.query('SELECT * FROM commentarys', function (err, result, fields) {
                    if (err) throw err;
                    var str = JSON.stringify(result);
                    res.end(str);
                })
                break;
            case "/addComment": // 插入留言
                console.log(params);

                var sql = 'INSERT INTO commentarys (commentary,time,name) VALUES ("'+params.query.comment+'","'+params.query.time+'","'+params.query.name+'");'
                console.log(sql)
                connection.query(sql, function (err, result, fields) {
                    if (err) throw err;
                    var str = JSON.stringify(result);
                    res.end(str);
                })
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
            default: // 其余情况返回错误
                res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
                res.end(JSON.stringify("{'error':'你请求的地址是错的哈哈哈哈'}"));
                break;
        }

    }).listen(1337, "127.0.0.1");                                                                                                                           // 监听浏览器的http://127.0.0.1:1337请求

console.log('Server running at http://127.0.0.1:1337/');                                                                                                    // 打印帮助提示
