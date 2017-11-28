const User = require('../models/user.js');

const authenticateHeaderKey = 'Authorization';

function login (req, res) {
  User.findByCredentials(req.body.email, req.body.password)
    .then((user) => {
      user.generateAuthToken()
        .then((token) => res.status(200).json({token: token}))
    })
    .catch((err) => res.status(401).send(err))
}

function logout (req, res) {
  req.user.removeToken(req.token.replace('JWT ', ''))
    .then(() => res.status(200).json({auth: false}))
    .catch((err) => res.status(400).send(err))
}

function register (req, res) {
  const user = new User(req.body);
  user.save()
    .then((user) => user.generateAuthToken())
    .then((token) => res.status(201).json({token: token}))
    .catch((err) => res.status(409).send(err))
}

const authenticate = (req, res, next) => {
  const authenticateHeaderValue = req.header(authenticateHeaderKey);
  if (!authenticateHeaderValue) res.status(401).send();
  const token = authenticateHeaderValue.replace('JWT ', '');
  User.findByToken(token).then((user) => {
    if (!user) return Promise.reject();
    req.user = user;
    req.token = token;
    next()
  }).catch((err) => res.status(401).send(err))
};

module.exports = {
  login,
  logout,
  register,
  authenticate
};
