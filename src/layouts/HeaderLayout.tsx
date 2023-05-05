import { Button, ErrorBoundary } from '@/components'
import { useThemeContext } from '@/contexts/ThemeContext'
import clsx from 'clsx'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  GithubLogo,
  ImageSquare,
  MoonStars,
  Sun,
  Translate,
} from 'phosphor-react'
import { HTMLAttributes, useMemo } from 'react'

export interface HeaderLayoutProps extends HTMLAttributes<HTMLDivElement> {}

const HeaderLayout: NextPage<HeaderLayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useThemeContext()
  const router = useRouter()

  const nextLang = useMemo(() => {
    switch (router.locale) {
      case 'pt-BR':
        return 'en-US'
      case 'en-US':
        return 'pt-BR'
    }
    console.log(router.locale)
  }, [router])

  const currentTheme = useMemo(() => {
    return theme === 'dark' ? 'dark bg-slate-900 text-slate-100' : ''
  }, [theme])

  return (
    <div className={clsx('flex min-h-screen flex-col', currentTheme)}>
      <header className="container flex items-center justify-center gap-6 py-8 text-3xl">
        <Link href="https://github.com/YaGRRusso/template-next" target="_blank">
          Shields.io Generator
        </Link>
      </header>
      <ErrorBoundary>
        <>{children}</>
      </ErrorBoundary>
      <footer className="container flex items-center justify-center gap-4 py-8 text-xl">
        <Button onClick={toggleTheme} size="xs" variant="light">
          {theme === 'dark' ? <MoonStars /> : <Sun />}
        </Button>
        <Button size="xs" variant="light" asChild>
          <Link href="" locale={nextLang}>
            <Translate />
          </Link>
        </Button>
        <Button size="xs" variant="light" asChild>
          <Link
            href="https://github.com/YaGRRusso/shields-io-generator"
            target="_blank"
          >
            <GithubLogo />
          </Link>
        </Button>
        <Button size="xs" variant="light" asChild>
          <Link href="https://simpleicons.org/" target="_blank">
            <ImageSquare />
          </Link>
        </Button>
      </footer>
    </div>
  )
}

export default HeaderLayout
