// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from 'react';
import { render, fireEvent, wait, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// From API Folder
import { getData as mockGetData } from '../api/index.js';
// Component itself 
import StarWarsCharacters from './StarWarsCharacters.js';

afterEach(cleanup)
jest.mock('../api/index')
//  mockGetData.mockResolvedValueOnce(
//     { results: [
//     {
//     name: 'test name',
//     url: 'test url'
//     }],
//     next: 'test next',
//     previous: null
// }
// )

test('Goes to next; Goes to previous', async () => {
    // async before () on line 27

    mockGetData.mockResolvedValueOnce(
        { results: [
        {
        name: 'test name',
        url: 'test url'
        }],
        next: 'test next',
        previous: null

    }
)

const { getByText } = render(<StarWarsCharacters />)

// const nextButton = getByText(/next/i)
// const prevButton = getByText(/previous/i)

// fireEvent.click(nextButton)
// fireEvent.click(prevButton)
expect(mockGetData).toHaveBeenCalledTimes(1)

await wait(() =>  expect(getByText(/test name/i)))
// await before wait on line 48
})

test('changing state with clicks', async () => {
    const { getByText } = render(<StarWarsCharacters />)
    mockGetData.mockResolvedValueOnce(
        { results: [
        {
        name: 'test name',
        url: 'test url'
        }],
        next: 'test next',
        previous: null
    }
)
     
    const nextButton = getByText(/next/i)
    // let prevButton = getByText(/previous/i)

    expect(mockGetData).toHaveBeenCalledTimes(1)
    fireEvent.click(nextButton)

    await wait(expect(getByText(/test url/i)))
})

test('render check on Previous Button', async () => {
    const { getByText, queryByTestId } = render(<StarWarsCharacters />)

    const prevButton = queryByTestId(/prevbtn/i)
    // expect(data).toHaveBeenCalledTimes(1)
    await wait(expect(prevButton).toBeVisible())
})

