/* eslint-disable import/no-unresolved */
const router = require('express').Router();
const controller = require('../controller/index');

router.route('/').post(controller.addPoll);
router.route('/:pollId').get(controller.getPoll);
router.route('/vote').patch(controller.vote);
router.route('/:pollId/result').get(controller.result);

module.exports = router;
