const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


const WorkoutModel = require("./models/Workouts");

app.use(express.json());
app.use(cors());

mongoose.connect(
    'mongodb+srv://admin:Garguell1!@crud.mridttg.mongodb.net/workouts?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
    }
);

// to insert data into database
app.post("/insert", async (req, res) => {

    const workoutDate = req.body.workoutDate;
    const workoutName = req.body.workoutName;
    const workoutCount = req.body.workoutCount;

    const workouts = new WorkoutModel({
        workoutDate: workoutDate,
        workoutName: workoutName,
        workoutCount: workoutCount
    });

    try {
        await workouts.save();
        res.send("inserted data");
    } catch (err) {
        console.log(err);
    }
});

// to display data/ connect to app.js with useEffect
app.get("/read", async (req, res) => {
    // to find specific data use find({$where: {item: "specific"}})
    WorkoutModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }

        res.send(result);
    });
});

app.put("/update", async (req, res) => {

    const newWorkoutName = req.body.newWorkoutName;
    const id = req.body.id;

    try {
        await WorkoutModel.findById(id, (err, updatedWorkout) => {
            updatedWorkout.workoutName = newWorkoutName;
            updatedWorkout.save();
            res.send("update");
        })
    } catch (err) {
        console.log(err);
    }
});

app.delete("/delete/:id", async (req, res) => {

    const id = req.params.id;

    await WorkoutModel.findByIdAndRemove(id).exec();
    res.send('deleted')

})

app.listen(3001, () => {
    console.log("Server Running on Port 3001...");
});