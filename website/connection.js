var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost:3306',
	user     : 'root',
	password : '1234',
	database : 'mydatabase'
});

connection.connect();

connection.query('SELECT * from inventory', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

connection.end();