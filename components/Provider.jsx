"use client";

import { SessionProvider } from 'next-auth/react'

function Provider() {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
    )
}

export default Provider