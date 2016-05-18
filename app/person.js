(function(exp) {
  try {
    DB.openConnection();
    var sql = "SELECT * FROM USER_TABLE WHERE NAME_J LIKE '%' || ? || '%' AND ORG_NAME LIKE '%' || ? || '%' ";
    DB.cmd.CommandText = sql;
    DB.cmd.Parameters(0).Value = exp.params.person_name;
    DB.cmd.Parameters(1).Value = exp.params.org_name;
    DB.rs = DB.cmd.Execute();
    exp.person = DB.toResults();
  } catch(e) {
    alert(e.message);
  } finally {
    DB.closeConnection();
  }
})(window.exp);
