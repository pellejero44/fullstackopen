import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import loginService from './services/loginService';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState({message: null, type: null});
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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
        type: 'error'
      });
      setTimeout(() => {
        setNotificationMessage({message: null, type: null});
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedUser');
    blogService.unsetToken();
    setUser(null);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url,
    };

    const returnedBlog = await blogService.create(blogObject);
    returnedBlog.user = {
      name: user.name,
    };
    setBlogs(blogs.concat(returnedBlog));
    setTitle('');
    setAuthor('');
    setUrl('');
    setNotificationMessage({
      message: `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      type: 'success'
    }
    );
    setTimeout(() => {
      setNotificationMessage({message: null, type: null});
    }, 2000);
  };

  const renderCreateBlogForm = () => (
    <>
      <h2>create new</h2>
      <BlogForm
        onSubmit={addBlog}
        title={title}
        author={author}
        url={url}
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        handleUrlChange={({ target }) => setUrl(target.value)}
      />
    </>
  );

  const renderLoginForm = () => (
    <div>
      <Notification message={notificationMessage.message} type={notificationMessage.type}/>
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
      <Notification message={notificationMessage.message} type={notificationMessage.type}/>
      <p>
        {user.user} logged in.
        <button onClick={handleLogout}>logout</button>
      </p>
      {renderCreateBlogForm()}
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
