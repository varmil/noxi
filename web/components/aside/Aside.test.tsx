import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

// Mock all external dependencies
vi.mock('lib/auth', () => ({
  auth: vi.fn().mockResolvedValue(null)
}))

vi.mock('hooks/useGroups', () => ({
  getGroups: vi.fn().mockResolvedValue({
    imgs: [
      { id: 'nijisanji', name: 'にじさんじ', src: '/group/nijisanji/logo.png' },
      { id: 'hololive', name: 'ホロライブ', src: '/group/hololive/logo.png' }
    ],
    icons: [{ id: 'independent', name: '個人勢', icon: () => <span /> }]
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
        'groupsAdd.title': 'Add a group',
        'header.superChatRanking': 'Super Chat Ranking',
        'header.concurrentViewerRanking': 'Concurrent Viewer Ranking',
        'header.allGroup': 'All',
        'header.ranking': 'Ranking',
        'header.support': 'Support',
        'header.info': 'Info',
        'aside.xAccount': 'X Account',
        'auth.signOut': 'Sign Out'
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

vi.mock('@/components/ui/separator', () => ({
  Separator: () => <hr />
}))

vi.mock('@/lib/utils', () => ({
  cn: (...args: string[]) => args.filter(Boolean).join(' ')
}))

vi.mock('components/styles/Image', () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <img alt={alt} />
}))

vi.mock('components/ModeToggle', () => ({
  ModeToggle: () => <div data-testid="mode-toggle" />
}))

vi.mock('components/language-switcher/components/LanguageSwitcher', () => ({
  __esModule: true,
  default: () => <div data-testid="language-switcher" />
}))

vi.mock('components/sidebar/SignOutButton', () => ({
  SignOutButton: () => <div data-testid="sign-out" />
}))

vi.mock('components/icons/PrivacyPolicyIcon', () => ({
  __esModule: true,
  default: () => <span data-testid="privacy-policy-icon" />
}))

vi.mock('components/icons/XIcon', () => ({
  __esModule: true,
  default: () => <span data-testid="x-icon" />
}))

vi.mock('components/sidebar/SidebarContext', () => ({
  useSidebar: () => ({ isOpen: true, toggle: vi.fn() })
}))

vi.mock('components/Logo', () => ({
  __esModule: true,
  default: () => <span data-testid="logo" />
}))

vi.mock('components/vcharts/svg/text', () => ({
  __esModule: true,
  default: () => <span data-testid="vcharts-text" />
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

  it('renders super chat ranking links for each group', async () => {
    const AsideComponent = await Aside({})

    render(AsideComponent)

    // 各グループのスパチャランキングリンクが存在することを確認
    const superChatLinks = screen.getAllByRole('link', {
      name: /super chat ranking/i
    })
    expect(superChatLinks.length).toBeGreaterThanOrEqual(1)
  })

  it('renders concurrent viewer ranking links for each group', async () => {
    const AsideComponent = await Aside({})

    render(AsideComponent)

    // 各グループの同接数ランキングリンクが存在することを確認
    const concurrentViewerLinks = screen.getAllByRole('link', {
      name: /concurrent viewer ranking/i
    })
    expect(concurrentViewerLinks.length).toBeGreaterThanOrEqual(1)
  })

  it('renders groups link', async () => {
    const AsideComponent = await Aside({})

    render(AsideComponent)

    const groupsLink = screen.getByRole('link', { name: /more/i })
    expect(groupsLink).toBeInTheDocument()
    expect(groupsLink).toHaveAttribute('href', '/groups')
  })
})
