import React, { useState } from 'react'
import propTypes from 'prop-types'

const Blog = ({ blog, user, onHandleUpdateBlog, onHandleDeleteBlog }) => {
  const [showDetail, setShowDetail] = useState(false)
  const [showUser, setShowUser] = useState(true)

  const blogStyle = {
    border: '1px solid black',
    margin: '5px 0',
    padding: '5px',
  }

  const handleUpdateBlog = () => {
    onHandleUpdateBlog(blog.id, {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
    })

    setShowUser(false)
  }

  const handleDeleteBlog = () => {
    onHandleDeleteBlog(blog.id, {
      title: blog.title,
      author: blog.author,
    })
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} <b>{blog.author}</b>{' '}
        <button onClick={() => setShowDetail(!showDetail)}>
          {!showDetail ? 'View' : 'Hide'}
        </button>
      </div>
      {showDetail && (
        <div>
          <div>
            <a href={blog.url}>{blog.url}</a> <br />
            likes: {blog.likes} <button onClick={handleUpdateBlog}>Like</button>
            {showUser && <p>{user.name}</p>}
          </div>
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
