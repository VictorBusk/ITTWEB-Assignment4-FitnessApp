const Workout = require('../models/workout');
const Exercise = require('../models/exercise');

const timeout = process.env.API_DELAY;

function createExercise (req, res) {
  setTimeout(() => {

    const exercise = new Exercise(req.body);
    exercise.save()
      .then((exercise) => res.status(201).json(exercise))
      .catch((err) => res.status(400).send())

  }, timeout)

}

function readExercises (req, res) {
  setTimeout(() => {

    Workout.findById(req.params.id)
      .populate('exercises')
      .then((workout) => res.status(200).json(workout.exercises))
      .catch((err) => res.status(404).send());

    // Exercise.find({})
    //   .then((exercise) => res.status(200).json(exercise))
    //   .catch((err) => res.status(404).send())

  }, timeout)
}

function updateExercise (req, res) {
  setTimeout(() => {

    Exercise.findByIdAndUpdate(req.body._id, req.body)
      .then((exercise) => res.status(200).json(exercise))
      .catch((err) => res.status(404).send())

  }, timeout)
}

function deleteExercise (req, res) {
  setTimeout(() => {

    Exercise.findByIdAndRemove(req.params.id)
      .then((exercise) => res.status(200).json(exercise))
      .catch((err) => res.status(404).send())

  }, timeout)
}

module.exports = {
  createExercise,
  readExercises,
  updateExercise,
  deleteExercise
};
