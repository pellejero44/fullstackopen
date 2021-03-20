
const { app } = require('../index');
const supertest = require('supertest');
const api = supertest(app);

const initialBlogs = [
  {
    title: 'tile1',
    author: 'author1',
    url: 'url1',
    likes: 1,
  },
  {
    title: 'tile2',
    author: 'author2',
    url: 'url2',
    likes: 3,
  },
];

const getAllContentFromBlogs = async () => {
  const response = await api.get('/api/blogs');
  const blogsContent = response.body.map(blog => blog.content);
  return {
    response,
    blogsContent
  }
}

module.exports = {
  getAllContentFromBlogs,
  api,
  initialBlogs
}