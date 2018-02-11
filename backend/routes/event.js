var express = require('express');
var router = express.Router();
const eventController = require('../controllers').event;

/* GET home page. */
router.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Event API!',
}));

router.post('/api/activeEvent', eventController.createActive);

router.post('/api/inactiveEvent', eventController.createInactive);

router.get('/api/activeEvent', eventController.activeList);

router.get('/api/inactiveEvent', eventController.inactiveList);

module.exports = router;
