const usersRouter = require('express').Router();
const User = require('../models/User');

usersRouter.post('/', async (request, response, next) => {
  const { body } = request;
  const { username, name, password } = body;

  const user = new User({
    username,
    name,
    passwordHash: password,
  });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (e) {
    next(e);
  }
});

module.exports = usersRouter;