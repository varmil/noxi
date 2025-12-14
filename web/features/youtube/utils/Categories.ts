import type { routing } from 'config/i18n/routing'

const categories = [
  {
    id: 1,
    en: 'Film & Animation',
    ja: '映画とアニメ',
    assignable: true
  },
  {
    id: 2,
    en: 'Autos & Vehicles',
    ja: '自動車と乗り物',
    assignable: true
  },
  {
    id: 10,
    en: 'Music',
    ja: '音楽',
    assignable: true
  },
  {
    id: 15,
    en: 'Pets & Animals',
    ja: 'ペットと動物',
    assignable: true
  },
  {
    id: 17,
    en: 'Sports',
    ja: 'スポーツ',
    assignable: true
  },
  {
    id: 18,
    en: 'Short Movies',
    ja: 'ショートムービー',
    assignable: false
  },
  {
    id: 19,
    en: 'Travel & Events',
    ja: '旅行とイベント',
    assignable: true
  },
  {
    id: 20,
    en: 'Gaming',
    ja: 'ゲーム',
    assignable: true
  },
  {
    id: 21,
    en: 'Videoblogging',
    ja: 'ビデオブログ',
    assignable: false
  },
  {
    id: 22,
    en: 'People & Blogs',
    ja: 'ブログ',
    assignable: true
  },
  {
    id: 23,
    en: 'Comedy',
    ja: 'コメディ',
    assignable: true
  },
  {
    id: 24,
    en: 'Entertainment',
    ja: 'エンターテイメント',
    assignable: true
  },
  {
    id: 25,
    en: 'News & Politics',
    ja: 'ニュースと政治',
    assignable: true
  },
  {
    id: 26,
    en: 'Howto & Style',
    ja: 'ハウツーとスタイル',
    assignable: true
  },
  {
    id: 27,
    en: 'Education',
    ja: '教育',
    assignable: true
  },
  {
    id: 28,
    en: 'Science & Technology',
    ja: '科学と技術',
    assignable: true
  },
  {
    id: 29,
    en: 'Nonprofits & Activism',
    ja: '非営利団体と活動',
    assignable: true
  },
  {
    id: 30,
    en: 'Movies',
    ja: '映画',
    assignable: false
  },
  {
    id: 31,
    en: 'Anime/Animation',
    ja: 'アニメ',
    assignable: false
  },
  {
    id: 32,
    en: 'Action/Adventure',
    ja: 'アクションとアドベンチャー',
    assignable: false
  },
  {
    id: 33,
    en: 'Classics',
    ja: 'クラシック',
    assignable: false
  },
  {
    id: 34,
    en: 'Comedy',
    ja: 'コメディ',
    assignable: false
  },
  {
    id: 35,
    en: 'Documentary',
    ja: 'ドキュメンタリー',
    assignable: false
  },
  {
    id: 36,
    en: 'Drama',
    ja: 'ドラマ',
    assignable: false
  },
  {
    id: 37,
    en: 'Family',
    ja: '家族向け',
    assignable: false
  },
  {
    id: 38,
    en: 'Foreign',
    ja: '海外',
    assignable: false
  },
  {
    id: 39,
    en: 'Horror',
    ja: 'ホラー',
    assignable: false
  },
  {
    id: 40,
    en: 'Sci-Fi/Fantasy',
    ja: 'SFとファンタジー',
    assignable: false
  },
  {
    id: 41,
    en: 'Thriller',
    ja: 'サスペンス',
    assignable: false
  },
  {
    id: 42,
    en: 'Shorts',
    ja: '短編',
    assignable: false
  },
  {
    id: 43,
    en: 'Shows',
    ja: '番組',
    assignable: false
  },
  {
    id: 44,
    en: 'Trailers',
    ja: '予告編',
    assignable: false
  }
]

type Locale = (typeof routing.locales)[number]

class Category {
  public readonly id: number
  private locale: Locale
  private en: string
  private ja: string
  public readonly assignable: boolean

  constructor({
    id,
    locale,
    en,
    ja,
    assignable
  }: {
    id: number
    locale: Locale
    en: string
    ja: string
    assignable: boolean
  }) {
    this.id = id
    this.locale = locale
    this.en = en
    this.ja = ja
    this.assignable = assignable
  }

  getTitle() {
    return this.locale === 'ja' ? this.ja : this.en
  }
}

export class Categories {
  private readonly locale: Locale
  private readonly categories: Category[]

  constructor(locale: Locale) {
    this.locale = locale
    this.categories = categories.map(
      category => new Category({ locale, ...category })
    )
  }

  get assignableCategories() {
    return this.categories.filter(category => category.assignable)
  }

  findById(id: number) {
    return this.categories.find(category => category.id === id)
  }
}
