var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const items = [
    { id: 1, text: 'About Express' },
    { id: 2, text: 'About Pug' },
    { id: 3, text: 'About SQLite' }
  ];
  res.render('index', { title: 'Module 10 Task 1', items,  showHelp: true });
});

module.exports = router;
