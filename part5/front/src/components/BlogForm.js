import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url,
    };

    addBlog(blogObject);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input
          id='title'
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          id='author'
          type='text'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          id='url'
          type='text'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="form-blog-button" type='submit'>create</button>
    </form>
  );
};

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
};

export default BlogForm;
