export default function Home() {
  // TODO: カテゴリーリストの実装（次のステップ）
  const categories: any[] = []

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        カテゴリー別商品一覧
      </h1>

      {categories.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 mb-4">
            カテゴリーがまだ登録されていません
          </p>
          <p className="text-sm text-gray-500">
            カテゴリーを追加してください
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* カテゴリーカードをここに表示 */}
        </div>
      )}
    </div>
  )
}
