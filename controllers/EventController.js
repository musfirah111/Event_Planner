const Event = require('../models/Event')
const asyncHandler = require('express-async-handler')


const createEvent = asyncHandler(async (req, res) => {
    const { name, description, category, date, starttime, endtime } = req.body;

    if (!name || !date || !starttime || !endtime) {
        res.status(400);
    }

    const event = await Event.create({
        name,
        description,
        category,
        date,
        starttime,
        endtime,
        userId: req.user.id, 
        reminders: req.body.reminders ?? true
    });

    res.status(201).json({
        success: true,
        data: event
    });
});


const getEventsbysort = asyncHandler(async (req, res) => {
    const { sortBy } = req.query;
    let query = {};
    let sortOptions = {};


    switch (sortBy) {
        case 'date':
            sortOptions.date = 1;
            break;
        case 'category':
            sortOptions.category = 1;
            break;
        case 'reminders':
            sortOptions.reminders = 1;
            break;
        default:
            sortOptions.date = 1; 
    }

    try
    {
        const events = await Event.find(query)
            .sort(sortOptions);

        res.status(200).json({
            success: true,
            count: events.length,
            data: events
        });
    }
    catch (error)
    {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});


const getEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        res.status(404);
        throw new Error('Event not found');
    }

    if (event.userId.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized to access this event');
    }

    res.status(200).json({
        success: true,
        data: event
    });
});


const getUpcomingEvents = asyncHandler(async (req, res) => {
    const events = await Event.find({
        userId: req.user.id,
        date: { $gte: new Date() }
    })
    .sort({ date: 1 })
    .limit(10);

    res.status(200).json({
        success: true,
        count: events.length,
        data: events
    });
});

module.exports = {
    createEvent,
    getEventsbysort,
    getEvent,
    getUpcomingEvents
};