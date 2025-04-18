const express = require('express');
const router = express.Router();
const {
    createEvent,
    getEvent,
    getEventsbysort,
    getUpcomingEvents
} = require('../controllers/EventController');


router.get('/', getEvent);
router.get('/upcoming', getUpcomingEvents);
router.get('/sort', getEventsbysort);

router.post('/', createEvent);

module.exports = router;