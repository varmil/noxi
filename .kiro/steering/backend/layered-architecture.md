# これは backend/ 配下のファイルに適用されるルールです

## レイヤードアーキテクチャとドメイン駆動設計

このプロジェクトでは、レイヤードアーキテクチャとドメイン駆動設計（DDD）の原則に基づいて実装します。

### レイヤー構造

```
backend/
├── apps/
│   └── closed-api-server/
│       └── src/
│           └── presentation/    # プレゼンテーション層
└── libs/
    ├── application/             # アプリケーション層
    ├── domain/                  # ドメイン層
    └── infra/                   # インフラストラクチャ層
```

### 各レイヤーの責務

#### 1. Presentation 層（プレゼンテーション層）

- **責務**: HTTP リクエスト/レスポンスの処理、入力バリデーション、ユースケースの実装
- **含まれるもの**: Controller, Scenario（ユースケース）, DTO, Validator
- **依存方向**: Application 層に依存
- **配置場所**: `backend/apps/closed-api-server/src/presentation/`
- **プリミティブ型の扱い**:
  - 入力: プリミティブ型 → ドメイン型への変換を行う（この層の最初で変換）
  - 出力: ドメイン型 → プリミティブ型への変換を行う（レスポンス生成時）

**重要**:

- **Scenario**: ユースケースを表現するクラス。再利用しないため、Presentation 層に配置
- **Controller → Scenario → Service**: Controller は Scenario を呼び出し、Scenario が Service を呼び出す

**例**:

```typescript
// Controller
@Controller('membership-bundles')
export class MembershipBundlesController {
  constructor(
    private readonly membershipBundlesService: MembershipBundlesService
  ) {}

  @Get()
  async getMembershipBundles(@Query() dto: GetMembershipBundles) {
    // DTOのメソッドでプリミティブ型からドメイン型への変換
    return await this.membershipBundlesService.findAll({
      where: {
        videoIds: dto.toVideoIds(),
        channelId: dto.toChannelId(),
        group: dto.toGroup(),
        gender: dto.toGender(),
        actualEndTime: dto.toActualEndTime(),
        createdAt: dto.toCreatedAt()
      },
      orderBy: dto.toOrderBy(),
      limit: dto.toLimit(),
      offset: dto.toOffset()
    })
  }
}

// DTO（プリミティブ型からドメイン型への変換を担当）
export class GetMembershipBundles {
  @IsOptional()
  @IsString()
  channelId?: string

  @IsIn(GroupStrings)
  @IsOptional()
  group?: GroupString

  toChannelId = () =>
    this.channelId ? new ChannelId(this.channelId) : undefined

  toGroup = () => (this.group ? new Group(this.group) : undefined)
}

// Scenario（ユースケース）- より複雑なロジックが必要な場合
@Injectable()
export class SupersRankingsScenario {
  constructor(private readonly supersRankingsService: SupersRankingsService) {}

  async getSupersRankings(
    args: Parameters<SupersRankingsService['findAggregatedOne']>[0]
  ) {
    const { period, rankingType, channelId } = args.where
    if (period.isLast24Hours()) {
      // last24Hours の場合は都度計算
      return (
        await this.supersRankingsService.calcAllUsingBundle({
          where: {
            rankingType,
            channelIds: new ChannelIds([channelId]),
            createdAt: { gte: new Now().xDaysAgo(1), lte: new Now().get() }
          }
        })
      ).findByChannelId(channelId)
    } else {
      // それ以外は集計テーブルから取得
      return await this.supersRankingsService.findAggregatedOne(args)
    }
  }
}
```

#### 2. Application 層（アプリケーション層）

- **責務**: ビジネスロジックの調整、トランザクション管理、ドメインオブジェクトの調整
- **含まれるもの**: Service
- **依存方向**: Domain 層と Infra 層に依存
- **配置場所**: `backend/libs/application/`
- **プリミティブ型の扱い**: 原則禁止。ドメイン型のみを扱う

**例**:

