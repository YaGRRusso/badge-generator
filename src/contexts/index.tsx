import { ScriptProps } from 'next/script'

import { ThemeProvider } from './ThemeContext'

const AppProvider = ({ children }: ScriptProps) => {
  return <ThemeProvider>{children}</ThemeProvider>
}
export default AppProvider
