import { useState } from 'react'
import axios from 'axios'
import { useGreetingContext } from './GreetingProvider'


const FetchGreeting = ({ url }) => {
    const { state, actions } = useGreetingContext()
    const [btnClicked, setBtnClicked] = useState(false)
  
    const fetchGreeting = (url) =>
      axios
        .get(url)
        .then((res) => {
          const { data } = res
          const { greeting } = data
          actions.setSuccess(greeting)
          setBtnClicked(true)
        })
        .catch((e) => {
          actions.setError(e)
        })

  // button test
  const btnText = btnClicked ? 'Ready' : 'Get the greeting'

  return (
    <div>
      <button onClick={() => fetchGreeting(url)} disabled={btnClicked}>
        {btnText}
      </button>
      {/* if request is successfull */}
      {state.greeting && <h1 data-cy='heading'>{state.greeting}</h1>}
      {/* if request lead to error */}
      {state.error && <p role='alert'>Unable to get the greeting</p>}

    </div>
  )
}

export default FetchGreeting