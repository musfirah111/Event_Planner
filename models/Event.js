const mongoose = require('mongoose');


const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'enter event name'],
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        enum: ['Meetings', 'Birthdays', 'Appointments']
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    starttime: {
        type: String,
        required: [true, 'enter event starting time'],
    },
    endtime: {
        type: String,
        required: [true, 'enter event endinging time'],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'enter userid'],
    },
    reminders: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("Event", EventSchema)