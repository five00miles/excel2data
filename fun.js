var mydata = [];

var provArr = []; //  省数据
for (let i = 0; i < data.length; i++) {
  provArr.push(removeTrim(data[i]['省']));
}
provArr = unique(provArr);
console.warn('provArr', provArr);

// 把省压进最终数据
for (let i = 0; i < provArr.length; i++) {
  mydata.push({
    "prov": provArr[i]
  })
}

// 把市压进最终数据
for (let i = 0; i < provArr.length; i++) {
  mydata[i]['市数据'] = [];
  let _arr = [];
  for (let j = 0; j < data.length; j++) {
    if (provArr[i] == data[j]['省']) {
      _arr.push(removeTrim(data[j]['市']));
      _arr = unique(_arr);
    }
  }
  for (let k = 0; k < _arr.length; k++) {
    mydata[i]['市数据'].push({
      "市": _arr[k]
    });
  }
}

// 把区压进最终数据
for (let i = 0; i < mydata.length; i++) {
  let _prov = mydata[i].prov;
  for (let j = 0; j < mydata[i]['市数据'].length; j++) {
    let _city = mydata[i]['市数据'][j]['市'];
    mydata[i]['市数据'][j]['县乡数据'] = [];
    let _arr = [];
    for (let k = 0; k < data.length; k++) {
      if (data[k]['省'] == _prov && data[k]['市'] == _city) {
        _arr.push(removeTrim(data[k]['县乡']));
        _arr = unique(_arr);
      }
    }
    for (let z = 0; z < _arr.length; z++) {
      mydata[i]['市数据'][j]['县乡数据'].push({
        "县乡": _arr[z]
      })
    }
  }
}

// 把门店压进最终数据
for (let i = 0; i < mydata.length; i++) {
  let _prov = mydata[i].prov;
  for (let j = 0; j < mydata[i]['市数据'].length; j++) {
    let _city = mydata[i]['市数据'][j]['市'];
    for (let k = 0; k < mydata[i]['市数据'][j]['县乡数据'].length; k++) {
      let _dist = mydata[i]['市数据'][j]['县乡数据'][k]['县乡'];
      mydata[i]['市数据'][j]['县乡数据'][k]['门店'] = [];
      let _arr = [];
      for(let l = 0; l < data.length; l++) {
        if( data[l]['省'] == _prov && data[l]['市'] == _city && data[l]['县乡'] == _dist ) {
          // console.log(i + '和' + j,data[l]['门店名称'])
          _arr.push(removeTrim(data[l]['门店名称']));
          _arr = unique(_arr);
        }
      }
      for(let l2 = 0; l2 < _arr.length; l2++) {
        mydata[i]['市数据'][j]['县乡数据'][k]['门店'].push(_arr[l2]);
      }
      
    }
  }
}

console.warn('mydata', mydata);

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