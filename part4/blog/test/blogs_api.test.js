const mongoose = require('mongoose');
const { server } = require('../index');
const Blog = require('../models/blog');
const {
  initialBlogs,
  api,
  getAllContentFromBlogs,
} = require('../utils/helper');

beforeEach(async () => {
  await Blog.deleteMany({});

  for (const blog of initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test('should return the blogs as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('should return all blogs', async () => {
  const { blogsContent } = await getAllContentFromBlogs();
  expect(blogsContent.length).toBe(initialBlogs.length);
});

test('should add a valid blog', async () => {
  const newBlog = {
    title: 'title5',
    author: 'author8',
    url: 'url5',
    likes: 12,
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const { blogsContent } = await getAllContentFromBlogs();
  expect(blogsContent.length).toBe(initialBlogs.length + 1);
});

test('should define id for any blog in db', async () => {
  const { response } = await getAllContentFromBlogs();
  expect(response.body[0].id).toBeDefined();
});

test('should add the blog with default value in likes when is undefined', async () => {
  const newBlog = {
    title: 'no likes',
    author: 'jest',
    url: 'url85',
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(response.body.likes).toBeDefined();
  expect(response.body.likes).toBe(0);
});

test('should return status 400 when a blog for blog without title and url', async () => {
  const newBlog = {
    author: 'test',
    likes: 10,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const { blogsContent } = await getAllContentFromBlogs();
  expect(blogsContent.length).toBe(initialBlogs.length);
});

test('should update the likes in the blog', async () => {
  const { response } = await getAllContentFromBlogs();
  const { body: blogs } = response;
  const blogToUpdate = blogs[0];
  blogToUpdate.likes = 50;

  const secondResponse = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(201);

  expect(secondResponse.body.likes).toBe(blogToUpdate.likes);
});

test('should delete a blog', async () => {
  const { response } = await getAllContentFromBlogs();
  const { body: blogs } = response;
  const blogToDelete = blogs[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const { blogsContent } = await getAllContentFromBlogs();
  expect(blogsContent.length).toBe(initialBlogs.length - 1);
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
