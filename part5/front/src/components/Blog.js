import React, { useState } from 'react';

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
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'View'}</button>
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

export default Blog;
