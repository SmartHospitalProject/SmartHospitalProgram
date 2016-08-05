var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     : 'uta-smarthospital.cvx1abf3lv8q.us-west-2.rds.amazonaws.com',
	user     : 'utasmart',
	password : 'utasmart',
	database : 'smart_hospital'
});

connection.connect();

connection.query('SELECT * from equipment_inventory', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

connection.end();