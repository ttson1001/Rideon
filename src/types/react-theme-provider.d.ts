declare module 'react-theme-provider' {
  import * as React from 'react'

  interface ThemeProviderProps {
    defaultTheme?: 'light' | 'dark'
    children: React.ReactNode
  }

  export const ThemeProvider: React.FC<ThemeProviderProps>
} 