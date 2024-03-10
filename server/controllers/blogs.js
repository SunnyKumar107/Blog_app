const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const userExtractor = require('../utils/middleware').userExtractor;

blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body;
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' });
    }
    const user = await User.findById(decodedToken.id);
    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user.id,
    });
    const savedblog = await newBlog.save();
    user.blogs = user.blogs.concat(savedblog._id);
    await user.save();
    return response.status(201).send(newBlog);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.get('/', async (request, response, next) => {
  try {
    const allBlogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    });
    response.status(200).json(allBlogs);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    response.status(404).end();
  }

  console.log(user);

  if (user._id.toString() === blog.user.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).send(blog);
  }
});

module.exports = blogsRouter;
