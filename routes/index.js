const router = require('express').Router();
const apiRoutes = require('./api');

// this file is taking all the API endpoints and prefixing with the path '/api' 

router.use('/api', apiRoutes);

// if request is made to any endpoint that doesn't exist response is 404 error
// this is a RESTful API practice
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;