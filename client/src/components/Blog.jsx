import React, { useState } from 'react'
import propTypes from 'prop-types'

const Blog = ({ blog, user, onHandleUpdateBlog, onHandleDeleteBlog }) => {
  const [showDetail, setShowDetail] = useState(false)
  const [showUser, setShowUser] = useState(true)
  const [userLikes, setUserLikes] = useState(blog.likes)

  const blogStyle = {
    border: '1px solid black',
    margin: '5px 0',
    padding: '5px',
  }

  const handleAddLike = () => {
    onHandleUpdateBlog(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    })
    setUserLikes(userLikes + 1)
    setShowUser(false)
  }

  const handleDeleteBlog = () => {
    onHandleDeleteBlog(blog.id, {
      title: blog.title,
      author: blog.author,
    })
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} <b>{blog.author}</b>{' '}
        <button onClick={() => setShowDetail(!showDetail)}>
          {showDetail ? 'Hide' : 'Show'}
        </button>
      </div>
      {showDetail && (
        <div>
          <div>
            <a href={blog.url}>{blog.url}</a> <br />
            likes: {userLikes} <button onClick={handleAddLike}>Like</button>
            {showUser && <p>{blog.user.username}</p>}
          </div>
          {blog.user.username === user.username && (
            <button
              onClick={handleDeleteBlog}
              style={{
                backgroundColor: 'blue',
                border: 'none',
                color: 'white',
                padding: '5px 10px',
                marginTop: '10px',
                borderRadius: '3px',
              }}
            >
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: propTypes.object.isRequired,
  user: propTypes.object.isRequired,
  onHandleUpdateBlog: propTypes.func.isRequired,
  onHandleDeleteBlog: propTypes.func.isRequired,
}

export default Blog
