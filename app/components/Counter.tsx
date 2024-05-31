import { useState } from 'react'
import { Button } from './ui/button'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <Button className="mx-1" onClick={() => setCount(count - 1)}>
        -
      </Button>
      <Button className="mx-1" onClick={() => setCount(0)}>
        {count}
      </Button>
      <Button className="mx-1" onClick={() => setCount(count + 1)}>
        +
      </Button>
    </div>
  )
}
