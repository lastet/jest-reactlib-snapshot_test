import { createContext, useContext, useReducer } from 'react'

// start state
const initialState = {
  error: null,
  greeting: null
}

// consts
const SUCCESS = 'SUCCESS'
const ERROR = 'ERROR'

// reducer
function greetingReducer(state, action) {
  switch (action.type) {
    case SUCCESS:
      return {
        error: null,
        greeting: action.payload
      }
    case ERROR:
      return {
        error: action.payload,
        greeting: null
      }
    default:
      return state
  }
}

// action creation
const createGreetingActions = (dispatch) => ({
  setSuccess(success) {
    dispatch({
      type: SUCCESS,
      payload: success
    })
  },
  setError(error) {
    dispatch({
      type: ERROR,
      payload: error
    })
  }
})

// context
const GreetingContext = createContext()

// provider
export const GreetingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(greetingReducer, initialState)

  const actions = createGreetingActions(dispatch)

  return (
    <GreetingContext.Provider value={{ state, actions }}>
      {children}
    </GreetingContext.Provider>
  )
}

// custom hook
export const useGreetingContext = () => useContext(GreetingContext)