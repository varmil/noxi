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
          'MetaAI',
          'Meta-AI',
          'Meta AI',
          'Meta.AI',
          'meta-ai',
          'metaai',
          'Meta-ExternalAgent'
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
