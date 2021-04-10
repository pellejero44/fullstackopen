import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, handleUpdate, handleRemove, showRemoveButton }) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? '' : 'none' };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => setVisible(!visible);

  const addLike = async () => {
    const newBlog = JSON.parse(JSON.stringify(blog));
    newBlog.likes++;
    newBlog.user =
      typeof newBlog.user === 'string' ? newBlog.user : newBlog.user?.id;
    handleUpdate(newBlog);
  };

  return (
    <div style={blogStyle} className="blogContainer">
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a>
        <br />
        {blog.likes} likes
        <button onClick={addLike}>like</button>
        <br />
        {blog.user?.name}
        <br />
        {showRemoveButton ? <button onClick={handleRemove}>Remove</button> : ''}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
  handleRemove: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  showRemoveButton: PropTypes.bool.isRequired,
};

export default Blog;
