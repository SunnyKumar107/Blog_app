import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: "Things I Don't Know as of 2018.",
    author: 'Dan Abramov',
    url: 'https://dan-abramov.com',
    likes: 0,
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText("Things I Don't Know as of 2018.")
  expect(element).toBeDefined()
})
