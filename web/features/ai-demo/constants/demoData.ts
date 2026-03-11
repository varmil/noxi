export const DEMO_QUESTIONS = [
  {
    id: 'q1',
    featureId: 'ai-demo-q1',
    questionKey: 'q1.question' as const,
    answerKey: 'q1.answer' as const,
    type: 'trend' as const
  },
  {
    id: 'q2',
    featureId: 'ai-demo-q2',
    questionKey: 'q2.question' as const,
    answerKey: 'q2.answer' as const,
    type: 'subscriber' as const
  },
  {
    id: 'q3',
    featureId: 'ai-demo-q3',
    questionKey: 'q3.question' as const,
    answerKey: 'q3.answer' as const,
    type: 'comparison' as const
  }
] as const

export type DemoQuestion = (typeof DEMO_QUESTIONS)[number]

// Q1: 配信トレンド（直近3ヶ月、複数キーワード）
export const TREND_CHART_DATA = [
  {
    date: '1月上旬',
    minecraft: 120,
    pokemon: 3,
    arknights: 30,
    zatsudan: 210
  },
  {
    date: '1月下旬',
    minecraft: 135,
    pokemon: 2,
    arknights: 35,
    zatsudan: 195
  },
  {
    date: '2月上旬',
    minecraft: 110,
    pokemon: 5,
    arknights: 65,
    zatsudan: 220
  },
  {
    date: '2月下旬',
    minecraft: 105,
    pokemon: 8,
    arknights: 80,
    zatsudan: 205
  },
  {
    date: '3月上旬',
    minecraft: 145,
    pokemon: 165,
    arknights: 95,
    zatsudan: 230
  }
]

export const TREND_KEYWORDS = [
  { key: 'minecraft', color: 'var(--chart-1)' },
  { key: 'pokemon', color: 'var(--chart-2)' },
  { key: 'arknights', color: 'var(--chart-3)' },
  { key: 'zatsudan', color: 'var(--chart-4)' }
] as const

// Q2: 赤城ウェン 登録者推移（直近1年）
// 1年前23万→最新32万、月ごとの増加数も付与
export const SUBSCRIBER_CHART_DATA = [
  { month: '2025-04', total: 230000, increase: 0 },
  { month: '2025-05', total: 235500, increase: 5500 },
  { month: '2025-06', total: 241800, increase: 6300 },
  { month: '2025-07', total: 249000, increase: 7200 },
  { month: '2025-08', total: 257500, increase: 8500 },
  { month: '2025-09', total: 265000, increase: 7500 },
  { month: '2025-10', total: 274000, increase: 9000 },
  { month: '2025-11', total: 283000, increase: 9000 },
  { month: '2025-12', total: 293000, increase: 10000 },
  { month: '2026-01', total: 303000, increase: 10000 },
  { month: '2026-02', total: 312000, increase: 9000 },
  { month: '2026-03', total: 320000, increase: 8000 }
]

// Q3: にじさんじ vs ホロライブ 比較テーブル
export type ComparisonLabel =
  | 'avgViewers'
  | 'peakViewers'
  | 'avgSuperChat'
  | 'streamFrequency'
  | 'avgDuration'

export const COMPARISON_TABLE_DATA: {
  label: ComparisonLabel
  groupA: string
  groupB: string
}[] = [
  { label: 'avgViewers', groupA: '8,451', groupB: '6,202' },
  { label: 'peakViewers', groupA: '199,800', groupB: '97,500' },
  { label: 'avgSuperChat', groupA: '¥1,250,000', groupB: '¥890,000' },
  { label: 'streamFrequency', groupA: '4.2', groupB: '3.8' },
  { label: 'avgDuration', groupA: '2:45', groupB: '2:15' }
]
