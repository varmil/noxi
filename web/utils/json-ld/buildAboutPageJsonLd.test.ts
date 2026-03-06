import { describe, expect, it } from 'vitest'
import {
  buildAboutPageJsonLd,
  BuildAboutPageParams
} from './buildAboutPageJsonLd'

describe('buildAboutPageJsonLd', () => {
  const baseParams: BuildAboutPageParams = {
    baseUrl: 'https://www.vcharts.net',
    siteName: 'VCharts',
    siteDescription: 'VTuber analytics platform'
  }

  it('@context と @graph の基本構造を正しく生成', () => {
    const result = buildAboutPageJsonLd(baseParams)

    expect(result['@context']).toBe('https://schema.org')
    expect(result['@graph']).toHaveLength(3)
  })

  it('WebSite を正しく生成', () => {
    const result = buildAboutPageJsonLd(baseParams)
    const webSite = result['@graph'][0]

    expect(webSite['@type']).toBe('WebSite')
    expect(webSite.name).toBe('VCharts')
    expect(webSite.url).toBe('https://www.vcharts.net')
    expect(webSite.description).toBe('VTuber analytics platform')
    expect(webSite.publisher['@type']).toBe('Person')
  })

  it('Person (運営者) を正しく生成', () => {
    const result = buildAboutPageJsonLd(baseParams)
    const person = result['@graph'][1]

    expect(person['@type']).toBe('Person')
    expect(person.name).toBe('Akihiro Yamamoto')
    expect(person.jobTitle).toBe('Founder & Developer')
    expect(person.alumniOf.name).toBe('The University of Tokyo')
    expect(person.knowsAbout).toContain('経営者')
    expect(person.sameAs).toContain('https://x.com/ay_at_commmune')
  })

  it('Organization を正しく生成', () => {
    const result = buildAboutPageJsonLd(baseParams)
    const org = result['@graph'][2]

    expect(org['@type']).toBe('Organization')
    expect(org.name).toBe('VCharts')
    expect(org.url).toBe('https://www.vcharts.net')
    expect(org.founder['@type']).toBe('Person')
    expect(org.sameAs).toContain('https://x.com/VCharts_net')
    expect(org.sameAs).toContain('https://www.youtube.com/@VChartsJP')
  })
})
