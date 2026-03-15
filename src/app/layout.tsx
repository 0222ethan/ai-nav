import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI 工具导航 - 每日更新',
  description: '发现最新 AI 工具，每日更新',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
