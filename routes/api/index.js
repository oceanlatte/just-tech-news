// collect all of the API routes and package them together
const router = require('express').Router();
const userRoutes = require('./user-routes');


// take routes from user-routes and prefix them with path /users in this file
router.use('/users', userRoutes);


module.exports = router;