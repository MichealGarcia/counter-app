const express = require('express');
const mongoose = require('mongoose');
const app = express();

const WorkoutModel = require("./models/Workouts");

app.use(express.json());

mongoose.connect(
    'mongodb+srv://admin:Garguell1!@crud.mridttg.mongodb.net/workouts?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
    }
);

app.get("/", async (req, res) => {
    const workouts = new WorkoutModel({ workoutDate: "July 7, 2022", workoutName: "push ups", workoutCount: 0 });

    try {
        await workouts.save();
    } catch (err) {
        console.log(err);
    }
})


app.listen(3001, () => {
    console.log("Server Running on Port 3001...");
});