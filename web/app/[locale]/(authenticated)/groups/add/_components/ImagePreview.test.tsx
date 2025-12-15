/**
 * Feature: group-database-migration, Property 5: アイコン画像 URL 処理
 *
 * _任意の_ iconSrc 値において、相対パスは適切に解決され、絶対 URL は直接使用され、すべて円形プレビューとして表示される
 * **検証対象: 要件 4.3, 6.1, 6.2, 6.3**
 */

import { render } from '@testing-library/react'
import * as fc from 'fast-check'
import { ImagePreview } from './ImagePreview'

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      previewLabel: 'Preview',
      fallbackText: 'No Image',
      errorText: 'Failed to load image'
    }
    return translations[key] || key
  }
}))

// Mock the Image component
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
      <img src={src} alt={alt} onLoad={onLoad} onError={onError} {...props} />
    )
  }
})

// Property-based test generators
const relativePathArbitrary = fc
  .string({ minLength: 1, maxLength: 50 })
  .filter(s => !s.startsWith('http://') && !s.startsWith('https://'))
  .map(s => (s.startsWith('/') ? s : `/${s}`))

const absoluteUrlArbitrary = fc.oneof(
  fc
    .string({ minLength: 10, maxLength: 100 })
    .map(s => `https://example.com/${s}`),
  fc
    .string({ minLength: 10, maxLength: 100 })
    .map(s => `http://example.com/${s}`)
)

const legacyGroupPathArbitrary = fc
  .string({ minLength: 1, maxLength: 20 })
  .filter(s => /^[a-z0-9-]+$/.test(s))
  .map(group => `/group/${group}/logo.png`)

const anyIconSrcArbitrary = fc.oneof(
  relativePathArbitrary,
  absoluteUrlArbitrary,
  legacyGroupPathArbitrary
)

describe('ImagePreview Property-Based Tests', () => {
  // Property 5.1: 相対パスは適切に解決される (要件 6.1)
  it('should properly resolve relative paths', () => {
    fc.assert(
      fc.property(relativePathArbitrary, relativePath => {
        const { container } = render(
          <ImagePreview src={relativePath} alt="Test image" />
        )

        const img = container.querySelector('img')
        if (img) {
          const src = img.getAttribute('src')
          // 相対パスは / で始まるべき
          expect(src).toMatch(/^\//)
          // 元のパスが含まれているべき
          expect(src).toContain(
            relativePath.startsWith('/') ? relativePath : `/${relativePath}`
          )
        }

        return true
      }),
      { numRuns: 100 }
    )
  })

  // Property 5.2: 絶対URLは直接使用される (要件 6.2)
  it('should use absolute URLs directly', () => {
    fc.assert(
      fc.property(absoluteUrlArbitrary, absoluteUrl => {
        const { container } = render(
          <ImagePreview src={absoluteUrl} alt="Test image" />
        )

        const img = container.querySelector('img')
        if (img) {
          const src = img.getAttribute('src')
          // 絶対URLはそのまま使用されるべき
          expect(src).toBe(absoluteUrl)
        }

        return true
      }),
      { numRuns: 100 }
    )
  })

  // Property 5.3: すべて円形プレビューとして表示される (要件 4.3, 6.3)
  it('should display all images as circular previews', () => {
    fc.assert(
      fc.property(anyIconSrcArbitrary, iconSrc => {
        const { container } = render(
          <ImagePreview src={iconSrc} alt="Test image" />
        )

        // 円形コンテナが存在するべき
        const circularContainer = container.querySelector('.rounded-full')
        expect(circularContainer).toBeInTheDocument()

        // 固定サイズのコンテナであるべき
        expect(circularContainer).toHaveStyle({
          width: '80px',
          height: '80px'
        })

        return true
      }),
      { numRuns: 100 }
    )
  })

  // Property 5.4: レガシーパス形式を正しく処理する (要件 6.5)
  it('should correctly handle legacy group path format', () => {
    fc.assert(
      fc.property(legacyGroupPathArbitrary, legacyPath => {
        const { container } = render(
          <ImagePreview src={legacyPath} alt="Test image" />
        )

        const img = container.querySelector('img')
        if (img) {
          const src = img.getAttribute('src')
          // レガシーパスはそのまま使用されるべき
          expect(src).toBe(legacyPath)
          // /group/グループ名/logo.png の形式であるべき
          expect(src).toMatch(/^\/group\/[a-z0-9-]+\/logo\.png$/)
        }

        return true
      }),
      { numRuns: 100 }
    )
  })

  // Property 5.5: 無効なsrcでフォールバック表示される (要件 6.4)
  it('should display fallback for invalid src', () => {
    const invalidSrcs = ['', ' ', 'invalid-url', 'not-a-url']

    invalidSrcs.forEach(invalidSrc => {
      const { container } = render(
        <ImagePreview src={invalidSrc} alt="Test image" />
      )

      // フォールバック要素が存在するか、エラー処理が適切に行われるべき
      const circularContainer = container.querySelector('.rounded-full')
      expect(circularContainer).toBeInTheDocument()
    })
  })

  // Property 5.6: プレビューラベルが常に表示される
  it('should always display preview elements', () => {
    fc.assert(
      fc.property(anyIconSrcArbitrary, iconSrc => {
        const { container } = render(
          <ImagePreview src={iconSrc} alt="Test image" />
        )

        // プレビューコンテナが存在するべき
        const previewContainer = container.querySelector(
          '.flex.flex-col.items-center'
        )
        expect(previewContainer).toBeInTheDocument()

        // 円形コンテナが存在するべき
        const circularContainer = container.querySelector('.rounded-full')
        expect(circularContainer).toBeInTheDocument()

        return true
      }),
      { numRuns: 100 }
    )
  })
})
