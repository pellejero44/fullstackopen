const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const tokenExtractor = require('../middleware/tokenExtractor');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogsRouter.post('/', tokenExtractor, async (request, response, next) => {
  const { userId } = request;
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
