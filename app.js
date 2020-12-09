var express = require('express');
var app = express();
// 引入解析包
var formidable = require('formidable');
fs = require('fs');

app.get('/', function (req, res) {
  res.send('Hello World!');
});
// 设置静态文件目录
app.use('/public', express.static('public'));

app.post('/upload', function(req,res){
  var form = new formidable.IncomingForm();
  console.log('about to parse');
  form.parse(req, function(error, fields, files){
    console.log('parse done')
    console.log(files)
    // 读取文件流并写入到public/test.png
    fs.writeFileSync('public/test.png', fs.readFileSync(files.upload.path));
    //重定向到结果页
    res.redirect('/public/result.html');
  })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
