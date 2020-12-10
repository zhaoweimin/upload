const config = require("./config.js");
var express = require("express");
var app = express();
// 引入解析包
var formidable = require("formidable");
fs = require("fs");


function main() {
  app.get("/", function (req, res) {
    res.send("Hello World!");
  });
  // 设置静态文件目录
  app.use("/public", express.static("public"));
  app.use("/img", express.static("img"));

  app.post("/upload", function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (error, fields, files) {
      console.log(files);
      let { file } = files;
      let resData = {};

      // 检查文件格式
      resData = checkFile(file);

      if (resData.error == 0) {
        // 保存图片到img文件夹下
        // 文件名称由随机数和时间戳组成 
        let name = `${(new Date()).valueOf()}_${Math.random()*1000}.${file.type.split('image/')[1]}`
        fs.writeFileSync(`img/${name}`, fs.readFileSync(file.path));
        resData = {
          error: 0,
          message: "保存成功",
          data: {
            url: `${req.headers.host}/img/${name}`,
          },
        };
      }

      // 返回路径
      res.json(resData);

      //重定向到结果页
      // res.redirect('/public/result.html');
    });
  });

  app.listen(config.port, function () {
    console.log(`访问 http://loacalhost:${config.port}/upload`);
  });
}

function checkFile(file) {
  let max = config.maxSize;

  // 判断文件是否为空或者参数不对
  if (typeof file !== "object") {
    return {
      error: 1,
      message: `上传文件为不能空或者入参不对`,
    };
  }
  // 判断文件大小
  if (file.size / 1024 / 1024 > max) {
    return {
      error: 1,
      message: `保存失败，图片大于${max}M`,
    };
  }
  
  // 判断文件格式
  let flag = false
  config.format.forEach(vo => {
    if(file.type.indexOf(vo) !== -1) {
      flag = true
    }
  })
  if (!flag) {
    return {
      error: 1,
      message: `格式不对，保存失败，只支持${config.format.join(',')}的格式`,
    }
  }

  // default
  return { error: 0 };
}


main()

