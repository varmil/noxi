---
globs: backend/**/*
---

# レイヤードアーキテクチャとドメイン駆動設計

このプロジェクトでは、レイヤードアーキテクチャとドメイン駆動設計（DDD）の原則に基づいて実装します。

## レイヤー構造

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

## 各レイヤーの責務

### 1. Presentation 層

- **責務**: HTTP リクエスト/レスポンスの処理、入力バリデーション、ユースケースの実装
- **含まれるもの**: Controller, Scenario（ユースケース）, DTO, Validator
- **依存方向**: Application 層に依存
- **配置場所**: `backend/apps/closed-api-server/src/presentation/`

**プリミティブ型の扱い**:
- 入力: プリミティブ型 → ドメイン型への変換（この層の最初で）
- 出力: ドメイン型 → プリミティブ型への変換（レスポンス生成時）

**重要**:
- **Scenario**: ユースケースを表現するクラス。再利用しないため、Presentation 層に配置
- **Controller → Scenario → Service**: Controller は Scenario を呼び出し、Scenario が Service を呼び出す

### 2. Application 層

- **責務**: ビジネスロジックの調整、トランザクション管理、ドメインオブジェクトの調整
- **含まれるもの**: Service
- **依存方向**: Domain 層と Infra 層に依存
- **配置場所**: `backend/libs/application/`
- **プリミティブ型の扱い**: 原則禁止。ドメイン型のみを扱う

### 3. Domain 層（最重要）

- **責務**: ビジネスロジックの実装、ドメインルールの定義
- **含まれるもの**: Entity, Value Object, Collection, Repository Interface
- **依存方向**: 他のレイヤーに依存しない（最も独立）
- **配置場所**: `backend/libs/domain/`
- **プリミティブ型の扱い**: 原則禁止。すべてドメイン型で表現

**重要原則**:
- ドメイン層が最も大切（ビジネスロジックの中心）
- Entity: 識別子を持つドメインオブジェクト
- Value Object: 値そのものを表現（不変）
- Collection: エンティティのコレクションを表現
- 他のレイヤーはドメイン層で作成したオブジェクトを活用

### 4. Infra 層

- **責務**: 外部システムとの連携、永続化、外部 API アクセス
- **含まれるもの**: Repository 実装, ORM Entity, External API Client
- **依存方向**: Domain 層に依存（Repository Interface を実装）
- **配置場所**: `backend/libs/infra/`

**プリミティブ型の扱い**:
- 入力: 外部データ → ドメイン型への変換
- 出力: ドメイン型 → 永続化データへの変換

## 依存関係のルール

```
Presentation層 → Application層 → Domain層
                      ↓
                  Infra層 → Domain層（Interface）
```

- **Domain 層**: 他のどのレイヤーにも依存しない
- **Application 層**: Domain 層に依存
- **Presentation 層**: Application 層に依存
- **Infra 層**: Domain 層の Interface に依存（依存性逆転の原則）

## プリミティブ型の使用ルール

### 原則: ドメイン型を優先

- **禁止**: Application 層、Domain 層でのプリミティブ型の使用
- **許可される変換ポイント**:
  1. Presentation 層の入口: リクエスト DTO → ドメイン型
  2. Presentation 層の出口: ドメイン型 → レスポンス DTO
  3. Infra 層の入口: 外部データ → ドメイン型
  4. Infra 層の出口: ドメイン型 → 永続化データ

### 良い例

```typescript
// ✅ ドメイン型を使用
class MembershipBundlesService {
  async findAll(args: {
    channelId?: ChannelId  // ドメイン型
    group?: Group          // ドメイン型
  }) {
    return await this.membershipBundleRepository.findAll({
      where: { channelId: args.channelId, group: args.group }
    })
  }
}
```

### 悪い例

```typescript
// ❌ プリミティブ型を使用
class MembershipBundlesService {
  async findAll(args: {
    channelId?: string  // プリミティブ型
    group?: string      // プリミティブ型
  }) { ... }
}
```

## 実装チェックリスト

### Domain 層

- [ ] プリミティブ型を使用していないか
- [ ] Value Object でバリデーションを実装しているか
- [ ] Entity にビジネスロジックを実装しているか
- [ ] 他のレイヤーに依存していないか

### Application 層

- [ ] ドメイン型のみを扱っているか
- [ ] プリミティブ型を使用していないか
- [ ] ユースケースが明確に表現されているか

### Presentation 層

- [ ] プリミティブ型からドメイン型への変換を行っているか
- [ ] ドメイン型からプリミティブ型への変換を行っているか
- [ ] ビジネスロジックを含んでいないか

### Infra 層

- [ ] Repository Interface を正しく実装しているか
- [ ] 入口でプリミティブ型からドメイン型への変換を行っているか
- [ ] 出口でドメイン型からプリミティブ型への変換を行っているか

## PostgreSQL / Prisma の注意点

### 日本時間ベースの集計

日付ベースの集計では `AT TIME ZONE 'Asia/Tokyo'` を使用する：

```sql
-- ✅ 日本時間で日付グルーピング
SELECT DATE("actualStartTime" AT TIME ZONE 'Asia/Tokyo') as date
GROUP BY DATE("actualStartTime" AT TIME ZONE 'Asia/Tokyo')

-- ❌ UTC で日付グルーピング（日本時間で日付がずれる）
SELECT DATE("actualStartTime") as date
```

日付範囲パラメータも JST 境界で計算：

```typescript
// JST 00:00:00 = UTC 前日 15:00:00
// Date.UTC() に -9 時間を指定すると自動で前日 15:00 に変換される
const lt = new Date(Date.UTC(year, month, day + 1, -9))
const gte = new Date(Date.UTC(year, month, day + 1 - days, -9))
```

### Prisma Raw Query の型

PostgreSQL の `SUM()` や `EXTRACT()` は高精度小数を**文字列**で返す：

```typescript
// ❌ 型が合わない（実際は string が返る）
interface Row {
  total_duration_hours: number | null
}

// ✅ 正しい型定義
interface Row {
  total_duration_hours: string | null
}

// 使用時に Number() で変換
new DurationHours(Number(row.total_duration_hours ?? 0))
```

同様に `COUNT(*)` は `bigint` で返るため、`Number()` での変換が必要：

```typescript
interface Row {
  stream_count: bigint  // number ではない
}

new Count(Number(row.stream_count))
```
