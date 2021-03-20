require('./mongo');
const express = require('express');
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

const PORT = 3003;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
