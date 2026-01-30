import { describe, expect, it } from 'vitest'
import { normalizeEmail } from './normalizeEmail'

describe('normalizeEmail', () => {
  describe('Gmail / Googlemail', () => {
    it('+ 以降を除去する', () => {
      expect(normalizeEmail('test+alias@gmail.com')).toBe('test@gmail.com')
      expect(normalizeEmail('test+123@gmail.com')).toBe('test@gmail.com')
    })

    it('ドットを除去する', () => {
      expect(normalizeEmail('t.e.s.t@gmail.com')).toBe('test@gmail.com')
      expect(normalizeEmail('test.user@gmail.com')).toBe('testuser@gmail.com')
    })

    it('+ とドットの両方を処理する', () => {
      expect(normalizeEmail('t.e.s.t+alias@gmail.com')).toBe('test@gmail.com')
    })

    it('大文字を小文字に変換する', () => {
      expect(normalizeEmail('Test@Gmail.com')).toBe('test@gmail.com')
      expect(normalizeEmail('TEST@GMAIL.COM')).toBe('test@gmail.com')
    })

    it('googlemail.com を gmail.com に統一する', () => {
      expect(normalizeEmail('test@googlemail.com')).toBe('test@gmail.com')
      expect(normalizeEmail('t.e.s.t+alias@googlemail.com')).toBe(
        'test@gmail.com'
      )
    })
  })

  describe('その他のドメイン', () => {
    it('+ 以降を除去する', () => {
      expect(normalizeEmail('user+tag@outlook.com')).toBe('user@outlook.com')
      expect(normalizeEmail('user+test@icloud.com')).toBe('user@icloud.com')
    })

    it('ドットは保持する', () => {
      expect(normalizeEmail('user.name@outlook.com')).toBe(
        'user.name@outlook.com'
      )
      expect(normalizeEmail('first.last@yahoo.co.jp')).toBe(
        'first.last@yahoo.co.jp'
      )
    })

    it('大文字を小文字に変換する', () => {
      expect(normalizeEmail('User@Outlook.com')).toBe('user@outlook.com')
    })
  })

  describe('エッジケース', () => {
    it('不正なメールアドレスは小文字化のみ行う', () => {
      expect(normalizeEmail('invalid')).toBe('invalid')
      expect(normalizeEmail('INVALID')).toBe('invalid')
    })

    it('空のローカルパートを処理する', () => {
      expect(normalizeEmail('@gmail.com')).toBe('@gmail.com')
    })
  })
})
