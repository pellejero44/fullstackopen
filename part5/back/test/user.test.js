const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { server } = require('../index');
const User = require('../models/User');
const {
  api,
  getUsers
} = require('../utils/helper');

describe.only('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('pswd', 10);
    const user = new User({username: 'pellejerodev', passwordHash});

    await user.save();
  });

  test('should create the user', async () => {
    const userAtStart = await getUsers();

    const userToAdd = {
      username: 'pellejeroot',
      name: 'Angel',
      password: 'pwd23',
    };

    await api
      .post('/api/users')
      .send(userToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/);

      const userAtEnd = await getUsers();
      expect(userAtEnd).toHaveLength(userAtStart.length + 1);
  });

  test('should fail with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await getUsers();

    const userToAdd = {
      username: 'pellejerodev',
      name: 'pellejerodev',
      password: 'pellejerodev',
    };

    const result = await api
      .post('/api/users')
      .send(userToAdd)
      .expect(409)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');
    const usersAtEnd = await getUsers();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test('should fail with proper statuscode and message if username is less than 3 characters', async () => {
    const usersAtStart = await getUsers();
    const userToAdd = {
      username: 'pe',
      password: 'secret',
    };

    const result = await api
      .post('/api/users')
      .send(userToAdd)
      .expect(409)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('minimum allowed length');
    const usersAtEnd = await getUsers();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test('should fails with proper statuscode and message if password is less than 3 characters', async () => {
    const usersAtStart = await getUsers();
    const newUser = {
      username: 'foo',
      password: 'bo',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('password must be at least 3 characters');
    const usersAtEnd = await getUsers();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });
});

 