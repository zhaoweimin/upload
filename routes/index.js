var express = require('express');
var fs = require('fs');
var formidable = require("formidable");
var router = express.Router();
const utils = require('../utils/util')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/upload", function (req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (error, fields, files) {
    let { file } = files;
    let resData = {};

    // 检查文件格式
    resData = utils.checkFile(file);

    if (resData.error == 0) {
      // 保存图片到img文件夹下
      // 文件名称由随机数和时间戳组成
      let name = `${new Date().valueOf()}_${parseInt(Math.random() * 1000000)}.${
        file.type.split("image/")[1]
      }`;
      let date = utils.getYyMmDd()
      utils.exists(date)
        .then(flag => {
        if(!flag) {
          utils.mkdir(date); // 不存在则创建文件夹
        }
        fs.writeFileSync(`upload/${date}/${name}`, fs.readFileSync(file.path));
        resData = {
          error: 0,
          message: "保存成功",
          data: {
            name: file.name,
            size: file.size,
            type: file.type,
            url: `http://${req.headers.host}/upload/${date}/${name}`,
          },
        };
        res.json(resData);
      })
    } else {
      // 返回路径
      res.json(resData);

    }

    
    //重定向到结果页
    // res.redirect('/public/result.html');
  });
});

module.exports = router;
