# 価格比較Webアプリケーション 仕様書

## 1. プロジェクト概要

### 1.1 目的
スーパーごとの商品価格を記録・比較し、賢い買い物をサポートするWebアプリケーション

### 1.2 技術スタック
- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Backend/DB**: Firebase (Firestore + Authentication)
- **Hosting**: Vercel (Frontend) + Firebase (Backend)
- **Styling**: Tailwind CSS
- **Testing**: Vitest + React Testing Library

### 1.3 開発方針
- ドメイン駆動設計（DDD）
- テスト駆動開発（TDD）
- チーム開発を想定したGit運用
- レスポンシブ対応（モバイルファースト）

---

## 2. ドメインモデル

### 2.1 エンティティ（Entity）

#### User（ユーザー）
- **識別子**: userId (string)
- **属性**:
  - email (string)
  - displayName (string)
  - photoURL (string | null)
  - createdAt (timestamp)

#### Category（カテゴリー）
- **識別子**: categoryId (string)
- **属性**:
  - name (string)
  - parentCategoryId (string | null) ※2階層構造
  - displayOrder (number)
  - userId (string)
  - createdAt (timestamp)
  - updatedAt (timestamp)

#### Store（スーパー/店舗）
- **識別子**: storeId (string)
- **属性**:
  - name (string)
  - location (string | null)
  - memo (string | null)
  - userId (string)
  - createdAt (timestamp)
  - updatedAt (timestamp)

#### Product（商品）
- **識別子**: productId (string)
- **属性**:
  - name (string)
  - categoryId (string)
  - photoURL (string | null)
  - memo (string | null)
  - userId (string)
  - createdAt (timestamp)
  - updatedAt (timestamp)

#### Price（価格情報）
- **識別子**: priceId (string)
- **属性**:
  - productId (string)
  - storeId (string)
  - price (number)
  - recordedAt (timestamp)
  - userId (string)
  - createdAt (timestamp)
  - updatedAt (timestamp)

### 2.2 値オブジェクト（Value Object）

#### Money（金額）
- amount (number)
- currency (string) ※初期は "JPY" 固定

#### ProductName（商品名）
- value (string)
- バリデーション: 1文字以上50文字以下

#### CategoryName（カテゴリー名）
- value (string)
- バリデーション: 1文字以上30文字以下

#### StoreName（店舗名）
- value (string)
- バリデーション: 1文字以上50文字以下

### 2.3 集約（Aggregate）

#### Product Aggregate（商品集約）
- **集約ルート**: Product
- **含まれるエンティティ**: Price
- **不変条件**:
  - 商品は必ず1つのカテゴリーに属する
  - 同一商品・同一店舗の価格は最新のものを参照
  - 商品削除時は関連する価格情報も削除

#### Category Aggregate（カテゴリー集約）
- **集約ルート**: Category
- **不変条件**:
  - 親カテゴリーは2階層まで（親→子の2階層構造）
  - 子カテゴリーを持つ親カテゴリーは削除不可
  - カテゴリー名は同一階層内でユニーク

---

## 3. ユースケース一覧

### 3.1 アクター
- **一般ユーザー**: ログインして自分のデータを管理

### 3.2 認証関連
- UC-AUTH-01: Googleアカウントでログイン
- UC-AUTH-02: ログアウト

### 3.3 カテゴリー管理
- UC-CAT-01: カテゴリー一覧表示
- UC-CAT-02: カテゴリー作成（親カテゴリー/子カテゴリー）
- UC-CAT-03: カテゴリー編集
- UC-CAT-04: カテゴリー削除
- UC-CAT-05: カテゴリー表示順変更

### 3.4 店舗管理
- UC-STORE-01: 店舗一覧表示
- UC-STORE-02: 店舗登録
- UC-STORE-03: 店舗編集
- UC-STORE-04: 店舗削除

### 3.5 商品管理
- UC-PROD-01: 商品一覧表示（カテゴリー別）
- UC-PROD-02: 商品登録（写真・商品名・メモ・カテゴリー選択）
- UC-PROD-03: 商品詳細表示
- UC-PROD-04: 商品編集
- UC-PROD-05: 商品削除

