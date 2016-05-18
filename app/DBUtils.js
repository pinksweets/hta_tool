var DB = {};
(function() {
  DB.conn = new ActiveXObject("ADODB.Connection");
  DB.cmd = new ActiveXObject('ADODB.Command');
  DB.rs = new ActiveXObject('ADODB.Recordset');
  DB.param = new ActiveXObject('ADODB.Parameter');
  DB.toResults = function() {
    var head = new Array(), ret = new Array();
    var fieldSize = DB.rs.Fields.Count;
    if(DB.rs.EOF)  {
      head.push('メッセージ');
      ret.push({'メッセージ': '該当データ無し'});
    }
    while(!DB.rs.EOF) {
      var line = {};
      for(var i = 0; i < fieldSize; i++) {
        fieldSize > head.length && (head.push(DB.rs.Fields(i).Name));
        if(DB.rs.Fields(i).Value != null) {
          line[DB.rs.Fields(i).Name] = ''+DB.rs.Fields(i).Value;
        } else {
          line[DB.rs.Fields(i).Name] = '';
        }
      }
      ret.push(line);
      DB.rs.MoveNext();
    }
    DB.rs.Close();
    var result = {data: ret, header: head};
    return result;
  };
  DB.openConnection = function() {
    DB.conn.ConnectionString = 'DSN=testdb;UID=scott;PWD=tiger';
    DB.conn.Open();
    DB.cmd.ActiveConnection = DB.conn;
    DB.cmd.CommandType = 1;
    DB.cmd.Prepared = true;
  };
  DB.closeConnection = function() {
    if (DB.conn && DB.conn.State == 1) {
      DB.conn.Close();
    }
  };
})();
