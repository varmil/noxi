/**
 * Feature: group-database-migration, Task 10.1: Group申請フロー全体のテスト
 *
 * フォーム入力からAPI呼び出しまでの統合テスト（ハッピーパス）
 * **検証対象: 要件 4.1, 4.2, 4.3, 4.4**
 */

import { act } from 'react'
import { screen, fireEvent, waitFor } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { toast } from 'sonner'
import { GroupRegistrationForm } from '../_components/GroupRegistrationForm'

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      // Components.groupRegistrationForm
      groupIdLabel: 'Group ID',
      groupIdPlaceholder: '例: my-vtuber-group',
      groupIdDescription: '小文字の英数字とハイフンのみ使用できます',
      nameLabel: 'Group名',
      namePlaceholder: '例: マイVTuberグループ',
      nameDescription: '表示されるGroup名を入力してください',
      iconSrcLabel: 'アイコンURL',
      iconSrcPlaceholder:
        'https://example.com/icon.png または /group/my-group/logo.png',
      iconSrcDescription: '相対パスまたは絶対URLを入力してください',
      submitButton: '申請する',
      submitting: '申請中...',
      submitSuccess: 'Group申請が正常に送信されました',
      submitError: '申請の送信に失敗しました。もう一度お試しください',
      // Components.imagePreview
      previewLabel: 'プレビュー',
      fallbackText: '画像なし',
      errorText: '画像の読み込みに失敗しました'
    }
    return translations[key] || key
  }
}))

// Mock components/styles/Image
jest.mock('components/styles/Image', () => {
  return function MockImage({
    src,
    alt,
    onLoad,
    onError,
    ...props
  }: {
    src: string
    alt: string
    onLoad?: () => void
    onError?: () => void
    [key: string]: unknown
  }) {
    return (
      <img
        src={src}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
        data-testid="preview-image"
        {...props}
      />
    )
  }
})

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}))

// Mock createGroupRegistration API
const mockCreateGroupRegistration = jest.fn()
jest.mock('apis/groups', () => ({
  createGroupRegistration: (...args: unknown[]) =>
    mockCreateGroupRegistration(...args)
}))

