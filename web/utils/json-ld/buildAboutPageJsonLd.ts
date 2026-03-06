/**
 * About ページ用 JSON-LD ビルダー
 *
 * WebSite, Person (運営者), Organization (VCharts) の構造化データを生成する
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/about-page
 */

type Person = {
  '@type': 'Person'
  name: string
  jobTitle: string
  alumniOf: {
    '@type': 'CollegeOrUniversity'
    name: string
  }
  knowsAbout: string[]
  sameAs: string[]
}

type Organization = {
  '@type': 'Organization'
  name: string
  url: string
  founder: Person
  sameAs: string[]
}

type WebSite = {
  '@type': 'WebSite'
  name: string
  url: string
  description: string
  publisher: Person
}

type AboutPageJsonLd = {
  '@context': 'https://schema.org'
  '@graph': [WebSite, Person, Organization]
}

export type BuildAboutPageParams = {
  baseUrl: string
  siteName: string
  siteDescription: string
}

const PERSON: Person = {
  '@type': 'Person',
  name: 'Akihiro Yamamoto',
  jobTitle: 'Founder & Developer',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'The University of Tokyo'
  },
  knowsAbout: [
    '経営者',
    'ソフトウェアエンジニア',
    'Web Development',
    'Startup Management',
    'Product Management'
  ],
  sameAs: [
    'https://x.com/ay_at_commmune',
    'https://jp.linkedin.com/in/%E6%99%83%E5%A4%A7-%E5%B1%B1%E6%9C%AC-029aa4251',
    'https://www.facebook.com/akihiro.yamamoto.330/'
  ]
}

export function buildAboutPageJsonLd(
  params: BuildAboutPageParams
): AboutPageJsonLd {
  const { baseUrl, siteName, siteDescription } = params

  const webSite: WebSite = {
    '@type': 'WebSite',
    name: siteName,
    url: baseUrl,
    description: siteDescription,
    publisher: PERSON
  }

  const organization: Organization = {
    '@type': 'Organization',
    name: siteName,
    url: baseUrl,
    founder: PERSON,
    sameAs: ['https://x.com/VCharts_net', 'https://www.youtube.com/@VChartsJP']
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [webSite, PERSON, organization]
  }
}
