import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { vi } from 'vitest'
import { ChannelRegistrationManagement } from './ChannelRegistrationManagement'

// Mock next/navigation
vi.mock('lib/navigation', () => ({
  useRouter: () => ({
    refresh: vi.fn()
  })
}))

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

// Mock API calls
const mockUpdateGender = vi.fn()
const mockUpdateStatus = vi.fn()

vi.mock('apis/youtube/updateChannelRegistrationGender', () => ({
  updateChannelRegistrationGender: (...args: unknown[]) =>
    mockUpdateGender(...args)
}))

vi.mock('apis/youtube/updateChannelRegistrationStatus', () => ({
  updateChannelRegistrationStatus: (...args: unknown[]) =>
    mockUpdateStatus(...args)
}))

const mockGroups = [
  { id: 'hololive', name: 'Hololive', iconSrc: '/group/hololive/logo.png' },
  { id: 'nijisanji', name: 'Nijisanji', iconSrc: '/group/nijisanji/logo.png' }
]

const mockPendingRegistration = {
  channelId: 'UC1234567890',
  title: 'Test Channel',
  country: 'JP',
  defaultLanguage: 'ja',
  gender: 'male' as const,
  group: 'hololive',
  subscriberCount: 100000,
  liveStreamCount: 50,
  status: 'pending' as const,
  appliedAt: '2025-01-01T00:00:00Z'
}

const mockApprovedRegistration = {
  channelId: 'UC0987654321',
  title: 'Approved Channel',
  country: 'JP',
  defaultLanguage: 'ja',
  gender: 'female' as const,
  group: 'nijisanji',
  subscriberCount: 200000,
  liveStreamCount: 100,
  status: 'approved' as const,
  appliedAt: '2025-01-02T00:00:00Z'
}

describe('ChannelRegistrationManagement', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUpdateGender.mockResolvedValue(undefined)
    mockUpdateStatus.mockResolvedValue(undefined)
  })

  it('審査中の申請で性別が表示される', () => {
    render(
      <ChannelRegistrationManagement
        initialRegistrations={[mockPendingRegistration]}
        groups={mockGroups}
      />
    )

    // 性別ラベルが表示されることを確認
    expect(screen.getByText('性別:')).toBeInTheDocument()
    // 男性が選択されていることを確認
    expect(screen.getByText('男性')).toBeInTheDocument()
  })

  it('過去の申請一覧では性別編集UIが表示されない', () => {
    render(
      <ChannelRegistrationManagement
        initialRegistrations={[mockApprovedRegistration]}
        groups={mockGroups}
      />
    )

    // 過去の申請セクションが表示される
    expect(screen.getByText('過去の申請一覧')).toBeInTheDocument()
    // 性別ラベルが表示されないことを確認
    expect(screen.queryByText('性別:')).not.toBeInTheDocument()
  })

  it('審査中と過去の申請両方がある場合に正しく表示される', () => {
    render(
      <ChannelRegistrationManagement
        initialRegistrations={[mockPendingRegistration, mockApprovedRegistration]}
        groups={mockGroups}
      />
    )

    // 審査中の申請が表示される
    expect(screen.getByText('Test Channel')).toBeInTheDocument()
    // 性別ラベルが表示される（審査中の申請のみ）
    expect(screen.getByText('性別:')).toBeInTheDocument()

    // 過去の申請セクションも表示される
    expect(screen.getByText('過去の申請一覧')).toBeInTheDocument()
    expect(screen.getByText('Approved Channel')).toBeInTheDocument()
  })

  it('審査待ちの申請がない場合にメッセージが表示される', () => {
    render(
      <ChannelRegistrationManagement
        initialRegistrations={[mockApprovedRegistration]}
        groups={mockGroups}
      />
    )

    expect(screen.getByText('審査待ちの申請はありません')).toBeInTheDocument()
  })
})
