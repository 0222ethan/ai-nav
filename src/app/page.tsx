import { getToolsData, getCategories } from '@/lib/tools'
import ToolsGrid from '@/components/ToolsGrid'

export default async function Home() {
  const data = await getToolsData()
  const tools = data.tools || []
  const categories = getCategories(tools)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">AI 工具导航</h1>
          <p className="mt-2 text-gray-600">
            发现最新 AI 工具，每日更新 · {data.lastUpdated && `最后更新: ${data.lastUpdated}`}
          </p>
        </div>
      </header>

      {/* Tools Grid with Search & Filter */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <ToolsGrid initialTools={tools} categories={categories} />
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-500">
          <p>AI 工具导航 · 每日更新</p>
        </div>
      </footer>
    </main>
  )
}
