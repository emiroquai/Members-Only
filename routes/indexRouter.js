const { Router } = require("express");
const indexRouter = Router();
const indexController = require('../controllers/indexController');


indexRouter.get('/', indexController.getHome);
indexRouter.get('/sign-up', indexController.getSignUp);
indexRouter.post('/sign-up', indexController.confirmPassword, indexController.postSignUp);

indexRouter.post("/log-in", indexController.logInUser);
indexRouter.get('/log-out', indexController.logOutUser);

module.exports = indexRouter;