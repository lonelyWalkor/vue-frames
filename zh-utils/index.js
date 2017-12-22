/**
 * 这是一个公共的工具js
 */
var app = require("./utils/util");
app.dateformat = require("./utils/date");
app.cookie = require("./utils/cookie");
app.flexible = require("./utils/mobile_font");
if(window){
  window.app = app;
}
module.exports = app;