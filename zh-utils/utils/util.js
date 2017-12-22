
/**
 * 递归构建菜单列表树
 * @param list
 * @returns {Array}
 */
var app = {};
function buildTreeData(list) {
  if (!Array.isArray(list)) {
    return [];
  }
  var tree = [];
  for (var i = 0; i < list.length; i++) {
    if (list[i].parentId == 0) {
      var temp = list[i];
      temp = $.extend({}, temp);
      _buildTreeChild(temp, list);
      tree.push(temp);
    }
  }
  app.sortListDesc(tree, "sort");
  return tree;
}

function _buildTreeChild(pObj, list) {
  if (!Array.isArray(list)) {
    return [];
  }
  var tree = [];
  for (var i = 0; i < list.length; i++) {
    if (list[i].parentId == pObj.id) {
      var temp = list[i];
      temp = $.extend({}, temp);
      _buildTreeChild(temp, list);
      tree.push(temp);
    }
  }
  app.sortListDesc(tree, "sort");
  if (tree.length > 0) {
    pObj.children = tree;
  }
}

/**
 * 排序 倒叙
 */
app.sortListDesc = function (list, key) {
  if (!Array.isArray(list)) {
    console.warn("排序对象不是一个数组")
    return;
  }
  list.sort(function (a, b) {
    if (typeof a === "object" && typeof b === "object") return b[key] - a[key];
    return b - a;
  })
}
app.sortList = function (list, key) {
  if (!Array.isArray(list)) {
    console.warn("排序对象不是一个数组")
    return;
  }
  list.sort(function (a, b) {
    if (typeof a === "object" && typeof b === "object") return a[key] - b[key];
    return a - b;
  })
}

app.buildTreeData = buildTreeData;

/**
 * 判断变量是否为空和空字符串
 * @param value
 * @returns {boolean}
 */
app.isNull = function (value) {
  if (value == null) {
    return true;
  }
  return false;
}

/**
 * 判断变量是否是null 或 空字符串
 * @param value
 * @returns {boolean}
 */
app.isEmpty = function (value) {
  if (this.isNull(value)) return true;
  if (value == "") return true;
  return false;
}

app.deepClone = function (obj){
  var result;
  var oClass=isClass(obj);
  if(oClass==="Object"){
    result={};
  }else if(oClass==="Array"){
    result=[];
  }else{
    return obj;
  }
  for(var key in obj){
    var copy=obj[key];
    if(isClass(copy)=="Object"){
      result[key]=arguments.callee(copy);//递归调用
    }else if(isClass(copy)=="Array"){
      result[key]=arguments.callee(copy);
    }else{
      result[key]=obj[key];
    }
  }
  return result;
}

//判断对象的数据类型
function isClass(o){
  if(o===null) return "Null";
  if(o===undefined) return "Undefined";
  return Object.prototype.toString.call(o).slice(8,-1);
}

module.exports = app;
