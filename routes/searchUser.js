const express = require('express');
const router = express.Router();

const UserController = require('../controller/usercontroller');

const userController = new UserController();

router.get('/',userController.findUser)
router.get('/game',userController.findgame)


module.exports = router;
