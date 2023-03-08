import { createSignal } from "solid-js"

export function Counter() {
   const [count, setCount] = createSignal(0)
   return (
      <>
         <div>{count()}</div>
         <button onclick={[setCount, (c) => c + 1]}>Increment</button>
      </>
   )
}
