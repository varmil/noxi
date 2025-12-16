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
      Global: { title: 'VCharts' },
      Components: {
        'styles.more': 'More',
        'contact.title': 'Contact',
        'channelsAdd.title': 'Add your channel',
        'groupsAdd.title': 'Add your group'
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

jest.mock('components/aside/SettingsDropdown', () => ({
  SettingsDropdown: () => <div data-testid="settings-dropdown" />
}))

jest.mock('@/components/ui/scroll-area', () => ({
  ScrollArea: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )
}))

jest.mock('@/components/ui/separator', () => ({
  Separator: () => <hr />
}))

jest.mock('@/components/ui/tooltip', () => ({
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

jest.mock('components/aside/AsideIcon', () => ({
  __esModule: true,
  default: () => <div data-testid="aside-icon" />
}))

jest.mock('components/skeleton/AsideSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid="aside-skeleton" />
}))

jest.mock('components/icons/PrivacyPolicyIcon', () => ({
  __esModule: true,
  default: () => <div data-testid="privacy-policy-icon" />
}))

jest.mock('../Logo', () => ({
  __esModule: true,
  default: () => <div data-testid="logo" />
}))

// Import after mocks
import Aside from './Aside'

describe('Aside', () => {
  it('renders /groups/add link', async () => {
    const AsideComponent = await Aside({})

    render(AsideComponent)

    const groupsAddLink = screen.getByRole('link', { name: /add your group/i })
    expect(groupsAddLink).toBeInTheDocument()
    expect(groupsAddLink).toHaveAttribute('href', '/groups/add')
  })

  it('renders /channels/add link', async () => {
    const AsideComponent = await Aside({})

    render(AsideComponent)

    const channelsAddLink = screen.getByRole('link', {
      name: /add your channel/i
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
