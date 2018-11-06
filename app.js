var xlsx = require('node-xlsx');
var fs = require('fs');

var sheets = xlsx.parse('./data.xlsx');
var _arr = [];
sheets.forEach(function (sheet) {
  for (let i = 1; i < sheet['data'].length; i++) {
    var row = sheet['data'][i];
    if(row.length == 0) return;
    var _json = {};
    _json.prov = row[2];
    _json.city = row[3];
    _json.dist = row[4];
    _json.shop = row[1];
    _arr.push(_json);
  }
})
// console.log('_arr',_arr);
let _str = 'var data = ' + JSON.stringify(getMyData(_arr));

fs.writeFile('./data.js', _str, function (err) {
  if (err) {
    throw err;
  }
  console.log('写入成功');
});


function getMyData(data) {
  var mydata = [];

  var provArr = []; //  省数据
  for (let i = 0; i < data.length; i++) {
    provArr.push(removeTrim(data[i]['prov']));
  }
  provArr = unique(provArr);
  // console.warn('provArr', provArr);

  // 把省压进最终数据
  for (let i = 0; i < provArr.length; i++) {
    mydata.push({
      "prov": provArr[i]
    })
  }

  // 把市压进最终数据
  for (let i = 0; i < provArr.length; i++) {
    mydata[i]['citydaya'] = [];
    let _arr = [];
    for (let j = 0; j < data.length; j++) {
      if (provArr[i] == data[j]['prov']) {
        _arr.push(removeTrim(data[j]['city']));
        _arr = unique(_arr);
      }
    }
    for (let k = 0; k < _arr.length; k++) {
      mydata[i]['citydaya'].push({
        "city": _arr[k]
      });
    }
  }

  // 把区压进最终数据
  for (let i = 0; i < mydata.length; i++) {
    let _prov = mydata[i].prov;
    for (let j = 0; j < mydata[i]['citydaya'].length; j++) {
      let _city = mydata[i]['citydaya'][j]['city'];
      mydata[i]['citydaya'][j]['distdaya'] = [];
      let _arr = [];
      for (let k = 0; k < data.length; k++) {
        if (data[k]['prov'] == _prov && data[k]['city'] == _city) {
          _arr.push(removeTrim(data[k]['dist']));
          _arr = unique(_arr);
        }
      }
      for (let z = 0; z < _arr.length; z++) {
        mydata[i]['citydaya'][j]['distdaya'].push({
          "dist": _arr[z]
        })
      }
    }
  }

  // 把门店压进最终数据
  for (let i = 0; i < mydata.length; i++) {
    let _prov = mydata[i].prov;
    for (let j = 0; j < mydata[i]['citydaya'].length; j++) {
      let _city = mydata[i]['citydaya'][j]['city'];
      for (let k = 0; k < mydata[i]['citydaya'][j]['distdaya'].length; k++) {
        let _dist = mydata[i]['citydaya'][j]['distdaya'][k]['dist'];
        mydata[i]['citydaya'][j]['distdaya'][k]['shop'] = [];
        let _arr = [];
        for (let l = 0; l < data.length; l++) {
          if (data[l]['prov'] == _prov && data[l]['city'] == _city && data[l]['dist'] == _dist) {
            _arr.push(removeTrim(data[l]['shop']));
            _arr = unique(_arr);
          }
        }
        for (let l2 = 0; l2 < _arr.length; l2++) {
          mydata[i]['citydaya'][j]['distdaya'][k]['shop'].push(_arr[l2]);
        }
      }
    }
  }
  // console.warn('mydata', mydata);

  // 数组去重
  function unique(arr) {
    var hash = [];
    for (var i = 0; i < arr.length; i++) {
      if (hash.indexOf(arr[i]) == -1) {
        hash.push(arr[i]);
      }
    }
    return hash;
  }

  // 去除空格
  function removeTrim(str) {
    return str.replace(/\s*/g, "");
  }

  return mydata;
}