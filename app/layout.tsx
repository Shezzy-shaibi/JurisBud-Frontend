'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { useEffect, useState } from 'react';
import { useAuth } from './utils/hooks'
import { AuthContext } from './utils/contexts';

const inter = Inter({ subsets: ['latin'] })

// isnt allowed for client components.

// export const metadata: Metadata = {
//   title: 'JurisBUD AI',
//   description: 'Developed by UCL Computer Science 23-24 Team 5',
// }


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [isAuth, setIsAuth, username, setUsername] = useAuth();
  useEffect(()=>{console.log('render')}, []);

  return (
    <html data-theme="light" lang="en">
      <body className={inter.className}>
        <AuthContext.Provider value={{isAuth, setIsAuth, username, setUsername}}>
            {children}
        </AuthContext.Provider>
        </body>
    </html>
  )
}
