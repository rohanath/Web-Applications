var mysql = require('mysql');

function getConnection(){
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'Rona@2011',
		database : 'Dropbox',
		port	 : 3306
	});
	return connection;
}


function fetchData(callback,sqlQuery){

	console.log("\nSQL Query::"+sqlQuery);

	var connection=getConnection();

	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
			return;
		}
		else
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}

function insertData(callback,sql){

	console.log("\nSQL:"+sql);

	var connection = getConnection();

	connection.query(sql, function(err, result) {
		if(err){
			console.log("ERROR: " + err.message);
			return;
		}
		else
		{	// return err or result
			console.log("DB Results:"+result);
			callback(err, result);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}

exports.fetchData=fetchData;
exports.insertData = insertData;
