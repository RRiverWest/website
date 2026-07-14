import type { MDXComponents } from 'mdx/types'

const components: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1 className="text-3xl font-bold tracking-tight mt-8 mb-4" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-2xl font-semibold tracking-tight mt-8 mb-3" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-xl font-semibold tracking-tight mt-6 mb-2" {...props}>
      {children}
    </h3>
  ),
}

export function useMDXComponents(): MDXComponents {
  return components
}
