import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Toggable';
import Notification from './components/Notification';
import loginService from './services/loginService';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState({
    message: null,
    type: null,
  });

  useEffect(() => {
    async function fetchData() {
      const initialBlogs = await blogService.getAll();
      const sortedBlogs = initialBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setNotificationMessage({
        message: exception.response.data.error,
        type: 'error',
      });
      setTimeout(() => {
        setNotificationMessage({ message: null, type: null });
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedUser');
    blogService.unsetToken();
    setUser(null);
  };

  const addBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject);
    returnedBlog.user = {
      name: user.name,
    };
    setBlogs(blogs.concat(returnedBlog));
    setNotificationMessage({
      message: `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      type: 'success',
    });
    setTimeout(() => {
      setNotificationMessage({ message: null, type: null });
    }, 2000);
  };

  const updateBlog = async (blogObject) => {
    const updated = await blogService.update(blogObject);
    const updatedBlogs = blogs
      .filter((b) => b.id !== blogObject.id)
      .concat(updated)
      .sort((a, b) => b.likes - a.likes);

    setBlogs(updatedBlogs);
  };

  const removeBlog = async (blog) => {
    const option = window.confirm(`remove ${blog.title} by ${blog.author}`);
    if (option) {
      await blogService.remove(blog.id);
    }
    setBlogs(blogs.filter((b) => b.id !== blog.id));
  };

  const renderCreateBlogForm = () => (
    <Togglable buttonLabel='new blog'>
      <h2>create new</h2>
      <BlogForm addBlog={addBlog} />
    </Togglable>
  );

  const renderLoginForm = () => (
    <div>
      <Notification
        message={notificationMessage.message}
        type={notificationMessage.type}
      />
      <h2>log in to application</h2>
      <LoginForm
        onSubmit={handleLogin}
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </div>
  );

  if (user === null) {
    {
      return renderLoginForm();
    }
  }

  return (
    <div>
      <Notification
        message={notificationMessage.message}
        type={notificationMessage.type}
      />
      <p>
        {user.user} logged in.
        <button onClick={handleLogout}>logout</button>
      </p>
      {renderCreateBlogForm()}
      <h2>blogs</h2>
      {blogs.map((blog) => (

        <Blog
          key={blog.id}
          blog={blog}
          handleUpdate={updateBlog}
          handleRemove={() => removeBlog(blog)}
          showRemoveButton={blog.user.name === user.name}
        />
      ))}
    </div>
  );
};

export default App;
