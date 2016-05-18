(function(exp) {
  try {
    DB.openConnection();
    if (exp.params.sysNo) {
      DB.cmd.CommandText = "SELECT A.* FROM " + exp.params.table + " A where A.SYS_NO = ?";
      DB.cmd.Parameters(0).Value = exp.params.sysNo;
    } else if (exp.params.sysName) {
      DB.cmd.CommandText =  "SELECT A.* FROM BASIC_INFO B INNER JOIN " + exp.params.table + " A ON A.SYS_NO = B.SYS_NO where B.SYS_NAME LIKE '%' || ? || '%'";
      DB.cmd.Parameters(0).Value = exp.params.sysName;
    }
    DB.rs = DB.cmd.Execute();
    exp.system = DB.toResults();
  } catch(e) {
    alert(e.message);
  } finally {
    DB.closeConnection();
  }
})(window.exp);
