import type { MetadataRoute } from 'next'

export const dynamic = 'auto'

export default function manifest(): MetadataRoute.Manifest {
  return {
    theme_color: '#f2f2f2',
    background_color: '#ffffff',
    icons: [
      {
        purpose: 'maskable',
        sizes: '512x512',
        src: '/pwa/icon512_maskable.png',
        type: 'image/png'
      },
      {
        purpose: 'any',
        sizes: '512x512',
        src: '/pwa/icon512_rounded.png',
        type: 'image/png'
      }
    ],
    orientation: 'any',
    display: 'standalone',
    dir: 'auto',
    description: '最新ランキングをホーム画面からワンタップでチェック！',
    lang: 'ja-JP',
    name: 'VCharts',
    short_name: 'VCharts',
    start_url: '/',
    screenshots: [
      {
        src: '/pwa/screenshots/1.png',
        sizes: '645x1398',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'ホーム画面'
      },
      {
        src: '/pwa/screenshots/2.png',
        sizes: '645x1398',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'スパチャランキング画面'
      },
      {
        src: '/pwa/screenshots/3.png',
        sizes: '645x1398',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'さくらみこさんの同接数を表示する画面'
      },
      {
        src: '/pwa/screenshots/4.png',
        sizes: '645x1398',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'グループ一覧画面'
      },
      {
        src: '/pwa/screenshots/5.png',
        sizes: '645x1398',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'ホーム画面への追加を促す画像'
      },
      {
        src: '/pwa/screenshots/6.jpg',
        sizes: '1920x832',
        type: 'image/jpeg',
        form_factor: 'wide',
        label: 'ホーム画面への追加を促す画像'
      }
    ]
  }
}
