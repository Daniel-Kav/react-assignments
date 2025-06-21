
import { useReducer } from 'react'
const reducer = (count: number, action: string) => {
    switch(action) {
        case 'increment':
            return count + 1
        case 'decrement':
            return count - 1
        case 'reset':
            return 30
        default:
            return count
    }
 }
const initialState = 0

function Counter() {
//   const [count, setCount] = useState(0)
     const [count, dispatch] = useReducer(reducer, initialState)
     const [count2, dispatch2] = useReducer(reducer, initialState)


 
  return (
    <div>
      <h1>Counter</h1>
      <button onClick={() => dispatch('increment')}>Increment</button>
      <p>Count: {count}</p>
      <button onClick={() => dispatch('decrement')}>Decrement</button>
      <button onClick={() => dispatch('reset')}>Reset</button>
    </div>
  )
}

export default Counter
