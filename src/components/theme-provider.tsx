import * as React from 'react'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'

const lightTheme = {
  colors: {
    background: '#ffffff',
    text: '#000000',
    primary: '#3b82f6',
    secondary: '#6b7280',
  },
}

const darkTheme = {
  colors: {
    background: '#2c2c2c',
    text: '#ffffff',
    primary: '#60a5fa',
    secondary: '#9ca3af',
  },
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: 'light' | 'dark'
}

const ThemeContext = React.createContext<{
  theme: 'light' | 'dark'
  toggleTheme: () => void
}>({
  theme: 'light',
  toggleTheme: () => {},
})

export function ThemeProvider({ children, defaultTheme = 'light' }: ThemeProviderProps) {
  const [theme, setTheme] = React.useState(defaultTheme)
  const currentTheme = theme === 'light' ? lightTheme : darkTheme

  const toggleTheme = React.useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <EmotionThemeProvider theme={currentTheme}>
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => React.useContext(ThemeContext)
