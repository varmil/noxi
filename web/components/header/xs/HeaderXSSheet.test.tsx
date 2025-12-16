import React from 'react'
import { render, screen } from '@testing-library/react'

// Mock all external dependencies
jest.mock('lib/auth', () => ({
  auth: jest.fn().mockResolvedValue(null)
}))

jest.mock('hooks/useGroups', () => ({
  getGroups: jest.fn().mockResolvedValue({
    imgs: [],
    icons: []
  })
}))

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockImplementation((namespace: string) => {
    const messages: Record<string, Record<string, string>> = {
      Components: {
        'styles.more': 'More',
        'contact.title': 'Contact',
        'channelsAdd.title': 'Add your channel',
        'groupsAdd.title': 'Add your group',
        'auth.signOut': 'Sign Out'
      }
    }
    return Promise.resolve((key: string) => messages[namespace]?.[key] || key)
  })
}))

jest.mock('lib/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
}))

jest.mock('components/header/xs/HeaderItem', () => ({
  SignOutInSheet: () => <div data-testid="sign-out" />
}))

jest.mock('components/pwa/PWAInstallContext', () => ({
  PWAInstallButton: () => <div data-testid="pwa-install" />
}))

jest.mock('@/components/ui/button', () => ({
  Button: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  )
}))

jest.mock('@/components/ui/separator', () => ({
  Separator: () => <hr />
}))

jest.mock('@/components/ui/sheet', () => ({
  Sheet: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SheetTrigger: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SheetContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SheetHeader: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SheetTitle: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SheetDescription: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )
}))

jest.mock('components/ModeToggle', () => ({
  ModeToggle: () => <div data-testid="mode-toggle" />
}))

jest.mock('components/header/HeaderLink', () => ({
  __esModule: true,
  default: ({
    name,
    href
  }: {
    name: string
    href: string
    icon: React.ReactNode
    active?: boolean
  }) => <a href={href}>{name}</a>
}))

jest.mock('components/icons/PrivacyPolicyIcon', () => ({
  __esModule: true,
  default: () => <div data-testid="privacy-policy-icon" />
}))

jest.mock('components/language-switcher/components/LanguageSwitcher', () => ({
  __esModule: true,
  default: () => <div data-testid="language-switcher" />
}))

jest.mock('components/styles/Image', () => ({
  __esModule: true,
  default: () => <div data-testid="image" />
}))

// Import after mocks
import HeaderXSSheet from './HeaderXSSheet'

describe('HeaderXSSheet', () => {
  it('renders /groups/add link', async () => {
    const HeaderXSSheetComponent = await HeaderXSSheet()

    render(HeaderXSSheetComponent)

    const groupsAddLink = screen.getByRole('link', { name: /add your group/i })
    expect(groupsAddLink).toBeInTheDocument()
    expect(groupsAddLink).toHaveAttribute('href', '/groups/add')
  })

  it('renders /channels/add link', async () => {
    const HeaderXSSheetComponent = await HeaderXSSheet()

    render(HeaderXSSheetComponent)

    const channelsAddLink = screen.getByRole('link', {
      name: /add your channel/i
    })
    expect(channelsAddLink).toBeInTheDocument()
    expect(channelsAddLink).toHaveAttribute('href', '/channels/add')
  })

  it('renders contact link', async () => {
    const HeaderXSSheetComponent = await HeaderXSSheet()

    render(HeaderXSSheetComponent)

    const contactLink = screen.getByRole('link', { name: /contact/i })
    expect(contactLink).toBeInTheDocument()
    expect(contactLink).toHaveAttribute('href', '/contact')
  })
})
