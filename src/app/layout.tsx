import './globals.css'
import NavigationMenu from '@/components/ui/navigation-menu'

export const metadata = {
  title: 'GAWeb',
  description: 'Grand Archive TCG 社群網站',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <NavigationMenu />
        {children}
      </body>
    </html>
  )
}