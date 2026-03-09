import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import '../globals.css'
import ClientShell from '@/components/ui/ClientShell'

export const metadata: Metadata = {
  title: 'Emiliano Arcos — Portfolio',
  description: 'Industrial & Systems Engineering Student. Python, React, Data Analysis.',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()
  return (
    <html lang={locale}>
      <body className="bg-[#050508] text-[#e8e8f0] antialiased">
        <NextIntlClientProvider messages={messages}>
          <ClientShell>
            {children}
          </ClientShell>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
