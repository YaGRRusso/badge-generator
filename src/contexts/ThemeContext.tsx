import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

type ThemeProps = 'light' | 'dark'

export interface ThemeContextProps {
  theme: ThemeProps
  toggleTheme: () => void
  setTheme: (data: ThemeProps) => void
}

export const ThemeContext = createContext<ThemeContextProps>(
  {} as ThemeContextProps
)

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeProps>('light')

  useEffect(() => {
    let localTheme = localStorage.getItem('templateTheme')

    if (!localTheme) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        localTheme = 'dark'
      } else {
        localTheme = 'light'
      }
      localStorage.setItem('templateTheme', localTheme)
    }

    setTheme(localTheme as ThemeProps)
  }, [])

  const handleChangeTheme = useCallback((data: ThemeProps) => {
    setTheme(data)
    localStorage.setItem('templateTheme', data)
  }, [])

  const handleToggleTheme = useCallback(() => {
    if (theme === 'dark') handleChangeTheme('light')
    if (theme === 'light') handleChangeTheme('dark')
  }, [handleChangeTheme, theme])

  return (
    <ThemeContext.Provider
      value={{
        setTheme: handleChangeTheme,
        toggleTheme: handleToggleTheme,
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = (): ThemeContextProps => {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('Context should be used under a provider')
  }

  return context
}
