var mysql      = require('mysql');
/*var database = mysql.createConnection({
	host     : 'localhost:3306',
	user     : 'root',
	password : '1234',
	database : 'mydatabase'
});*/
var database = mysql.createConnection({
	host     : 'uta-smarthospital.cvx1abf3lv8q.us-west-2.rds.amazonaws.com',
	user     : 'utasmart',
	password : 'utasmart',
	database : 'smart_hospital'
});
var currentUserID = 0;
var currentUserEmail = "";
var currentUserName = "";

//Ignore loadJSON and init functions. I will be using them to connect without
//saving local host, user, password, database names. -Edward.
function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'my_data.json', true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value 
      //but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function init() {
  loadJSON(function(response) {
    // Parse JSON string into object
    var actual_JSON = JSON.parse(response);
  });
}


//////////////////////
//Can code past here.
//////////////////////

database.connect();

//get_all_login_data();
log_in("edward.fankhauser@mavs.uta.edu", "123456seven", move_to_main_page);

database.end();


//Function defines SQL query to get all inventory items.
function get_all_inventory() {
  do_query('SELECT * from inventory');
}

function get_all_login_data() {
  query = 'select * from dummy_login_table';
  do_query(query);
}

function log_in(email, password, callback) {
  //Notice the formatting for extra spaces, quotes, renaming count(*) as count.
  query = 'select *, count(*) as count from dummy_login_table ';
  query += 'where email = "' + email + '" and password = "' + password + '"';

  //do_query(query);

  //Start connection
  //database.connect();

  return database.query(query, function run_query(err, rows, fields) {
    if(err) { throw err; } //throw an error if there is one...

    if(rows[0].count == 1) {
      //Only one row matching that login matched.
      login_successful(rows, callback);
    } else {
      console.log("Login Unsuccessful");
    }

    //Close connection
    //database.end();
  })
}

function login_successful(rows, callback) {
  //do something now
  currentUserID = rows[0].iddummy_login_table;
  currentUserEmail = rows[0].email;
  currentUserName = rows[0].username;

  callback(currentUserID);
}

function move_to_main_page(userID) {
  //put variables in local cookie, move to the main dashboard
  //dashboard should load data based on cookie info
  //disconnect db before moving to new page...
  console.log("thanks for logging in, " + currentUserName + "!");
}

//Runs a query on the database defined at top.
function do_query(query, ret) {
  //database.connect();

  database.query(query, function(err, rows, fields) {
    if(!err) {
      console.log('The solution is: ', rows);
    } else
      console.log('Error while performing Query.');
  });

  //database.end();
}