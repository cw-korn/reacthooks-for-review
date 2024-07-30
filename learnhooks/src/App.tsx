import { MouseEvent, KeyboardEvent, useCallback, useEffect, useState, useMemo, useRef } from 'react'
import './App.css'

interface User {
  id: number,
  username: string,
}
const myNum = 25;

type fibFunc = (n: number) => number //type function declaration type funcname = (parameter) => return type
const fib: fibFunc = (n) => { //using the function
  if (n < 2) return n
  return fib(n - 1) + fib(n - 2)
}


function App() {
  const [count, setCount] = useState<number>(0) //starting with number zero 
  const [users, setUsers] = useState<User[] | null>(null) //starting with null value 
  // const [count, setCount] = useState<User[]>([])  //passing interface
  // const [count, setCount] = useState<User>({} as User)  //lying to compiler
  const inputRef = useRef<HTMLInputElement>(null) //changing the value doesn't make component rerender

  // if(!inputRef.current)
  console.log(inputRef?.current)
  console.log(inputRef?.current?.value)

  //side effects! + dependencies , [] ->meaning it only run once when the component mounts and never again 
  //, [users]-> if users state change then triggers
  useEffect(() => {
    console.log('mounting')
    console.log('Users: ', users)
    // console.log('count', count)
    return () => console.log('unmounting') //clean up function
  }, [users]) 

  //callback so that function is memorized, don't forget to specify the type of event
  const addFive = useCallback((e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>): void => setCount(prev => prev + 5), []) 
  
  // already remember the results, recalculate when myNum value changes
  const result = useMemo<number>(() => fib(myNum), [myNum]) 
  return (
    <div className='App'>
      <h1>{count}</h1>
      {/* <button onClick= {()=> setCount(prev=> prev + 1)}>Add</button> */}
      <button onClick={addFive}>Add</button>
      <h2>{result}</h2>
      <input ref={inputRef} type='text' />
    </div>
  )
}

export default App
