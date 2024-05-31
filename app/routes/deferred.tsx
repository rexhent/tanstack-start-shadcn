import { Await, createFileRoute, defer } from '@tanstack/react-router'
import { Suspense } from 'react'
import Counter from '~/components/Counter'

export const Route = createFileRoute('/deferred')({
  loader: () => {
    return {
      deferredStuff: defer(
        new Promise<string>((r) => setTimeout(() => r('Hello deferred!'), 5000))
      ),
    }
  },
  component: Deferred,
})

function Deferred() {
  const { deferredStuff } = Route.useLoaderData()

  return (
    <div className="p-2">
      <Suspense fallback="Loading...">
        <Await promise={deferredStuff} children={(data) => <h3>{data}</h3>} />
      </Suspense>

      <Counter />
    </div>
  )
}