### 3.6 価格管理
- UC-PRICE-01: 商品ごとに各店舗の価格を登録
- UC-PRICE-02: 価格編集
- UC-PRICE-03: 価格削除
- UC-PRICE-04: 店舗別価格比較表示

---

## 4. 画面一覧と遷移

### 4.1 画面一覧

#### P-01: ログイン画面
- Googleログインボタン
- アプリ説明

#### P-02: ホーム画面
- カテゴリー一覧カード表示
- 店舗管理リンク
- ログアウトボタン

#### P-03: カテゴリー管理画面
- カテゴリー階層表示
- カテゴリー追加・編集・削除機能
- 表示順変更（ドラッグ&ドロップ or ボタン）

#### P-04: 店舗管理画面
- 店舗一覧表示
- 店舗追加・編集・削除機能

#### P-05: 商品一覧画面（カテゴリー別）
- カテゴリー名表示
- 商品カード一覧（写真・商品名・最安値店舗）
- 商品追加ボタン

#### P-06: 商品詳細・価格管理画面
- 商品情報表示（写真・名前・メモ）
- 商品編集ボタン
- 店舗別価格一覧
- 価格追加・編集・削除機能
- 最安値ハイライト

#### P-07: 商品登録・編集画面
- 写真アップロード
- 商品名入力
- カテゴリー選択（2階層）
- メモ入力

### 4.2 画面遷移図
```
P-01 (ログイン)
  ↓
P-02 (ホーム)
  ├→ P-03 (カテゴリー管理)
  ├→ P-04 (店舗管理)
  └→ P-05 (商品一覧) → P-06 (商品詳細) → P-07 (商品編集)
                          ↓
                        P-07 (商品登録)
```

---

## 5. Firestoreデータモデル

### 5.1 コレクション設計

#### users
```
users/{userId}
  - email: string
  - displayName: string
  - photoURL: string | null
  - createdAt: timestamp
```

#### categories
```
categories/{categoryId}
  - name: string
  - parentCategoryId: string | null
  - displayOrder: number
  - userId: string
  - createdAt: timestamp
  - updatedAt: timestamp

インデックス:
  - userId ASC, parentCategoryId ASC, displayOrder ASC
```

#### stores
```
stores/{storeId}
  - name: string
  - location: string | null
  - memo: string | null
  - userId: string
  - createdAt: timestamp
  - updatedAt: timestamp

インデックス:
  - userId ASC, name ASC
```

#### products
```
products/{productId}
  - name: string
  - categoryId: string
  - photoURL: string | null
  - memo: string | null
  - userId: string
  - createdAt: timestamp
  - updatedAt: timestamp

インデックス:
  - userId ASC, categoryId ASC, name ASC
```

#### prices
```
prices/{priceId}
  - productId: string
  - storeId: string
  - price: number
  - recordedAt: timestamp
  - userId: string
  - createdAt: timestamp
  - updatedAt: timestamp

インデックス:
  - userId ASC, productId ASC, storeId ASC, recordedAt DESC
  - userId ASC, storeId ASC, recordedAt DESC
```

### 5.2 セキュリティルール方針
- 全てのデータはログインユーザーのuserIdでフィルタリング
- ユーザーは自分のデータのみ読み書き可能
- 削除時は関連データの整合性チェック

---

## 6. ディレクトリ構成

