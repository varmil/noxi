import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 特定ボットをブロック
      {
        userAgent: [
          'AhrefsBot',
          'Amazonbot',
          'DotBot',
          'MJ12bot',
          'SemrushBot',
          'Steeler'
        ],
        disallow: '/'
      },
      {
        userAgent: [
          'facebookexternalhit',
          'meta-webindexer',
          'meta-externalads',
          'meta-externalagent',
          'meta-externalfetcher'
        ],
        disallow: '/'
      },
      // その他のボットへの許可
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/super-admin/']
      }
    ]
  }
}
