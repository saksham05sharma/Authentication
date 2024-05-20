const mongoose = require('mongoose')

let a = new Date();

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    discription: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    time: {
        type: String,
        default: `${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}`
    },
    done: {
        type: Boolean,
        default: false,
    },
    trashed: {
        type: Boolean,
        default: false,
    },
},
{ timestamps: true }
);

const Task = mongoose.model('Task',taskSchema);
module.exports = Task