```
price-tracker/
├── public/                      # 静的ファイル
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   ├── (main)/
│   │   │   ├── layout.tsx       # 認証済みレイアウト
│   │   │   ├── page.tsx         # ホーム画面
│   │   │   ├── categories/
│   │   │   │   └── page.tsx
│   │   │   ├── stores/
│   │   │   │   └── page.tsx
│   │   │   ├── products/
│   │   │   │   ├── [categoryId]/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── [productId]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── edit/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── new/
│   │   │   │       └── page.tsx
│   │   ├── api/                 # API Routes (必要に応じて)
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/              # Presentational Components
│   │   ├── auth/
│   │   ├── category/
│   │   ├── store/
│   │   ├── product/
│   │   ├── price/
│   │   ├── common/
│   │   └── layout/
│   ├── domain/                  # ドメイン層
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Category.ts
│   │   │   ├── Store.ts
│   │   │   ├── Product.ts
│   │   │   └── Price.ts
│   │   ├── valueObjects/
│   │   │   ├── Money.ts
│   │   │   ├── ProductName.ts
│   │   │   ├── CategoryName.ts
│   │   │   └── StoreName.ts
│   │   └── repositories/        # Repository Interface
│   │       ├── ICategoryRepository.ts
│   │       ├── IStoreRepository.ts
│   │       ├── IProductRepository.ts
│   │       └── IPriceRepository.ts
│   ├── infrastructure/          # インフラ層
│   │   ├── firebase/
│   │   │   ├── config.ts
│   │   │   ├── auth.ts
│   │   │   └── storage.ts
│   │   └── repositories/        # Repository実装
│   │       ├── CategoryRepository.ts
│   │       ├── StoreRepository.ts
│   │       ├── ProductRepository.ts
│   │       └── PriceRepository.ts
│   ├── application/             # アプリケーション層
│   │   ├── usecases/
│   │   │   ├── category/
│   │   │   ├── store/
│   │   │   ├── product/
│   │   │   └── price/
│   │   └── services/
│   ├── hooks/                   # Custom React Hooks
│   │   ├── useAuth.ts
│   │   ├── useCategory.ts
│   │   ├── useStore.ts
│   │   ├── useProduct.ts
│   │   └── usePrice.ts
│   ├── lib/                     # ユーティリティ
│   │   ├── validators.ts
│   │   └── formatters.ts
│   └── types/                   # 型定義
│       └── index.ts
├── tests/                       # テストコード
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.local.example
├── .gitignore
├── firebase.json
├── firestore.rules
├── firestore.indexes.json
├── next.config.js
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vitest.config.ts
├── README.md
└── SPEC.md
```

---

## 7. Git運用ルール

### 7.1 ブランチ戦略（GitHub Flow）

#### ブランチ種類
- **main**: 本番環境（常にデプロイ可能な状態）
- **feature/xxx**: 機能開発用
- **fix/xxx**: バグ修正用
- **refactor/xxx**: リファクタリング用

#### ブランチ命名規則
```
feature/issue番号-簡潔な説明
fix/issue番号-簡潔な説明
refactor/issue番号-簡潔な説明

例:
feature/12-add-category-crud
fix/34-price-validation-error
refactor/56-extract-price-logic
```

#### フロー
1. mainから作業ブランチを作成
2. 実装・テスト作成
3. Pull Request作成
4. レビュー・承認
5. mainへマージ
6. 自動デプロイ（Vercel）

### 7.2 コミットメッセージ規約（Conventional Commits）

#### フォーマット
```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Type
- **feat**: 新機能
- **fix**: バグ修正
- **docs**: ドキュメント
- **style**: コードフォーマット
- **refactor**: リファクタリング
- **test**: テスト追加・修正
- **chore**: ビルド・設定変更

#### 例
```
feat(category): カテゴリー作成機能を追加

- 親カテゴリー・子カテゴリーの作成
- バリデーション追加
- Firestoreへの保存処理

Closes #12
```

```
fix(price): 価格更新時のバリデーションエラーを修正

数値型チェックが正しく動作していなかった問題を修正

Fixes #34
```

### 7.3 Pull Request規約

#### PRテンプレート
```markdown
## 概要
<!-- 何を実装/修正したか -->

## 変更内容
- [ ] 実装内容1
- [ ] 実装内容2

## テスト
- [ ] ユニットテスト追加
- [ ] 手動テスト完了

## スクリーンショット
<!-- UI変更がある場合 -->

