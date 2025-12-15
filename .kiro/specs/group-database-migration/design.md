# 設計文書

## 概要

この設計は、静的な GroupStrings 定数をデータベース駆動型の Group 管理システムに移行し、ユーザーが Web インターフェースを通じて新しい Group を申請できる機能を提供します。既存の ChannelRegistration パターンに従い、段階的な移行アプローチを採用します。

## アーキテクチャ

### 全体アーキテクチャ

```
Frontend (Next.js)
├── Group申請UI (/groups/add)
├── 既存UI（型をstringに変更）
└── Group画像表示（相対/絶対URL対応）

Backend (NestJS)
├── Group CRUD API
├── GroupRegistration API
├── 既存API（型をstringに変更）
└── データベース移行

Database (PostgreSQL)
├── Group テーブル（新規）
├── GroupRegistration テーブル（新規）
└── 既存テーブル（group列はstring型のまま）
```

### レイヤー構成

1. **Presentation Layer**: Controller（API エンドポイント）
2. **Application Layer**: Service（ビジネスロジック）
3. **Domain Layer**: Entity、Repository Interface
4. **Infrastructure Layer**: Repository Implementation、Prisma

## コンポーネントと インターフェース

### データベーススキーマ

#### Group テーブル

```sql
CREATE TABLE "Group" (
  id        VARCHAR(255) PRIMARY KEY,  -- 小文字英数字とハイフンのみ
  name      VARCHAR(255) NOT NULL,     -- 表示名
  iconSrc   VARCHAR(500) NOT NULL,     -- アイコン画像のURL/パス
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

#### GroupRegistration テーブル

```sql
CREATE TABLE "GroupRegistration" (
  id        SERIAL PRIMARY KEY,
  groupId   VARCHAR(255) NOT NULL,     -- 申請されたGroup ID
  name      VARCHAR(255) NOT NULL,     -- 申請されたGroup名
  iconSrc   VARCHAR(500) NOT NULL,     -- 申請されたアイコンURL
  status    VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected
  appliedAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

### バックエンド コンポーネント

#### Domain Layer

**Group Entity**

```typescript
import { IsNotEmpty, IsString, Matches, IsIn } from 'class-validator'
import { StringValueObject } from '@domain/lib/vo/StringValueObject'
import { NumberValueObject } from '@domain/lib/vo/NumberValueObject'
import { DateValueObject } from '@domain/lib/vo/DateValueObject'

export class GroupId extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z0-9-]+$/, {
    message:
      'Group ID must contain only lowercase alphanumeric characters and hyphens'
  })
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}

export class GroupName extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}

export class GroupIconSrc extends StringValueObject {
  @IsNotEmpty()
  @IsString()
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}

export class Group {
  constructor(
    public readonly id: GroupId,
    public readonly name: GroupName,
    public readonly iconSrc: GroupIconSrc
  ) {}
}

export class GroupRegistrationId extends NumberValueObject {
  @IsNotEmpty()
  protected readonly val: number

  constructor(val: number) {
    super(val)
    this.val = val
  }
}

export class GroupRegistrationStatus extends StringValueObject {
  @IsNotEmpty()
  @IsIn(['pending', 'approved', 'rejected'])
  protected readonly val: 'pending' | 'approved' | 'rejected'

  constructor(val: 'pending' | 'approved' | 'rejected') {
    super(val)
    this.val = val
  }
}

export class AppliedAt extends DateValueObject {
  @IsNotEmpty()
  protected readonly val: Date

  constructor(val: Date) {
    super(val)
    this.val = val
  }
}

export class GroupRegistration {
  constructor(
    public readonly id: GroupRegistrationId,
    public readonly groupId: GroupId,
    public readonly name: GroupName,
    public readonly iconSrc: GroupIconSrc,
    public readonly status: GroupRegistrationStatus,
    public readonly appliedAt: AppliedAt
  ) {}
}
```

**Repository Interfaces**

```typescript
export interface GroupRepository {
  findAll(): Promise<Group[]>
  findById(id: GroupId): Promise<Group | null>
  create(group: Group): Promise<void>
  update(
    id: GroupId,
    group: Partial<{ name: GroupName; iconSrc: GroupIconSrc }>
  ): Promise<void>
  delete(id: GroupId): Promise<void>
}

export interface GroupRegistrationRepository {
  findAll({ limit }: { limit?: number }): Promise<GroupRegistration[]>
  create(
    registration: Omit<GroupRegistration, 'id' | 'appliedAt'>
  ): Promise<void>
  updateStatus(
    id: GroupRegistrationId,
    status: GroupRegistrationStatus
  ): Promise<void>
}
```

#### Application Layer

**GroupService**

```typescript
@Injectable()
export class GroupService {
  async findAll(): Promise<Group[]>
  async findById(id: GroupId): Promise<Group>
  async create(createGroupDto: CreateGroupDto): Promise<void>
  async update(id: GroupId, updateGroupDto: UpdateGroupDto): Promise<void>
  async delete(id: GroupId): Promise<void>
}

@Injectable()
export class GroupRegistrationService {
  async findAll({ limit = 30 }: { limit?: number } = {}): Promise<
    GroupRegistration[]
  >
  async create(createDto: CreateGroupRegistrationDto): Promise<void>
  async updateStatus(id: number, status: GroupRegistrationStatus): Promise<void>
}
```

#### Presentation Layer

**GroupController**

```typescript
@Controller('groups')
export class GroupController {
  @Get() findAll()
  @Get(':id') findById(@Param('id') id: string)
  @Post() create(@Body() createGroupDto: CreateGroupDto)
  @Put(':id') update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto)
  @Delete(':id') delete(@Param('id') id: string)
}

@Controller('group-registrations')
export class GroupRegistrationController {
  @Get() findAll(@Query('limit') limit?: number)
  @Post() create(@Body() createDto: CreateGroupRegistrationDto)
  @Put(':id/status') updateStatus(@Param('id') id: number, @Body() statusDto: UpdateStatusDto)
}
```

### フロントエンド コンポーネント

#### Group 申請ページ構成

```
/groups/add
├── GroupRegistrationForm.tsx    -- 申請フォーム
├── GroupRegistrationHistory.tsx -- 申請履歴
└── ImagePreview.tsx            -- アイコンプレビュー
```

#### 主要コンポーネント

**GroupRegistrationForm**

- Group ID 入力（バリデーション付き）
- Group 名入力
- アイコン URL 入力（プレビュー機能付き）
- 送信ボタン

**GroupRegistrationHistory**

- 最新 30 件の申請履歴表示
- ステータス表示（pending/approved/rejected）
- 申請日時表示

**ImagePreview**

- 円形画像プレビュー
- 相対 URL/絶対 URL 対応
- フォールバック画像対応

## データモデル

### Group

```typescript
interface Group {
  id: string // 小文字英数字とハイフンのみ、ユニーク
  name: string // 表示名
  iconSrc: string // アイコン画像のURL/パス
}
```

### GroupRegistration

```typescript
interface GroupRegistration {
  id: number
  groupId: string // 申請されたGroup ID
  name: string // 申請されたGroup名
  iconSrc: string // 申請されたアイコンURL
  status: 'pending' | 'approved' | 'rejected'
  appliedAt: Date
}
```

### 既存データ移行マッピング

```typescript
const LEGACY_GROUP_MAPPING = {
  hololive: { name: 'ホロライブ', iconSrc: '/group/hololive/logo.png' },
  nijisanji: { name: 'にじさんじ', iconSrc: '/group/nijisanji/logo.png' },
  vspo: { name: 'ぶいすぽっ！', iconSrc: '/group/vspo/logo.png' }
  // ... 他の既存Group
}
```

## 正確性プロパティ

_プロパティは、システムのすべての有効な実行において真であるべき特性や動作です。プロパティは、人間が読める仕様と機械で検証可能な正確性保証の橋渡しとして機能します。_

### プロパティ 1: Group ID 一意性と形式検証

_任意の_ Group ID 入力において、重複する ID または小文字英数字とハイフン以外の文字が含まれる場合、システムは作成を拒否する
**検証対象: 要件 1.5, 要件 3.2, 要件 3.3, 要件 4.2**

### プロパティ 2: マイグレーションデータ完全性

_任意の_ 既存 GroupStrings 定数において、マイグレーション後の Group テーブルに対応するレコードが存在し、適切な `/group/${group}/logo.png` 形式の iconSrc が設定される
**検証対象: 要件 1.2, 要件 1.3**

### プロパティ 3: 既存システム機能継続性

_任意の_ 既存システム機能において、GroupStrings から string 型への変更後も、すべての API 機能と UI 機能が正しく動作する
**検証対象: 要件 2.3, 要件 2.4**

### プロパティ 4: Group データ検証と応答形式

_任意の_ Group 操作において、システムはデータベースに対して Group の存在を検証し、id、name、iconSrc を含む正しい形式で応答する
**検証対象: 要件 2.5, 要件 3.4**

### プロパティ 5: アイコン画像 URL 処理

_任意の_ iconSrc 値において、相対パスは適切に解決され、絶対 URL は直接使用され、すべて円形プレビューとして表示される
**検証対象: 要件 4.3, 要件 6.1, 要件 6.2, 要件 6.3**

### プロパティ 6: 申請履歴表示と順序

_任意の_ Group 申請履歴において、申請は提出日時の降順で表示され、最新 30 件に制限され、各申請のステータス、提出日、詳細が含まれる
**検証対象: 要件 4.5, 要件 5.2, 要件 5.3**

### プロパティ 7: フォーム送信と API 連携

_任意の_ 有効な Group 申請フォーム送信において、フロントエンドシステムはバックエンド API に申請データを送信し、監査証跡を記録する
**検証対象: 要件 4.4, 要件 7.5**

### プロパティ 8: エラーハンドリングとフォールバック

_任意の_ 無効な iconSrc またはエラー状態において、システムは適切なフォールバック画像または空状態メッセージを表示する
**検証対象: 要件 5.4, 要件 6.4**

## エラーハンドリング

### バックエンド エラーハンドリング

1. **Group ID 重複エラー**

   - HTTP 409 Conflict
   - エラーメッセージ: "Group ID already exists"

2. **Group ID 形式エラー**

   - HTTP 400 Bad Request
   - エラーメッセージ: "Group ID must contain only lowercase alphanumeric characters and hyphens"

3. **Group 未発見エラー**

   - HTTP 404 Not Found
   - エラーメッセージ: "Group not found"

4. **データベース接続エラー**
   - HTTP 500 Internal Server Error
   - ログ記録とフォールバック処理

### フロントエンド エラーハンドリング

1. **フォームバリデーションエラー**

   - リアルタイムバリデーション表示
   - 送信ボタン無効化

2. **画像読み込みエラー**

   - フォールバック画像表示
   - エラーメッセージ表示

3. **API 通信エラー**
   - トースト通知でエラー表示
   - リトライ機能提供

## テスト戦略

### 単体テスト

**バックエンド**

- Domain Entity テスト
- Service ロジックテスト
- Repository 実装テスト
- Controller エンドポイントテスト

**フロントエンド**

- コンポーネント レンダリングテスト
- フォーム バリデーションテスト
- API 統合テスト

### プロパティベーステスト

プロパティベーステストには **fast-check** ライブラリを使用し、各テストは最低 100 回の反復実行を行います。

**テスト対象プロパティ:**

1. **Group ID 一意性テスト**

   - ランダムな Group ID セットを生成
   - 重複 ID での作成試行が適切に拒否されることを検証

2. **Group ID 形式テスト**

   - 無効な文字を含むランダムな ID 文字列を生成
   - すべての無効入力が拒否されることを検証

3. **アイコン URL 処理テスト**

   - 相対パス/絶対 URL のランダムな組み合わせを生成
   - すべてのケースで適切な URL 解決が行われることを検証

4. **申請履歴ソートテスト**
   - ランダムな申請日時のセットを生成
   - 常に降順でソートされることを検証

### 統合テスト

1. **マイグレーション テスト**

   - 既存 GroupStrings の完全移行確認
   - データ整合性検証

2. **エンドツーエンド テスト**
   - Group 申請フロー全体のテスト
   - UI 操作からデータベース保存まで

### テスト環境

- **単体テスト**: Jest + Testing Library
- **プロパティベーステスト**: fast-check
- **統合テスト**: Supertest (バックエンド) + Playwright (フロントエンド)
- **データベーステスト**: NeonDB develop ブランチ
