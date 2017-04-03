var express = require('express');
var router = express.Router();
var message = require('../message/message');

/* GET users listing. */
router.get('/', function (req, res, next) {
  var db = req.db;
  var userCol = db.collection('users');
  userCol.find({}).toArray((err, items) => {
    if (err) return console.log(err);
    res.json(items);
  });
});

router.post('/', (req, res, next) => {
  var db = req.db;
  var userCol = db.collection('users');
  userCol.insert(req.body, (err, result) => {
    if (err) res.status(500).send(err);
    if (req.xhr) {
      res.status(200).send(message.insertUserSuccess);
    } else {
      res.redirect('/');
    }
  });
});
module.exports = router;
