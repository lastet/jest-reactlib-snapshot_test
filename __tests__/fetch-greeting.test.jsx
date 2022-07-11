import { rest } from 'msw'
import { setupServer } from 'msw/node'
import userEvent from '@testing-library/user-event'
import { render, fireEvent, waitFor, screen } from 'test-utils'
import '@testing-library/jest-dom'
import FetchGreeting from '../src/FetchGreeting'

const server = setupServer(
    rest.get('/greeting', (req, res, ctx) =>
      res(ctx.json({ greeting: 'Bonjour!' }))
    )
  )

  // start the server before the test run
beforeAll(() => server.listen())
// reset handelers to default before each test 
afterEach(() => server.resetHandlers())
// stop the server after all tests
afterAll(() => server.close())

describe('Getting the Greeting', () => {
    test('-> successfull greeting', async function () {
        // component render
        // https://testing-library.com/docs/react-testing-library/api/#render
        const { container, getByDataCy } = render(<FetchGreeting url='/greeting' />)
        expect(container).toMatchSnapshot()
      
        // sending request via button click
        // https://testing-library.com/docs/dom-testing-library/api-events#fireevent
        //
        // screen bind to document.body
        // https://testing-library.com/docs/queries/about/#screen
        fireEvent.click(screen.getByText('Get the greeting'))
      
        // wait for heading render
        // https://testing-library.com/docs/dom-testing-library/api-async/#waitfor
        await waitFor(() => screen.getByRole('heading'))
        expect(container).toMatchSnapshot()
      
        // heading should contain `Bonjour!`
        expect(getByDataCy('heading')).toHaveTextContent('Bonjour!')
        // button text should be "Ready"
        expect(screen.getByRole('button')).toHaveTextContent('Ready')
        // button should be disabled
        expect(screen.getByRole('button')).toBeDisabled()
      })

        it('-> server error', async () => {
        // return status code `500`
        server.use(rest.get('/greeting', (req, res, ctx) => res(ctx.status(500))))
    
        // component render
        const { container } = render(<FetchGreeting url='greeting' />)
        expect(container).toMatchSnapshot()
        // button click
        // https://testing-library.com/docs/user-event/setup
        const user = userEvent.setup()

        // use 'await'  
        await user.click(screen.getByText('Get the greeting'))
    
        // wait for error render
        await waitFor(() => screen.getByRole('alert'))
        expect(container).toMatchSnapshot()
    
        // error text assert
        expect(screen.getByRole('alert')).toHaveTextContent(
        'Unable to get the greeting')

        // button is not disabled
        expect(screen.getByRole('button')).not.toBeDisabled()
    })
  
  })