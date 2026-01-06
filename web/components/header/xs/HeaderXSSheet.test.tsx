import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

// Mock all external dependencies
vi.mock('lib/auth', () => ({
  auth: vi.fn().mockResolvedValue(null)
}))

vi.mock('hooks/useGroups', () => ({
  getGroups: vi.fn().mockResolvedValue({
    imgs: [],
    icons: []
  })
}))

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn().mockImplementation((namespace: string) => {
    const messages: Record<string, Record<string, string>> = {
      Components: {
        'styles.more': 'More',
        'contact.title': 'Contact',
        'channelsAdd.title': 'Add a channel',
        'groupsAdd.title': 'Add a group',
        'auth.signOut': 'Sign Out',
        'aside.xAccount': 'Official X',
        'header.superChatRanking': 'Super Chat Ranking',
        'header.concurrentViewerRanking': 'Live Viewer Ranking',
        'header.ranking': 'Ranking',
        'header.support': 'Support',
        'header.info': 'Info',
        'header.allGroup': 'Overall'
      }
    }
    return Promise.resolve((key: string) => messages[namespace]?.[key] || key)
  })
}))

vi.mock('lib/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
}))

vi.mock('components/sidebar/SignOutButton', () => ({
  SignOutButton: () => <div data-testid="sign-out" />
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  )
}))

vi.mock('@/components/ui/separator', () => ({
  Separator: () => <hr />
}))

vi.mock('@/components/ui/sheet', () => ({
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

vi.mock('components/ModeToggle', () => ({
  ModeToggle: () => <div data-testid="mode-toggle" />
}))

vi.mock('components/icons/PrivacyPolicyIcon', () => ({
  __esModule: true,
  default: () => <div data-testid="privacy-policy-icon" />
}))

vi.mock('components/icons/XIcon', () => ({
  __esModule: true,
  default: () => <div data-testid="x-icon" />
}))

vi.mock('components/language-switcher/components/LanguageSwitcher', () => ({
  __esModule: true,
  default: () => <div data-testid="language-switcher" />
}))

vi.mock('components/styles/Image', () => ({
  __esModule: true,
  default: () => <div data-testid="image" />
}))

// Import after mocks
import HeaderXSSheet from './HeaderXSSheet'

describe('HeaderXSSheet', () => {
  it('renders /groups/add link', async () => {
    const HeaderXSSheetComponent = await HeaderXSSheet()

    render(HeaderXSSheetComponent)

    const groupsAddLink = screen.getByRole('link', { name: /add a group/i })
    expect(groupsAddLink).toBeInTheDocument()
    expect(groupsAddLink).toHaveAttribute('href', '/groups/add')
  })

  it('renders /channels/add link', async () => {
    const HeaderXSSheetComponent = await HeaderXSSheet()

    render(HeaderXSSheetComponent)

    const channelsAddLink = screen.getByRole('link', {
      name: /add a channel/i
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