## 関連Issue
Closes #xxx
```

#### レビュー基準
- コードが仕様に沿っているか
- テストが適切に書かれているか
- 命名規則に従っているか
- DDDの設計原則に沿っているか

---

## 8. 非機能要件

### 8.1 パフォーマンス
- 初回ロード時間: 3秒以内
- ページ遷移: 1秒以内
- 画像最適化: Next.js Image最適化使用
- Firestoreクエリ最適化（インデックス活用）

### 8.2 セキュリティ
- Firebase Authenticationによる認証
- Firestoreセキュリティルールによるアクセス制御
- 環境変数による機密情報管理
- XSS対策（Next.jsデフォルト機能）

### 8.3 可用性
- Vercel: 99.9%稼働率
- Firebase: 99.95%稼働率
- エラーハンドリング（ユーザーフレンドリーなエラー表示）

### 8.4 保守性
- TypeScriptによる型安全性
- ESLint/Prettierによるコード品質維持
- ドメインモデルとインフラの分離
- テストカバレッジ70%以上目標

### 8.5 ユーザビリティ
- レスポンシブデザイン（モバイル/タブレット/デスクトップ）
- 直感的なUI/UX
- ローディング状態の表示
- 操作フィードバック（成功/エラーメッセージ）

### 8.6 スケーラビリティ
- Firestore自動スケーリング
- Cloud Storage画像配信最適化
- ユーザーごとのデータ分離設計

### 8.7 ブラウザ対応
- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）
- モバイルブラウザ（iOS Safari, Android Chrome）

---

## 9. 開発フェーズ

### Phase 1: 環境構築・認証
- Next.js + Firebase環境構築
- Googleログイン実装
- 基本レイアウト

### Phase 2: 店舗・カテゴリー管理
- カテゴリーCRUD
- 店舗CRUD
- 2階層カテゴリー管理

### Phase 3: 商品管理
- 商品CRUD
- 画像アップロード
- カテゴリー別一覧

### Phase 4: 価格管理
- 価格登録・編集
- 店舗別価格比較
- 最安値表示

### Phase 5: 改善・最適化
- パフォーマンス最適化
- UI/UX改善
- テスト拡充

---

## 10. 設計判断記録（ADR）

### ADR-001: ドメイン駆動設計の採用

**日付**: 2026-03-15
**ステータス**: 決定済み

**背景**
価格比較アプリのビジネスロジック（値オブジェクト、エンティティ、集約）が複雑になる可能性がある。

**決定**
ドメイン駆動設計（DDD）を採用し、ドメイン層・アプリケーション層・インフラ層の3層アーキテクチャを採用する。

**理由**
- ビジネスロジックとインフラストラクチャの明確な分離
- テストが容易になる
- 将来的な拡張性が高い

**影響範囲**
- src/domain/ ディレクトリ構成
- Repositoryパターンの導入
- 値オブジェクトの積極的な活用

---

### ADR-002: 画像ストレージにCloudinaryを採用

**日付**: 2026-03-15
**ステータス**: 決定済み

**背景**
商品写真の保存先としてFirebase Storageを予定していたが、2024年以降の仕様変更により新規プロジェクトではSparkプラン（無料）でFirebase Storageが利用不可となった。

**決定**
Cloudinaryの無料枠を採用する。

**理由**
- 無料枠のみで完結させるという要件を満たせる
- 無料枠で25GB/月のストレージと帯域が利用可能
- アップロードAPIが充実しており実装が容易
- Next.jsとの統合実績が多い

**影響範囲**
- src/infrastructure/storage/ を新設
- 環境変数に CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET を追加
- .env.local.example を更新
- Firebase Storage関連の実装は不要

---

## 11. 参考資料

### 11.1 技術ドキュメント
- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vitest](https://vitest.dev/)

### 11.2 設計パターン
- Domain-Driven Design (Eric Evans)
- Clean Architecture (Robert C. Martin)

---

## 改訂履歴

| バージョン | 日付 | 変更内容 | 作成者 |
|----------|------|---------|--------|
| 1.0 | 2026-03-15 | 初版作成 | - |
| 1.1 | 2026-03-15 | ADR-001追加（DDD採用） | - |
| 1.2 | 2026-03-15 | ADR-002追加（Cloudinary採用） | - |