```typescript
// Service
@Injectable()
export class MembershipBundlesService {
  constructor(
    @Inject('MembershipBundleRepository')
    private readonly membershipBundleRepository: MembershipBundleRepository
  ) {}

  async findAll(args: Parameters<MembershipBundleRepository['findAll']>[0]) {
    // ドメイン型のみを扱う
    return await this.membershipBundleRepository.findAll(args)
  }

  async findOne(args: Parameters<MembershipBundleRepository['findOne']>[0]) {
    return await this.membershipBundleRepository.findOne(args)
  }

  async save(args: Parameters<MembershipBundleRepository['save']>[0]) {
    await this.membershipBundleRepository.save(args)
  }
}
```

#### 3. Domain 層（ドメイン層）★ 最重要

- **責務**: ビジネスロジックの実装、ドメインルールの定義
- **含まれるもの**: Entity, Value Object, Collection, Repository Interface
- **依存方向**: 他のレイヤーに依存しない（最も独立している）
- **配置場所**: `backend/libs/domain/`
- **プリミティブ型の扱い**: 原則禁止。すべてドメイン型で表現

**重要原則**:

- **ドメイン層が最も大切**: ビジネスロジックの中心
- **Entity**: 識別子を持つドメインオブジェクト
- **Value Object**: 値そのものを表現するオブジェクト（不変）
- **Collection**: エンティティのコレクションを表現
- **他のレイヤーはドメイン層で作成したオブジェクトを活用する**

**例**:

```typescript
// Value Object（StringValueObjectを継承）
export class VideoId extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}

// Value Object（BigNumberValueObjectを継承）
export class AmountMicros extends BigNumberValueObject {
  @IsNotEmpty()
  protected readonly val: BigNumber

  constructor(val: string | number | BigNumber.Instance | bigint) {
    if (typeof val === 'bigint') {
      val = val.toString()
    }
    super(BigNumber(val))
    this.val = BigNumber(val)
  }

  toAmount() {
    return new Amount(this.val.div(1_000_000))
  }
}

// Entity（public readonlyがメイン）
export class MembershipBundle {
  @Transform(({ value }: { value: VideoId }) => value.get())
  public readonly videoId: VideoId
  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId
  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly amountMicros: AmountMicros
  @Transform(({ value }: { value: Count }) => value.get())
  public readonly count: Count
  @Transform(({ value }: { value: ActualStartTime }) => value.get())
  public readonly actualStartTime: ActualStartTime
  @Transform(({ value }: { value?: ActualEndTime }) => value?.get())
  public readonly actualEndTime?: ActualEndTime
  @Transform(({ value }: { value: Group }) => value.get())
  public readonly group: Group

  constructor(args: {
    videoId: VideoId
    channelId: ChannelId
    amountMicros: AmountMicros
    count: Count
    actualStartTime: ActualStartTime
    actualEndTime?: ActualEndTime
    group: Group
  }) {
    this.videoId = args.videoId
    this.channelId = args.channelId
    this.amountMicros = args.amountMicros
    this.count = args.count
    this.actualStartTime = args.actualStartTime
    this.actualEndTime = args.actualEndTime
    this.group = args.group
  }
}

// Collection（Collectionクラスを継承）
export class MembershipBundles extends Collection<MembershipBundle> {
  constructor(protected readonly list: MembershipBundle[]) {
    super(list)
  }
}

// Repository Interface
export interface MembershipBundleRepository {
  findAll: (args: {
    where?: {
      videoIds?: VideoIds
      channelId?: ChannelId
      group?: Group
      gender?: Gender
      actualEndTime?: null
      createdAt?: { gte?: Date; lte?: Date }
    }
    orderBy?: Partial<Record<'amountMicros', 'asc' | 'desc'>>[]
    limit?: number
    offset?: number
  }) => Promise<MembershipBundles>

  findOne: (args: {
    where: { videoId: VideoId }
  }) => Promise<MembershipBundle | null>

  save: (args: { data: MembershipBundle }) => Promise<void>
}
```

#### 4. Infra 層（インフラストラクチャ層）

