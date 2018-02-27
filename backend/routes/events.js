var express = require('express');
var router = express.Router();
const eventsController = require('../controllers').events;

/* GET home page. */
router.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Events API!',
}));

router.post('/api/events', eventsController.create);

router.get('/api/events', eventsController.list);


module.exports = router;
