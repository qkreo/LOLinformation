const express = require('express');
const router = express.Router();

const UserController = require('../controller/usercontroller');

const userController = new UserController();

router.post('/Challengers',userController.findChallengers)
router.post('/Grandmasters',userController.findGrandmasters)
router.post('/Masters',userController.findMasters)
router.post('/:Tier',userController.findTiers)

module.exports = router;
