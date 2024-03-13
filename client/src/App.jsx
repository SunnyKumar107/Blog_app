import { useState, useEffect } from 'react';
import './app.css';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [showBlogForm, setShowBlogForm] = useState(false);

  const showMessage = (msg, type) => {
    setMessage({
      msg,
      type,
    });

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (userObject) => {
    try {
      const User = await loginService.login({
        username: userObject.username,
        password: userObject.password,
      });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(User));

      blogService.setToken(User.token);
      setUser(User);
      // setMessage('login successfully');
      showMessage('Login successfully!', 'success');
    } catch (error) {
      showMessage('Wrong username or password!', 'error');
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

    if (loggedUserJSON) {
      const User = JSON.parse(loggedUserJSON);
      setUser(User);
      blogService.setToken(User.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    // window.localStorage.clear();
    location.reload();

    showMessage('Logout successfully!', 'success');
  };

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create({
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
      });
      blogService.getAll().then((blogs) => setBlogs(blogs));

      showMessage(
        `A new blog  ${newBlog.title} by ${newBlog.author}`,
        'success'
      );
    } catch (error) {
      showMessage('Create new blog failed!', 'error');
    }
  };

  const handleUpdateBlog = async (id, blogObject) => {
    try {
      await blogService.update(id, blogObject);
      blogService.getAll().then((blogs) => setBlogs(blogs));
    } catch (error) {
      showMessage('Update blog failed!', 'error');
    }
  };

  const handleDeleteBlog = async (id, blogObject) => {
    try {
      const isDelete = window.confirm(
        `Remove ${blogObject.title} by ${blogObject.author}`
      );

      if (isDelete) {
        await blogService.deleteBlog(id);
        blogService.getAll().then((blogs) => setBlogs(blogs));

        showMessage(
          `Removed blog ${blogObject.title} by ${blogObject.author}`,
          'success'
        );
      }
    } catch (error) {
      showMessage('Failed delete blog!', 'error');
    }
  };

  if (!user) {
    return <LoginForm onLoginHandler={handleLogin} message={message} />;
  }

  return (
    <div>
      <div>
        {message !== null ? <Notification message={message} /> : null}
        <h1>blogs</h1>
        <div>
          {user.name} logged-in{' '}
          <button type="button" onClick={handleLogout}>
            logout
          </button>
        </div>
      </div>

      {showBlogForm ? (
        <div>
          <BlogForm
            createBlog={addBlog}
            afterAddedBlog={() => setShowBlogForm(false)}
          />
          <div>
            <button onClick={() => setShowBlogForm(false)}>cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <br />
          <button onClick={() => setShowBlogForm(!showBlogForm)}>
            create new
          </button>
        </div>
      )}

      {!showBlogForm && (
        <div>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              onHandleUpdateBlog={handleUpdateBlog}
              onHandleDeleteBlog={handleDeleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
