# 価格比較Webアプリケーション

スーパーごとの商品価格を記録・比較し、賢い買い物をサポートするWebアプリケーション

## プロジェクト概要

このアプリケーションは、複数のスーパーマーケットで販売されている商品の価格を記録・比較できるWebアプリです。ドメイン駆動設計（DDD）とテスト駆動開発（TDD）を採用し、保守性と拡張性の高いコードベースを目指しています。

## 技術スタック

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Backend/DB**: Firebase (Firestore + Authentication)
- **Hosting**: Vercel (Frontend) + Firebase (Backend)
- **Styling**: Tailwind CSS
- **Testing**: Vitest + React Testing Library

## 主な機能

- ✅ Googleアカウント認証
- ✅ レスポンシブデザイン（モバイル/タブレット/デスクトップ対応）
- ✅ 2階層カテゴリー管理（例：調味料 > 醤油）
- ✅ カテゴリーのCRUD操作
- ✅ スーパー（店舗）のCRUD操作
- ✅ 商品のCRUD操作（写真・商品名・メモ）
- ✅ 商品ごとの店舗別価格管理
- ✅ カテゴリー別商品一覧表示

## セットアップ手順

### 1. 必要なツール

- Node.js 18.x以上
- npm または yarn
- Firebase プロジェクト

### 2. リポジトリのクローン

```bash
git clone https://github.com/ysround/price-tracker.git
cd price-tracker
```

### 3. 依存パッケージのインストール

```bash
npm install
```

### 4. 環境変数の設定

`.env.local.example` を `.env.local` にコピーし、Firebase設定を入力します。

```bash
cp .env.local.example .env.local
```

`.env.local` を編集し、Firebaseコンソールから取得した認証情報を設定してください。

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## スクリプト

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm start

# ESLint実行
npm run lint

# テスト実行
npm test

# テストUI起動
npm run test:ui

# カバレッジレポート生成
npm run test:coverage
```

## ディレクトリ構成

```
price-tracker/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # ルートレイアウト
│   │   ├── page.tsx             # ホーム画面
│   │   └── globals.css          # グローバルスタイル
│   ├── components/              # UIコンポーネント
│   │   ├── auth/                # 認証関連
│   │   ├── category/            # カテゴリー関連
│   │   ├── store/               # 店舗関連
│   │   ├── product/             # 商品関連
│   │   ├── price/               # 価格関連
│   │   ├── common/              # 共通コンポーネント
│   │   └── layout/              # レイアウトコンポーネント
│   ├── domain/                  # ドメイン層（DDD）
│   │   ├── models/              # エンティティ
│   │   ├── valueObjects/        # 値オブジェクト
│   │   └── repositories/        # リポジトリインターフェース
│   ├── infrastructure/          # インフラ層
│   │   ├── firebase/            # Firebase設定
│   │   └── repositories/        # リポジトリ実装
│   ├── application/             # アプリケーション層
│   │   ├── usecases/            # ユースケース
│   │   └── services/            # アプリケーションサービス
│   ├── hooks/                   # カスタムReact Hooks
│   ├── lib/                     # ユーティリティ関数
│   └── types/                   # 型定義
├── tests/                       # テストコード
│   ├── unit/                    # ユニットテスト
│   ├── integration/             # 統合テスト
│   └── e2e/                     # E2Eテスト
├── public/                      # 静的ファイル
├── .env.local.example           # 環境変数テンプレート
├── SPEC.md                      # 仕様書
└── README.md                    # このファイル
```

## 開発方針

### ドメイン駆動設計（DDD）

- **ドメイン層**: ビジネスロジックの中心
- **アプリケーション層**: ユースケースの実装
- **インフラ層**: 外部サービスとの接続（Firebase等）
- **プレゼンテーション層**: UIコンポーネント（Next.js）

### テスト駆動開発（TDD）

1. テストを先に書く
2. 実装する
3. リファクタリング

目標カバレッジ: 70%以上

## Git運用

### ブランチ戦略（GitHub Flow）

- `main`: 本番環境（常にデプロイ可能）
- `feature/xxx`: 機能開発
- `fix/xxx`: バグ修正
- `refactor/xxx`: リファクタリング

### コミットメッセージ規約（Conventional Commits）

```
<type>(<scope>): <subject>

例:
feat(category): カテゴリー作成機能を追加
fix(price): 価格バリデーションを修正
docs(readme): セットアップ手順を更新
```

**Type一覧:**
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント
- `style`: コードフォーマット
- `refactor`: リファクタリング
- `test`: テスト
- `chore`: ビルド・設定

## 開発フェーズ

- [x] **Phase 1**: 環境構築・認証
- [ ] **Phase 2**: 店舗・カテゴリー管理
- [ ] **Phase 3**: 商品管理
- [ ] **Phase 4**: 価格管理
- [ ] **Phase 5**: 改善・最適化

## ライセンス

ISC

## 参考資料

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vitest](https://vitest.dev/)
- [仕様書（SPEC.md）](./SPEC.md)
