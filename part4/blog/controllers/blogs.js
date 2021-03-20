const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);
  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'properties title or url missing' });
  }
  try {
    await blog.save();
    response.status(201).json(blog);
  } catch (e) {
    next(e);
  }
});

module.exports = blogsRouter;
