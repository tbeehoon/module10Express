const express = require('express');
const router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   const items = [
//     { id: 1, text: 'About Express' },
//     { id: 2, text: 'About Pug' },
//     { id: 3, text: 'About SQLite' }
//   ];
//   res.render('index', { title: 'Module 10 Task 1', items,  showHelp: true });
// });

router.get('/', function(req, res) {
  req.session.views = (req.session.views || 0) + 1;
  res.render('index', {
    title: 'Module10 Task1 - Bee Demo Express',
    sessionViews: req.session.views,
    username: req.session.username || null
  });
});

router.post('/set-name', (req, res) => {
  const name = (req.body.name || '').trim();
  if (name) req.session.username = name;
  res.redirect('/');
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('sid'); //  configured cookie name
    res.redirect('/');
  });
});

module.exports = router;
