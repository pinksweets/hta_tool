var fs = new ActiveXObject("Scripting.FileSystemObject");
var CommonUtil = {};
(function() {
  window.trim = function(arg) {
    !!arg || (arg = '');
    return arg.trim();
  }
  window.require = function(name) {
    return eval(fs.OpenTextFile(name).ReadAll());
  };
})();
