import React from 'react'
import { render, screen } from 'utils/test-utils'
import { App } from './App'

test('Renders App Component', () => {
    render(<App />)
    expect(screen.getByRole('heading')).toHaveTextContent('Hello Cool world!')
})
