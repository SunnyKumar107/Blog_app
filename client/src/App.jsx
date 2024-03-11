import { useState, useEffect } from 'react';
import './app.css';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const User = await loginService.login({
        username,
        password,
      });

      setUser(User);
      setUsername('');
      setPassword('');
      setMessage('login successfully');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      setMessage(error.response.data.error);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  // const loginForm = () => {};

  // const blogForm = () => {
  //   <div>
  //     <h3>{`${user.name} logged in`}</h3>
  //   </div>;
  // };

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const newBlog = await blogService.create({
        title: title,
        author: author,
        url: url,
      });

      setBlogs([newBlog, ...blogs]);
      setTitle('');
      setAuthor('');
      setUrl('');
      setMessage(`a new blog  ${newBlog.title} by ${newBlog.author}`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!user) {
    return (
      <div>
        <h1>Log in to application</h1>
        {message !== null ? <Notification message={message} /> : null}
        <br />
        <div>
          <form onSubmit={handleLogin}>
            <div>
              username:
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              password:
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        {message !== null ? <Notification message={message} /> : null}
        <h1>blogs</h1>
        <div>
          {user.name} logged-in <button>logout</button>
        </div>
      </div>
      <div>
        <h1>Create new</h1>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            author:
            <input
              type="text"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div>
            url:
            <input
              type="text"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
      <br />
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
