import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import BlogForm from './BlogForm';

afterEach(cleanup);

describe('<Blog />', () => {
  let component;
  let mockHandleAddBlog;
  const newBlog = {
    author: 'Jhon',
    title: 'La Croix',
    url: 'www.urltest.com',
  };

  beforeEach(() => {
    mockHandleAddBlog = jest.fn();
    component = render(<BlogForm addBlog={mockHandleAddBlog} />);
  });

  beforeEach(() => {
    const title = component.container.querySelector('#title');
    const author = component.container.querySelector('#author');
    const url = component.container.querySelector('#url');
    fireEvent.change(title, {
      target: { value: newBlog.title },
    });
    fireEvent.change(author, {
      target: { value: newBlog.author },
    });
    fireEvent.change(url, {
      target: { value: newBlog.url },
    });
    const form = component.container.querySelector('form');
    fireEvent.submit(form);
  });

  test('should check calls the event handler it received as props with the right details when a new blog is created', () => {
    expect(mockHandleAddBlog.mock.calls).toHaveLength(1);
    expect(mockHandleAddBlog.mock.calls[0][0].title).toBe(newBlog.title);
    expect(mockHandleAddBlog.mock.calls[0][0].author).toBe(newBlog.author);
    expect(mockHandleAddBlog.mock.calls[0][0].url).toBe(newBlog.url);
  });
});
