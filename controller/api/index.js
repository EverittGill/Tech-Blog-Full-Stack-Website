const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const articlesRoutes = require('./articlesRoutes');
const commentsRoutes = require('./commentsRoutes');

router.use('/users', usersRoutes);
router.use('/articles', articlesRoutes);
router.use('/comments', commentsRoutes);


module.exports = router;
