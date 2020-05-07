const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const authorRoute = require('./author.route');
const tagRoute = require('./tag.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/authors', authorRoute);
router.use('/tags', tagRoute);

module.exports = router;
