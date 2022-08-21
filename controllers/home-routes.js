const router = require('express').Router();

// file contains all the user-facing routes, like login and homepage


router.get('/', (req, res) => {
  res.render('homepage');
});

module.exports = router;