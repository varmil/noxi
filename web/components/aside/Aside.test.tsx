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
      Global: { title: 'VCharts' },
      Components: {
        'styles.more': 'More',
        'contact.title': 'Contact',
        'channelsAdd.title': 'Add a channel',
        'groupsAdd.title': 'Add a group'
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

vi.mock('components/aside/SettingsDropdown', () => ({
  SettingsDropdown: () => <div data-testid="settings-dropdown" />
}))

vi.mock('@/components/ui/scroll-area', () => ({
  ScrollArea: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )
}))

vi.mock('@/components/ui/separator', () => ({
  Separator: () => <hr />
}))

vi.mock('@/components/ui/tooltip', () => ({
  TooltipProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Tooltip: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  TooltipTrigger: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  TooltipContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )
}))

vi.mock('components/aside/AsideIcon', () => ({
  __esModule: true,
  default: () => <div data-testid="aside-icon" />
}))

vi.mock('components/skeleton/AsideSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid="aside-skeleton" />
}))

vi.mock('components/icons/PrivacyPolicyIcon', () => ({
  __esModule: true,
  default: () => <div data-testid="privacy-policy-icon" />
}))

vi.mock('../Logo', () => ({
  __esModule: true,
  default: () => <div data-testid="logo" />
}))

// Import after mocks
import Aside from './Aside'

describe('Aside', () => {
  it('renders /groups/add link', async () => {
    const AsideComponent = await Aside({})

    render(AsideComponent)

    const groupsAddLink = screen.getByRole('link', { name: /add a group/i })
    expect(groupsAddLink).toBeInTheDocument()
    expect(groupsAddLink).toHaveAttribute('href', '/groups/add')
  })

  it('renders /channels/add link', async () => {
    const AsideComponent = await Aside({})

    render(AsideComponent)

    const channelsAddLink = screen.getByRole('link', {
      name: /add a channel/i
    })
    expect(channelsAddLink).toBeInTheDocument()
    expect(channelsAddLink).toHaveAttribute('href', '/channels/add')
  })

  it('renders contact link', async () => {
    const AsideComponent = await Aside({})

    render(AsideComponent)

    const contactLink = screen.getByRole('link', { name: /contact/i })
    expect(contactLink).toBeInTheDocument()
    expect(contactLink).toHaveAttribute('href', '/contact')
  })
})
