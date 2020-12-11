var config = require("../config/index")
var fs = require('fs');

module.exports = {
  checkFile(file) {
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
    let flag = false;
    config.format.forEach((vo) => {
      if (file.type.indexOf(vo) !== -1) {
        flag = true;
      }
    });
    if (!flag) {
      return {
        error: 1,
        message: `格式不对，保存失败，只支持${config.format.join(",")}的格式`,
      };
    }

    // default
    return { error: 0 };
  },
  getYyMmDd() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minu = date.getMinutes();
    const second = date.getSeconds();
    const arr = [month, day, hours, minu, second];
    arr.forEach((item) => {
      item < 10 ? "0" + item : item;
    });
    return year + "-" + arr[0] + "-" + arr[1];
  },
  // 判断文件夹存在不
  async exists(name) {
    return await fs.existsSync(`./upload/${name}`);
  },
  // 创建文件夹
  mkdir(name) {
    fs.mkdir(`./upload/${name}`, function (err) {
      if (err) {
        return console.error(err);
      }
      console.log("目录创建成功。");
    });
  },
};
