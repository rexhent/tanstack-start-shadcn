import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <h3>
        This is a site built with TanStack Start using the start-basic example
        found in the TanStack Router Github.
      </h3>
    </div>
  )
}
