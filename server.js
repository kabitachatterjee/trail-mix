// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var controllers = require('./controllers');


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

 app.get("/", function homepage (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

/*
 * JSON API Endpoints
 */

app.get("/api", controllers.api.index);
app.get("/api/trails", controllers.trails.index);
app.get("/api/trails/:id", controllers.trails.show);
app.post("/api/trails", controllers.trails.create);
app.put("/api/trails/:id", controllers.trails.update);
app.delete("/api/trails/:id", controllers.trails.destroy);



 /**********
  * SERVER *
  **********/

 // listen on port 3000
 app.listen(process.env.PORT || 8000, function () {
   console.log("Express server is running on http://localhost:8000/");
 });
