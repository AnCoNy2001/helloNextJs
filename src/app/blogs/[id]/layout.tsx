import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'View detail blogs',
  description: 'Description bla bla',
}

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
