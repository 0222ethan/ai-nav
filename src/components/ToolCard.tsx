import { AITool } from '@/types'

interface ToolCardProps {
  tools: AITool[]
}

export default function ToolCard({ tools }: ToolCardProps) {
  if (tools.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>暂无 AI 工具</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
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
          <div className="mt-4 text-xs text-gray-400">
            更新: {tool.updatedAt}
          </div>
        </a>
      ))}
    </div>
  )
}
