const express = require('express')

const UserCtrl = require('../controllers/usercontroller');

const router = express.Router()

router.post('/users', UserCtrl.createUser) // Inserting user information.
router.get('/user/:id', UserCtrl.getUserById) // Getting Individual user information.
router.post('/usersdetails', UserCtrl.getUserDetails) // Getting All user details.

module.exports = router;