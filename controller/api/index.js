const router = require('express').Router();
const userRoutes = require('./userRoutes');
const articlesRoutes = require('./articlesRoutes');

router.use('/users', userRoutes);
router.use('/articles', articlesRoutes);


module.exports = router;
