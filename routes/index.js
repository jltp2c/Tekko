const router = require('express').Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/*links auth, user and insights roots to this page*/

router.use('/auth', require('./auth.routes'));
router.use('/user', require('./user.routes'));
router.use('/insights', require('./insights.routes'));

module.exports = router;