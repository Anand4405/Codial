const express = require('express');
const router = express.Router();
const passport = require('passport');
const commentsController = require('../controllers/comments_controller');

router.post('/create',passport.checkAuthectication,commentsController.create);
router.get('/destroy/:id',passport.checkAuthectication,commentsController.destroy);
module.exports = router;