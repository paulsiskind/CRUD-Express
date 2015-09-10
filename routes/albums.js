var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/album-demo');
var albumCollection = db.get('albums');

// router.get('/albums', function(req, res, next) {
//   res.render('albums/index');
// });
router.get('/albums', function(req, res, next) {
  albumCollection.find({}, function (err, records) {
    res.render('albums/index', {allAlbums: records});
  });

router.get('/albums/new', function(req, res, next) {
  res.render('albums/new');
});

router.get('/albums/:id', function(req, res, next) {
  albumCollection.findOne({_id: req.params.id}, function (err, record) {
    res.render('albums/show', {theAlbum: record});
  });
});

router.post('/albums', function(req, res, next) {
  albumCollection.insert({ name: req.body.album_name });
  res.redirect('/albums');
});

});

module.exports = router;