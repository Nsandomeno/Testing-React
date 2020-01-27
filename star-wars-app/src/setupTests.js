// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from 'react';
import { render, fireEvent, wait } from '@testing-library/jest-dom/extend-expect';
// From API Folder
import { getData as mockGetData } from './api/index.js';
// Component itself 
import StarWarsCharacters from './components/StarWarsCharacters.js';

jest.mock('./api/index')

test('Goes to next; Goes to previous', async () => {
    mockGetData.mockResolveValueOnce({ results: [
        {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair'
    }
]})

const { getByText } = render(<StarWarsCharacters />)
const nextButton = getByText(/next/i)
const prevButton = getByText(/previous/i)

fireEvent.click(nextButton)
fireEvent.click(prevButton)
expect(mockGetData).toHaveBeenCalledTimes(1)

wait(() => expect(getByText(/darth/i)))
})