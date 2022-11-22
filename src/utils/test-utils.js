import '@testing-library/react'
import '@testing-library/jest-dom'
import { renderHook, act } from '@testing-library/react-hooks'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

const AllTheProviders = ({ children }) => {
    return children
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

afterEach(() => {
    cleanup()
})

// re-export everything
export * from '@testing-library/react'

// override render method & other helper packages
export { customRender as render, screen, userEvent, renderHook, act }
