var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost:3306',
	user     : 'root',
	password : '1234',
	database : 'mydatabase'
});

//Ignore loadJSON and init functions. I will be using them to connect without
//saving local host, user, password, database names. -Edward.
function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'my_data.json', true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
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

//Run function like this where needed.
get_all_inventory();

//Function defines SQL query to get all inventory items.
function get_all_inventory() {
  do_query('SELECT * from inventory');
}

//Runs a query on the database defined at top.
function do_query(query, ret) {
  database.connect();

  database.query(query, function(err, rows, fields) {
    if (!err) {
      console.log('The solution is: ', rows);
    } else
      console.log('Error while performing Query.');
  });

  database.end();
}