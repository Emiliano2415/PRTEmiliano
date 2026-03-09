import type { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import ClientShell from '@/components/ui/ClientShell'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ClientShell>
        {children}
      </ClientShell>
    </NextIntlClientProvider>
  )
}
