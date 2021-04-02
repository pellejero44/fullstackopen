import React, { useState } from 'react';
const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'View'}</button>
      <div style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a>
        <br />
        {blog.likes} likes
        <button>like</button>
        <br />
        {blog.user?.name}
      </div>
    </div>
  );
};

export default Blog;
