var mysql   = require('mysql');
var fs      = require('fs');

/*var localdatabase = mysql.createConnection({
	host     : 'localhost:3306',
	user     : 'root',
	password : '1234',
	database : 'mydatabase'
});*/
var database;
var currentUserID = 0;
var currentUserEmail = "";
var currentUserName = "";

//////////////////////
//Can code past here.
//////////////////////

node_connect_and_run( node_log_in );


//Function will connect db, run a query, then close db.
function node_connect_and_run(callback) {
  fs.readFile('./website/json/utasmart_data.json', 'utf8', function (err, data) {
    if (err) throw err;
    //mess with data here
    database = mysql.createConnection(JSON.parse(data))
    //alternately, local db for testing...
    //database = localdatabase;

    database.connect();

    if(callback) callback("edward.fankhauser@mavs.uta.edu", "123456seven");

    if(database) { database.end(); console.log("disconnected"); }
  });
}

//Runs a query on the database defined at top.
function node_do_query(query, ret) {
  database.query(query, function(err, rows, fields) {
    if(!err) {
      console.log('The solution is: ', rows);
    } else
      console.log('Error while performing Query.');
  });
}

//Function defines SQL query to get all inventory items.
function node_get_all_inventory_data() {
  node_do_query('SELECT * from inventory');
}

//Alternate example where string is saved first.
function node_get_all_dummy_login_table_data() {
  query = 'select * from dummy_login_table';
  node_do_query(query);
}

function node_log_in(email, password) {
  //Notice the formatting for extra spaces, quotes, renaming count(*) as count.
  query  = 'select *, count(*) as count ';
  query += 'from dummy_login_table ';
  query += 'where email = "' + email + '" and password = "' + password + '"';

  return database.query(query, function(err, rows, fields) {
    if(err) { throw err; } //throw an error if there is one...

    if(rows[0].count == 1) {
      //Only one row matching that login matched.
      node_login_successful(rows, node_go_to_main_page);
    } else {
      console.log("Login Unsuccessful");
    }

  })
}

function node_login_successful(rows, next_page) {
  //do something now
  currentUserID = rows[0].iddummy_login_table;
  currentUserEmail = rows[0].email;
  currentUserName = rows[0].username;
  //disconnect db before moving to new page...
  //database.end();

  next_page(currentUserID);
}

function node_go_to_main_page(userID) {
  //put variables in local cookie, move to the main dashboard
  //dashboard should load data based on cookie info
  console.log("thanks for logging in, " + currentUserName + "!");
}