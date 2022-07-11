import { render,queries } from '@testing-library/react'
import { GreetingProvider } from '../src/GreetingProvider'
import { jest } from '@jest/globals'


const customQueries = jest.requireActual('./custom-queries')



// all app providers
const AllProviders = ({ children }) => (
  <GreetingProvider>{children}</GreetingProvider>
)

// custom render
const customRender = (ui, options) =>
  render(ui, {
    // component wrap
    wrapper: AllProviders,
    queries: { ...queries, ...customQueries },
    ...options
  })

// export again `Testing Library`
export * from '@testing-library/react'
// method `render` update
export { customRender as render }