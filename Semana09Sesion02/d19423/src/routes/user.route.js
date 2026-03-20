const controller = require('../controllers/user.controller');
const userRouter = require('express').Router();
userRouter.post('/',controller.addUser);

module.exports = {userRouter}