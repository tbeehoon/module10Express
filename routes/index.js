const express = require('express');
const router = express.Router();

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