- **責務**: 外部システムとの連携、永続化、外部 API アクセス
- **含まれるもの**: Repository 実装, ORM Entity, External API Client
- **依存方向**: Domain 層に依存（Repository Interface を実装）
- **配置場所**: `backend/libs/infra/`
- **プリミティブ型の扱い**:
  - 入力: 外部システムからのプリミティブ型 → ドメイン型への変換
  - 出力: ドメイン型 → プリミティブ型への変換（この層の出口で変換）

**例**:

```typescript
// Repository実装
@Injectable()
export class MembershipBundleRepositoryImpl
  implements MembershipBundleRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async save(args: { data: MembershipBundle }): Promise<void> {
    const { data } = args
    // ドメイン型からプリミティブ型への変換（Infra層の出口）
    await this.prisma.membershipBundle.create({
      data: {
        videoId: data.videoId.get(),
        channelId: data.channelId.get(),
        amountMicros: data.amountMicros.get(),
        count: data.count.get(),
        actualStartTime: data.actualStartTime.get(),
        actualEndTime: data.actualEndTime?.get(),
        group: data.group.get()
      }
    })
  }

  async findOne(args: {
    where: { videoId: VideoId }
  }): Promise<MembershipBundle | null> {
    const record = await this.prisma.membershipBundle.findUnique({
      where: { videoId: args.where.videoId.get() }
    })

    if (!record) return null

    // プリミティブ型からドメイン型への変換（Infra層の入口）
    return new MembershipBundle({
      videoId: new VideoId(record.videoId),
      channelId: new ChannelId(record.channelId),
      amountMicros: new AmountMicros(record.amountMicros),
      count: new Count(record.count),
      actualStartTime: new ActualStartTime(record.actualStartTime),
      actualEndTime: record.actualEndTime
        ? new ActualEndTime(record.actualEndTime)
        : undefined,
      group: new Group(record.group)
    })
  }

  async findAll(args: {
    where?: {
      videoIds?: VideoIds
      channelId?: ChannelId
      group?: Group
      gender?: Gender
      actualEndTime?: null
      createdAt?: { gte?: Date; lte?: Date }
    }
    orderBy?: Partial<Record<'amountMicros', 'asc' | 'desc'>>[]
    limit?: number
    offset?: number
  }): Promise<MembershipBundles> {
    const records = await this.prisma.membershipBundle.findMany({
      where: {
        videoId: args.where?.videoIds
          ? { in: args.where.videoIds.map(id => id.get()) }
          : undefined,
        channelId: args.where?.channelId?.get(),
        group: args.where?.group?.get(),
        actualEndTime: args.where?.actualEndTime,
        createdAt: args.where?.createdAt
      },
      orderBy: args.orderBy,
      take: args.limit,
      skip: args.offset
    })

    // プリミティブ型からドメイン型への変換（Infra層の入口）
    return new MembershipBundles(
      records.map(
        record =>
          new MembershipBundle({
            videoId: new VideoId(record.videoId),
            channelId: new ChannelId(record.channelId),
            amountMicros: new AmountMicros(record.amountMicros),
            count: new Count(record.count),
            actualStartTime: new ActualStartTime(record.actualStartTime),
            actualEndTime: record.actualEndTime
              ? new ActualEndTime(record.actualEndTime)
              : undefined,
            group: new Group(record.group)
          })
      )
    )
  }
}
```

### プリミティブ型の使用ルール

#### 原則: ドメイン型を優先

- **禁止**: Application 層、Domain 層でのプリミティブ型の使用
- **許可される変換ポイント**:
  1. **Presentation 層の入口**: リクエスト DTO（プリミティブ型）→ ドメイン型
  2. **Presentation 層の出口**: ドメイン型 → レスポンス DTO（プリミティブ型）
  3. **Infra 層の入口**: 外部データ（プリミティブ型）→ ドメイン型
  4. **Infra 層の出口**: ドメイン型 → 永続化データ（プリミティブ型）

#### 悪い例（プリミティブ型を使用）

