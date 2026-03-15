'use client'

import { useState, useEffect } from 'react'
import { AITool } from '@/types'

interface ToolsGridProps {
  initialTools: AITool[]
  categories: string[]
}

export default function ToolsGrid({ initialTools, categories }: ToolsGridProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [filteredTools, setFilteredTools] = useState<AITool[]>(initialTools)

  useEffect(() => {
    const filtered = initialTools.filter((tool) => {
      const matchSearch =
        search === '' ||
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))

      const matchCategory = category === '' || tool.category === category

      return matchSearch && matchCategory
    })
    setFilteredTools(filtered)
  }, [search, category, initialTools])

  return (
    <>
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="搜索 AI 工具..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">全部分类</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        共 {filteredTools.length} 个工具
      </p>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>未找到匹配的 AI 工具</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <a
              key={tool.id}
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-start gap-4">
                {tool.icon ? (
                  <img
                    src={tool.icon}
                    alt={tool.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {tool.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{tool.name}</h3>
                  <span className="inline-block text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded mt-1">
                    {tool.category}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-gray-600 text-sm line-clamp-2">{tool.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-xs text-gray-400">更新: {tool.updatedAt}</div>
            </a>
          ))}
        </div>
      )}
    </>
  )
}
