import { createRootRoute } from '@tanstack/react-router'
import { Link, Outlet, ScrollRestoration } from '@tanstack/react-router'
import { Body, Head, Html, Meta, Scripts } from '@tanstack/start'
// import * as React from 'react'
import { useState, lazy, useEffect, Suspense } from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'
import { ThemeProvider } from '@/components/theme-provider'
import {
  // useQuery,
  // useMutation,
  // useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ModeToggle } from '~/components/mode-toggle'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      )

const queryClient = new QueryClient()

const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
)

export const Route = createRootRoute({
  meta: () => [
    {
      charSet: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    ...seo({
      title:
        'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
      description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
    }),
  ],
  links: () => [
    { rel: 'stylesheet', href: appCss },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
    { rel: 'icon', href: '/favicon.ico' },
  ],
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  const [showDevtools, setShowDevtools] = useState(false)

  useEffect(() => {
    // @ts-expect-error
    window.toggleDevtools = () => setShowDevtools((old) => !old)
  }, [])
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RootDocument>
          <Outlet />
        </RootDocument>
        <ReactQueryDevtools initialIsOpen />
        {showDevtools && (
          <Suspense fallback={null}>
            <ReactQueryDevtoolsProduction />
          </Suspense>
        )}{' '}
      </QueryClientProvider>
    </ThemeProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <NavigationMenu className="p-2 flex gap-2  items-center text-lg">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link
                    to="/"
                    activeProps={{
                      className: 'font-bold',
                    }}
                    activeOptions={{ exact: true }}
                  >
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    to={'/posts'}
                    activeProps={{
                      className: 'font-bold',
                    }}
                  >
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Posts
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    to="/layout-a"
                    activeProps={{
                      className: 'font-bold',
                    }}
                  >
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Layout
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    to="/deferred"
                    activeProps={{
                      className: 'font-bold',
                    }}
                  >
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Deffered
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    // @ts-expect-error
                    to="/this-route-does-not-exist"
                    activeProps={{
                      className: 'font-bold',
                    }}
                  >
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      This Route Does Not Exist
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <a
                    href="https://github.com/rexhent/tanstack-start-shadcn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Github
                    </NavigationMenuLink>
                  </a>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex flex-col justify-center mr-2">
              <ModeToggle />
            </div>
          </div>
          <hr />
        </div>
        {children}
        <ScrollRestoration />
        <Suspense>
          <TanStackRouterDevtools position="bottom-left" />
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  )
}
