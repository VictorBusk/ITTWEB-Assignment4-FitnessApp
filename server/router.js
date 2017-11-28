const express = require('express');
const router = express.Router();
const exercises = require('./controllers/exercises');
const workouts = require('./controllers/workouts');
const users = require('./controllers/users');

router.get('/', (req, res) => res.status(200).json({message: 'Hello World!'}));
router.post('/login', users.login);
router.post('/logout', users.authenticate, users.logout);
router.get('/me', users.authenticate, (req, res) => res.send(req.user));

router.post('/users', users.register);
// router.get('/users', users.readUsers);
// router.put('/users', users.authenticate, users.updateUser);
// router.delete('/users/:id', users.authenticate, users.deleteUser);

router.post('/workouts', users.authenticate, workouts.createWorkout);
router.get('/workouts', workouts.readWorkouts);
router.put('/workouts', users.authenticate, workouts.updateWorkout);
router.delete('/workouts/:id', users.authenticate, workouts.deleteWorkout);

router.post('/exercises', users.authenticate, exercises.createExercise);
router.get('/exercises/:id', exercises.readExercises);
router.put('/exercises', users.authenticate, exercises.updateExercise);
router.delete('/exercises/:id', users.authenticate, exercises.deleteExercise);

router.all('/*', function (req, res) {
  res.status(404).json({message: 'Not Found!'})
});

module.exports = router;