```typescript
// ❌ 悪い例
class MembershipBundlesService {
  async findAll(args: {
    channelId?: string // プリミティブ型
    group?: string // プリミティブ型
  }) {
    // プリミティブ型を直接扱っている
    return await this.membershipBundleRepository.findAll({
      where: {
        channelId: args.channelId, // 型が合わない
        group: args.group // 型が合わない
      }
    })
  }
}
```

#### 良い例（ドメイン型を使用）

```typescript
// ✅ 良い例
class MembershipBundlesService {
  async findAll(args: {
    channelId?: ChannelId // ドメイン型
    group?: Group // ドメイン型
  }) {
    // ドメイン型を扱う（バリデーションはValue Object内で完結）
    return await this.membershipBundleRepository.findAll({
      where: {
        channelId: args.channelId,
        group: args.group
      }
    })
  }
}
```

### 依存関係のルール

```
Presentation層 → Application層 → Domain層
                      ↓
                  Infra層 → Domain層（Interface）
```

- **Domain 層**: 他のどのレイヤーにも依存しない
- **Application 層**: Domain 層に依存
- **Presentation 層**: Application 層に依存
- **Infra 層**: Domain 層の Interface に依存（依存性逆転の原則）

### ディレクトリ構造の例

```
backend/
├── apps/
│   └── closed-api-server/
│       └── src/
│           └── presentation/
│               ├── membership-bundles/
│               │   ├── membership-bundles.controller.ts
│               │   └── dto/
│               │       └── GetMembershipBundles.dto.ts
│               └── supers-rankings/
│                   ├── supers-rankings.controller.ts
│                   ├── supers-rankings.scenario.ts    # Scenario
│                   └── dto/
│                       └── GetSupersRankings.dto.ts
└── libs/
    ├── application/
    │   └── membership-bundles/
    │       └── membership-bundles.service.ts
    ├── domain/
    │   ├── membership-bundle/
    │   │   ├── MembershipBundle.entity.ts        # Entity
    │   │   ├── MembershipBundles.collection.ts   # Collection
    │   │   └── MembershipBundle.repository.ts    # Repository Interface
    │   ├── youtube/
    │   │   ├── video/
    │   │   │   └── VideoId.ts                    # Value Object
    │   │   └── channel/
    │   │       └── ChannelId.ts                  # Value Object
    │   └── lib/
    │       ├── Collection.ts                     # Collection基底クラス
    │       ├── vo/
    │       │   ├── StringValueObject.ts          # Value Object基底クラス
    │       │   └── BigNumberValueObject.ts       # Value Object基底クラス
    │       └── currency/
    │           └── AmountMicros.vo.ts            # Value Object
    └── infra/
        └── repositories/
            └── MembershipBundleRepository.ts     # Repository実装
```

### 実装チェックリスト

新機能実装時は以下を確認してください：

#### Domain 層

- [ ] プリミティブ型を使用していないか
- [ ] Value Object でバリデーションを実装しているか
- [ ] Entity にビジネスロジックを実装しているか
- [ ] 他のレイヤーに依存していないか

#### Application 層

- [ ] ドメイン型のみを扱っているか
- [ ] プリミティブ型を使用していないか
- [ ] ユースケースが明確に表現されているか

#### Presentation 層

- [ ] Controller は Scenario を呼び出しているか（Service を直接呼び出していないか）
- [ ] Scenario でプリミティブ型からドメイン型への変換を行っているか
- [ ] Controller でドメイン型からプリミティブ型への変換を行っているか
- [ ] ビジネスロジックを含んでいないか

#### Infra 層

- [ ] Repository Interface を正しく実装しているか
- [ ] 入口でプリミティブ型からドメイン型への変換を行っているか
- [ ] 出口でドメイン型からプリミティブ型への変換を行っているか

### まとめ

- **Domain 層が最も重要**: ビジネスロジックの中心
- **ドメイン型を活用**: Entity, Value Object, Collection を他のレイヤーで活用
- **プリミティブ型は原則禁止**: 変換は Presentation 層の入口と Infra 層の出口のみ
- **依存方向を守る**: Domain 層は独立、他のレイヤーは Domain 層に依存
