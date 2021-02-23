const router = require('express').Router();
const {
  updateUser, getCurrentUser,
} = require('../controllers/users');
const { userUpdateValidator } = require('../middlewares/dataValidator');

router.get('/me', getCurrentUser);
router.patch('/me', userUpdateValidator, updateUser);

module.exports = router;
