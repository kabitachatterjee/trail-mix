var db = require("../models");
var Trail = db.Trail;

// GET /api/trails
function index(req, res) {
  // send back all our trails as JSON objects
  Trail.find({}, function(err, allTrails) {
    res.json(allTrails);
  });
}

function update(req, res) {
  console.log(req.body.name);
  console.log("reached trailController.js req.params.id = ", req.params.id, "req.body = ", req.body);
  var updateId = req.params.id;
  console.log(updateId);
  Trail.findOneAndUpdate({"_id":updateId}, req.body, {new: true})

    .then(function(err, trail){
      if (err) {
        console.log("error updating trail", err)
      }
      //console.log(trail);
      res.json(trail);
    });
}


function create(req, res) {

   var newTrail = new Trail(req.body);
  newTrail.save(function(err,trail){
    if(err){
      console.log("post error: " + err);
      res.sendStatus(500);
    }
  console.log("Success");
  res.json(newTrail);
});

}

function destroy(req, res) {
  console.log("trail_id:",req.params.id);
  var trailID = req.params.id;
  Trail.findByIdAndRemove({"_id": trailID}, function(err, trail) {
    if (err) {
      console.log("delete errror");
    }
    console.log("deleted trail successfully");
    res.json(trail);
  })
}
module.exports = {
  index: index,
 create: create,
  // show: show,
 destroy: destroy,
 update: update
};
