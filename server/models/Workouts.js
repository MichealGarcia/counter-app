const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    workoutName: {
        type: String,
        required: true,
    },
    workoutDate: {
        type: Date,
        required: true,
    },
    workoutCount: {
        type: Number,
        required: true,
    },
});

const Workout = mongoose.model("WorkoutData", workoutSchema);
module.exports = Workout;