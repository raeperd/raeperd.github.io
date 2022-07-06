import { AppProps } from 'next/app'
import Head from 'next/head';
import '../public/app.css'
import '../public/katex.min.css'
import { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDarkMode } from 'usehooks-ts';
import Script from 'next/script';
import { getSiteName, getSocialNavProps } from '../lib/configuration';
import { SocialNav, SocialProps } from '../components/SocialNav';

export default function MyApp({ Component, pageProps }: AppProps) {
  const siteName = getSiteName()
  return (
    <Layout
      siteName={siteName}
      menus={[
        { name: 'Articles', href: '/articles' },
        { name: 'References', href: '/references' },
        { name: 'Algorithms', href: '/algorithms' },
        { name: 'Tags', href: '/tags' },
      ]}
      socials={getSocialNavProps()
        .filter(((social) => social.siteName === 'github' || social.siteName === 'linkedin'))}
    >
      <Head>
        <title>{siteName}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LGXK49RW6X');
          `}
      </Script>
    </Layout>
  )
}

function Layout({ siteName, menus, socials, children }: LayoutProps) {
  return (
    <>
      <Header siteName={siteName} menus={menus} socials={socials} />
      <main className="main">{children}</main>
      <Footer siteName={siteName} />
    </>
  )
}

type LayoutProps = {
  siteName: string,
  menus: MenuProps[],
  socials: SocialProps[],
  children: ReactNode
}

function Header({ siteName, menus, socials }: HeaderProps) {
  return (
    <header id="layout-header">
      <Link href="/">
        <a data-cy="header-root-link">{siteName}</a>
      </Link>
      <DarkModeToggleButton />
      <MenuNav menus={menus} />
      <SocialNav socials={socials} />
    </header>
  )
}

function Footer({ siteName }: { siteName: string }) {
  return (
    <footer id="layout-footer">
      <p>
        &copy;
        {new Date().getFullYear()}
        &nbsp;
        <Link href="/"><a data-cy="footer-root-link">{siteName}</a></Link>
      </p>
      <p>
        Powered by
        {' '}
        <a href="https://nextjs.org/" rel="noopener noreferrer" target="_blank">NextJS</a>
      </p>
      <p>
        <a
          href="https://github.com/raeperd/nextjs-paper"
          rel="noopener noreferrer"
          target="_blank"
        >
          {' '}
          Paper
        </a>
      </p>
    </footer>
  )
}

function DarkModeToggleButton() {
  const { isDarkMode, toggle } = useDarkMode()

  useEffect(() => {
    const body = document.body.classList
    if (isDarkMode) {
      body.add('dark')
    } else {
      body.remove('dark')
    }
  }, [isDarkMode])

  return (
    <button
      aria-label="darkMode-toggle-button"
      type="button"
      id="dark-mode-button"
      onClick={toggle}
    />
  )
}

function MenuNav({ menus }: { menus: MenuProps[] }) {
  const router = useRouter()
  return (
    <nav id="main-menu-nav">
      {menus.map((menu) => (
        <Link href={menu.href} key={menu.name}>
          <a
            className={router.pathname.startsWith(menu.href) ? 'active' : ''}
            data-cy={menu.href}
          >
            {menu.name}
          </a>
        </Link>
      ))}
    </nav>
  )
}

interface HeaderProps {
  siteName: string,
  menus: MenuProps[],
  socials: SocialProps[]
}

interface MenuProps {
  name: string,
  href: string
}
