var mysql = require('mysql');

var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'Rona@2011',
  database : 'Dropbox',
  port: 3306
});

function fetchData(callback,sqlQuery){

  console.log("\nSQL Query::"+sqlQuery);

  pool.getConnection( (error, connection) => {
    connection.query(sqlQuery, function(err, rows, fields) {
      if(err){
        console.log("ERROR: " + err.message);
        console.log("\nConnection closing..");
        connection.release();
        console.log("\nConnection closed.");
      }
      else
      {             // return err or result
        console.log("DB Results:"+rows);
        callback(err, rows);
        console.log("\nConnection closing..");
        connection.release();
        console.log("\nConnection closed.");
      }
    });
  });




}

function insertData(callback,sql){

  console.log("\nSQL:"+sql);

  pool.getConnection( (error, connection) => {
    connection.query(sql, function(err, result) {
      if(err){
        console.log("ERROR: " + err.message);
        console.log("\nConnection closing..");
        connection.release();
        console.log("\nConnection closed.");
      }
      else
      {             // return err or result
        console.log("DB Results:"+result);
        callback(err, result);
        console.log("\nConnection closing..");
        connection.release();
        console.log("\nConnection closed.");
      }
    });
  });


}

exports.fetchData=fetchData;
exports.insertData = insertData;
