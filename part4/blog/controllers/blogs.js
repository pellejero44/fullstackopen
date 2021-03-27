const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/Blog');
const User = require('../models/User');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  const authorization = request.get('authorization');
  let token = null;
  if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')) {
    token = authorization.substring(7);
  }

  let decodedToken = {};
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch {}

  if (!token || !decodedToken.id) {
    return response.status(401).send({
      error: 'token missing or invalid',
    });
  }

  const { id: userId } = decodedToken;
  const user = await User.findById(userId);

  const blog = new Blog({
    ...request.body,
    user: user._id,
  });

  if (!blog.title || !blog.url) {
    return response
      .status(400)
      .json({ error: 'properties title or url missing' });
  }
  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog.toJSON());
  } catch (e) {
    next(e);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const { body } = request;
  const { id } = request.params;
  try {
    const blogUpdated = await Blog.findByIdAndUpdate(id, body, {
      new: true,
    });
    response.status(201).json(blogUpdated);
  } catch (e) {
    next(e);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params;
  try {
    await Blog.findByIdAndDelete(id);
    return response.status(204).end();
  } catch (e) {
    next(e);
  }
});

module.exports = blogsRouter;
