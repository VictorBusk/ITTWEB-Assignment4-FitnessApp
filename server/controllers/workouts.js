const Workout = require('../models/workout');

const timeout = process.env.API_DELAY;

function createWorkout (req, res) {
  setTimeout(() => {

    const workout = new Workout(req.body);
    workout.save()
      .then((workout) => res.status(201).json(workout))
      .catch((err) => res.status(400).send())

  }, timeout)

}

function readWorkouts (req, res) {
  setTimeout(() => {

    Workout.find({})
      .then((workouts) => res.status(200).json(workouts))
      .catch((err) => res.status(404).send())

  }, timeout)
}

function updateWorkout (req, res) {
  setTimeout(() => {

    Workout.findByIdAndUpdate(req.body._id, req.body)
      .then((workout) => res.status(200).json(workout))
      .catch((err) => res.status(404).send())

  }, timeout)
}

function deleteWorkout (req, res) {
  setTimeout(() => {

    Workout.findByIdAndRemove(req.params.id)
      .then((workout) => res.status(200).json(workout))
      .catch((err) => res.status(404).send())

  }, timeout)
}

module.exports = {
  createWorkout,
  readWorkouts,
  updateWorkout,
  deleteWorkout
};
