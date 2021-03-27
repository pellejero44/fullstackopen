const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/User');

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User
      .find({})
      .populate('blogs', {
        url: 1,
        title: 1,
        author: 1,
      });
    response.json(users.map(u => u.toJSON()));
  } catch (exception) {
    next(exception);
  }
});

usersRouter.post('/', async (request, response, next) => {
  const { body } = request;
  const { username, name, password } = body;
  const saltRounds = 10;
  try {
    if (password.length < 3) {
      return response
        .status(400)
        .json({ error: 'password must be at least 3 characters long' });
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (e) {
    next(e);
  }
});

module.exports = usersRouter;
