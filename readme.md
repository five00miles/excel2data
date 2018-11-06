格式固定，需要自己的格式的话还请自己魔改

使用方法：
* 目录下需要有：data.xlsx
* npm install
* 在该目录下打开终端 `$ node app.js`

输出的格式
```js
var data = [{
  "prov": "广东省",
  "citydaya": [{
    "city": "东莞市",
    "distdaya": [{
      "dist": "横沥镇",
      "shop": ["店的名称"]
    }]
  }]
}, {
  "prov": "江西省",
  "citydaya": [{
    "city": "南昌市",
    "distdaya": [{
      "dist": "某个镇",
      "shop": ["店的名称2"]
    }]
  }]
}, {
  "prov": "上海市",
  "citydaya": [{
    "city": "上海市",
    "distdaya": [{
      "dist": "黄浦区",
      "shop": ["店的名称3"]
    }]
  }]
}, {
  "prov": "北京市",
  "citydaya": [{
    "city": "北京市",
    "distdaya": [{
      "dist": "朝阳区",
      "shop": ["店的名称4"]
    }]
  }]
}]
```