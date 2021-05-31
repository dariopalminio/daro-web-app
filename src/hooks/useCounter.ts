import { useState, useCallback } from 'react'

/**
 * Example of custom hook
 * @returns 
 */
function useCounter() {
  const [count, setCount] = useState(0)

  const increment = useCallback(() => {
    //console.log("Cuenta:", count)
    setCount((x) => x + 1)
    //console.log("Cuenta:", count)
  }
    , [])

  return { count, increment }
}

export default useCounter