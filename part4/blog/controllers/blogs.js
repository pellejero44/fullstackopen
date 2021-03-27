const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {
      username: 1,
      name:1,
    });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);
  if (!blog.title || !blog.url) {
    return response
      .status(400)
      .json({ error: 'properties title or url missing' });
  }
  try {
    await blog.save();
    response.status(201).json(blog);
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
