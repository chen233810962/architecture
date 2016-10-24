# 使用gulp和requirejs快速构建一个前端项目
----

首先确认熟悉`gulp`和`requirejs`的基本使用方法。
安装Gulp工具：
- npm install -g gulp    全局安装 gulp
- npm install gulp --save-dev  开发依赖（devDependencies）安装

安装插件：
- npm install gulp-clean-css --save-dev
- npm install gulp-less --save-dev
- npm install gulp-replace --save-dev
- npm install 配置文件快速安装(或选用)

## 1. 目录结构说明
--------

    ├─前端 项目目录
    │  │
    │  ├─plugin    工具包(第三方插件)
    │  │
    │  ├─style     前端样式包
    │  │
    │  ├─modules   模块目录
    │  │  │
    │  │  ├─controller   控制器目录（逻辑层）
    │  │  │
    │  │  ├─custom       模型目录（数据层）
    │  │  │  │
    │  │  │  ├─common    公共函数目录
    │  │  │  │
    │  │  │  ├─interface 接口类库目录
    │  │  │  │
    │  │  │  └─libs      自定义类库目录
    │  │  │
    │  │  └─config.js requirejs配置文件
    │  │
    │  ├─gulpfile.js  gulp配置文件
    │  │
    │  ├─package.json 项目配置文件
    │  │
    │  └─View   视图目录

####View                   -- 项目的前端展示页面
    html               -- 按功能划分
        index.html     -- 业务模块

####plugin                 -- 插件模块
    jquery
        1.8.2
            jquery.js
    ...                -- 放置项目所需插件

####style                  -- 前端样式文件包含css、images、前端效果展示的js
    js
    css
    images
    ....

####moudles                -- 模块管理
    controller
        index.js       -- 控制前端对应页面的逻辑处理
    custom             -- 数据与接口的交互处理
    config.js		   -- 开发环境下使用的requirejs配置文件
    ....

####gulpfile.js            -- gulp配置文件
####package.json           -- 项目配置文件,可用npm快速导入项目所需的包文件


## 2. 模块说明
------------

创建窗口模块举例
```javascript
define(function(require, exports, module) {
    require("dialog_css");
    requier("dialog");

    function Dialog(content, options) {
        ...
    }
    module.exports = Dialog;
})
```

然后为首页完成业务模块index.js
``` javascript
define(function (require, exports) {
    var Dialog = require("dialogClass");
    $("#btnDialog").bind("click", function () {
        var mapDialog = new Dialog({type: "text", value: 'hello world!', width:'230px', height:'60px'});
        mapDialog.show();
    })
});
```

需要一个开发阶段requirejs的配置文件config.js，并将其引入到页面中：
```javascript
// utf-8
require.config({
	baseUrl: "../",
    paths:{
        "jquery": "/plugin/jquery/2.1.4/jquery",
        /*弹窗*/
        "dialog": "/base/dialog",
        "dialog_css": "/base/dialog.css"
    }
});
require(['jquery','index']);
```

展示的页面index.html
```html
<!DOCTYPE html>
<html>
<head>
  <title>弹出框</title>
</head>
<body>
  <button id="btnDialog">显示对话框</button>
</body>
  <script data-main="../modules/config" src="../plugin/require/require.js"></script>
</html>
```
这时候运行刚刚完成的index.html，一切顺利的话，应该已经可以看到弹窗的效果了。



## 3. 构建说明
------------

### package.json
定义gulp的基本配置
```json
{
  "name": "text",
  "version": "1.0.0",
  "description": "text",
  "main": "view/index.html",
  "dependencies": {
    "jquery": "^1.11.3",
    "requirejs": "^2.1.11"
  },
  "devDependencies": {
    "gulp": "^3.9.1",
    "gulp-clean-css": "^2.0.13",
    "gulp-less": "^3.1.0",
    "gulp-replace": "^0.5.4"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "crs",
  "license": "ISC"
}
```

### gulpfile.js
现在我们开始定义构建任务，先将package.json引入，后面的任务会用到其中的设置
```


