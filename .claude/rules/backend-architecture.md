---
globs: backend/**/*
---

# レイヤードアーキテクチャとドメイン駆動設計

このプロジェクトでは、レイヤードアーキテクチャと DDD の原則に基づいて実装する。

## レイヤー構造と依存関係

```
backend/
├── apps/closed-api-server/src/presentation/  # Presentation 層
└── libs/
    ├── application/                          # Application 層
    ├── domain/                               # Domain 層
    └── infra/                                # Infra 層

依存方向:
Presentation → Application → Domain ← Infra
```

## 各レイヤーの責務

### Domain 層（最重要）

ビジネスロジックの中心。他のレイヤーに依存しない。

| 種類 | 説明 |
|------|------|
| Entity | 識別子を持つドメインオブジェクト |
| Value Object | 値そのものを表現（不変） |
| Collection | Entity のコレクション |
| Repository Interface | 永続化の抽象 |

**Entity の実装パターン**:

```typescript
export class Stream {
  // Class Serializer 用のデコレータを定義
  @Transform(({ value }: { value: VideoId }) => value.get())
  public readonly videoId: VideoId

  @Transform(({ value }: { value?: Duration }) => value?.get())
  public readonly duration?: Duration

  @Transform(({ value }: { value: GroupId }) => value.get())
  public readonly group: GroupId

  constructor(args: { videoId: VideoId; duration?: Duration; group: GroupId }) {
    this.videoId = args.videoId
    this.duration = args.duration
    this.group = args.group
  }
}
```

**Collection の実装パターン**:

配列は `Entity[]` ではなく専用の Collection クラスで扱う。

```typescript
import { Collection } from '@domain/lib/Collection'

export class Streams extends Collection<Stream> {
  constructor(protected readonly list: Stream[]) {
    super(list)
  }
}
```

主なデコレータ:
- `@Transform`: シリアライズ時の変換ルール
- `@Expose`: getter をシリアライズ対象に含める
- `@Exclude`: シリアライズから除外

参考: `libs/domain/stream/Stream.entity.ts`, `libs/domain/stream/Streams.collection.ts`

### Application 層

ビジネスロジックの調整、トランザクション管理。Domain 層のみに依存。

```typescript
@Injectable()
export class StreamsService {
  async findAll(): Promise<Streams> {
    return await this.repository.findAll()
  }
}
```

### Presentation 層

HTTP リクエスト/レスポンスの処理。

- **Controller**: ルーティング、バリデーション
- **Scenario**: ユースケースの実装（再利用しないため Presentation に配置）

```typescript
// Controller → Scenario → Service の流れ
@Injectable()
export class StreamsScenario {
  // ドメインオブジェクトをそのまま返す（Class Serializer が自動変換）
  async findAll(): Promise<Streams> {
    return await this.service.findAll()
  }
}
```

**❌ 悪い例**: 手動でプリミティブ変換を行う

```typescript
async findAll() {
  const streams = await this.service.findAll()
  return streams.map(s => ({ videoId: s.videoId.get() })) // 冗長
}
```

### Infra 層

外部システムとの連携。Domain 層の Repository Interface を実装。

```typescript
@Injectable()
export class StreamRepositoryImpl implements StreamRepository {
  async findAll(): Promise<Streams> {
    const rows = await this.prisma.stream.findMany()
    return new Streams(rows.map(row => this.toDomain(row)))
  }

  private toDomain(row: StreamRow): Stream {
    return new Stream({
      videoId: new VideoId(row.videoId),
      duration: row.duration ? new Duration(row.duration) : undefined,
      group: new GroupId(row.group)
    })
  }
}
```

## プリミティブ型の使用ルール

Application 層・Domain 層ではプリミティブ型を**使用禁止**。

変換が許可されるポイント:

| レイヤー | 入力 | 出力 |
|----------|------|------|
| Presentation | リクエスト → ドメイン型 | Class Serializer が自動変換 |
| Infra | DB/API レスポンス → ドメイン型 | ドメイン型 → 永続化データ |

## PostgreSQL / Prisma の注意点

### 日本時間ベースの集計

```sql
-- ✅ 日本時間で日付グルーピング
SELECT DATE("actualStartTime" AT TIME ZONE 'Asia/Tokyo') as date
GROUP BY DATE("actualStartTime" AT TIME ZONE 'Asia/Tokyo')

-- ❌ UTC でグルーピング（日本時間で日付がずれる）
SELECT DATE("actualStartTime") as date
```

日付範囲パラメータは JST 境界で計算:

```typescript
// JST 00:00:00 = UTC 前日 15:00:00
const lt = new Date(Date.UTC(year, month, day + 1, -9))
const gte = new Date(Date.UTC(year, month, day + 1 - days, -9))
```

### Raw Query の戻り値の型

PostgreSQL の集計関数は TypeScript の期待と異なる型を返す:

| 関数 | 実際の型 | 対処 |
|------|----------|------|
| `SUM()`, `EXTRACT()` | `string` | `Number()` で変換 |
| `COUNT(*)` | `bigint` | `Number()` で変換 |

```typescript
interface Row {
  total_hours: string | null  // number ではない
  count: bigint               // number ではない
}

new Hours(Number(row.total_hours ?? 0))
new Count(Number(row.count))
```