describe('Group申請フロー統合テスト', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // 少し遅延を入れてローディング状態をテスト可能にする
    mockCreateGroupRegistration.mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    )
  })

  it('ハッピーパス: 正常なGroup申請フローが完了する', async () => {
    // GroupRegistrationFormコンポーネントを直接テスト
    render(<GroupRegistrationForm />)

    // フォーム要素が存在することを確認
    const groupIdInput = screen.getByLabelText('Group ID')
    const nameInput = screen.getByLabelText('Group名')
    const iconSrcInput = screen.getByLabelText('アイコンURL')
    const submitButton = screen.getByRole('button', { name: '申請する' })

    expect(groupIdInput).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
    expect(iconSrcInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()

    // プレースホルダーテキストが正しく表示されることを確認
    expect(groupIdInput).toHaveAttribute('placeholder', '例: my-vtuber-group')
    expect(nameInput).toHaveAttribute('placeholder', '例: マイVTuberグループ')
    expect(iconSrcInput).toHaveAttribute(
      'placeholder',
      'https://example.com/icon.png または /group/my-group/logo.png'
    )

    // 説明テキストが表示されることを確認
    expect(
      screen.getByText('小文字の英数字とハイフンのみ使用できます')
    ).toBeInTheDocument()
    expect(
      screen.getByText('表示されるGroup名を入力してください')
    ).toBeInTheDocument()
    expect(
      screen.getByText('相対パスまたは絶対URLを入力してください')
    ).toBeInTheDocument()

    // 有効なデータを入力
    await act(async () => {
      fireEvent.change(groupIdInput, { target: { value: 'test-vtuber-group' } })
      fireEvent.change(nameInput, { target: { value: 'テストVTuberグループ' } })
      fireEvent.change(iconSrcInput, {
        target: { value: 'https://example.com/test-icon.png' }
      })
    })

    // 入力値が正しく反映されることを確認
    expect(groupIdInput).toHaveValue('test-vtuber-group')
    expect(nameInput).toHaveValue('テストVTuberグループ')
    expect(iconSrcInput).toHaveValue('https://example.com/test-icon.png')

    // アイコンプレビューが表示されることを確認
    await waitFor(() => {
      const previewImage = screen.getByTestId('preview-image')
      expect(previewImage).toBeInTheDocument()
      expect(previewImage).toHaveAttribute(
        'src',
        'https://example.com/test-icon.png'
      )
      expect(previewImage).toHaveAttribute('alt', 'テストVTuberグループ')
    })

    // フォームを送信
    await act(async () => {
      fireEvent.click(submitButton)
    })

    // 送信中の状態が表示されることを確認
    await waitFor(() => {
      expect(screen.getByText('申請中...')).toBeInTheDocument()
      expect(submitButton).toBeDisabled()
    })

    // API呼び出しが実行されることを確認
    await waitFor(() => {
      expect(mockCreateGroupRegistration).toHaveBeenCalledWith({
        groupId: 'test-vtuber-group',
        name: 'テストVTuberグループ',
        iconSrc: 'https://example.com/test-icon.png'
      })
    })

    // 成功トーストが表示されることを確認
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        'Group申請が正常に送信されました'
      )
    })

    // フォームがリセットされることを確認
    await waitFor(() => {
      expect(groupIdInput).toHaveValue('')
      expect(nameInput).toHaveValue('')
      expect(iconSrcInput).toHaveValue('')
    })

    // 送信ボタンが再度有効になることを確認
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
      expect(screen.getByText('申請する')).toBeInTheDocument()
    })
  })

  it('バリデーションエラー: 必須フィールドが空の場合', async () => {
    render(<GroupRegistrationForm />)

    const submitButton = screen.getByRole('button', { name: '申請する' })

    // 空のフォームで送信を試行
    await act(async () => {
      fireEvent.click(submitButton)
    })

    // バリデーションエラーメッセージが表示されることを確認
    await waitFor(() => {
      expect(screen.getByText('Group IDは必須です')).toBeInTheDocument()
      expect(screen.getByText('Group名は必須です')).toBeInTheDocument()
      expect(screen.getByText('アイコンURLは必須です')).toBeInTheDocument()
    })

    // API呼び出しが実行されないことを確認
    expect(mockCreateGroupRegistration).not.toHaveBeenCalled()
    expect(toast.success).not.toHaveBeenCalled()
  })

  it('バリデーションエラー: Group IDの形式が不正な場合', async () => {
    render(<GroupRegistrationForm />)

    const groupIdInput = screen.getByLabelText('Group ID')
    const nameInput = screen.getByLabelText('Group名')
    const iconSrcInput = screen.getByLabelText('アイコンURL')
    const submitButton = screen.getByRole('button', { name: '申請する' })

    // 不正な形式のGroup IDを入力
    await act(async () => {
      fireEvent.change(groupIdInput, { target: { value: 'Invalid_Group_ID!' } })
      fireEvent.change(nameInput, { target: { value: 'テストグループ' } })
      fireEvent.change(iconSrcInput, {
        target: { value: 'https://example.com/icon.png' }
      })
    })

    await act(async () => {
      fireEvent.click(submitButton)
    })

    // バリデーションエラーメッセージが表示されることを確認
    await waitFor(() => {
      expect(
        screen.getByText('Group IDは小文字の英数字とハイフンのみ使用できます')
      ).toBeInTheDocument()
    })

    // API呼び出しが実行されないことを確認
    expect(mockCreateGroupRegistration).not.toHaveBeenCalled()
    expect(toast.success).not.toHaveBeenCalled()
  })

  it('アイコンプレビュー機能のテスト', async () => {
    render(<GroupRegistrationForm />)

    const iconSrcInput = screen.getByLabelText('アイコンURL')
    const nameInput = screen.getByLabelText('Group名')

    // 名前とアイコンURLを入力
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'テストグループ' } })
      fireEvent.change(iconSrcInput, {
        target: { value: 'https://example.com/icon.png' }
      })
    })

    // プレビュー画像が表示されることを確認
    await waitFor(() => {
      const previewImage = screen.getByTestId('preview-image')
      expect(previewImage).toBeInTheDocument()
      expect(previewImage).toHaveAttribute(
        'src',
        'https://example.com/icon.png'
      )
      expect(previewImage).toHaveAttribute('alt', 'テストグループ')
    })

    // 相対パスでも動作することを確認
    await act(async () => {
      fireEvent.change(iconSrcInput, {
        target: { value: '/group/test-group/logo.png' }
      })
    })

    await waitFor(() => {
      const previewImage = screen.getByTestId('preview-image')
      expect(previewImage).toHaveAttribute('src', '/group/test-group/logo.png')
    })
  })
})
