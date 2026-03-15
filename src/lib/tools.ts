import { ToolsData } from '@/types'
import fs from 'fs'
import path from 'path'

// 数据源路径
const DATA_PATH = path.join(process.cwd(), 'public', 'data', 'tools.json')

export async function getToolsData(): Promise<ToolsData> {
  // Vercel 部署时使用外部 URL
  if (process.env.VERCEL || process.env.NEXT_PUBLIC_DATA_URL) {
    const dataUrl = process.env.NEXT_PUBLIC_DATA_URL || 'https://your-domain.com/data/tools.json'
    try {
      const res = await fetch(dataUrl, {
        cache: 'no-store',
      })
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      return await res.json()
    } catch (error) {
      console.error('Error fetching tools data:', error)
      return { tools: [], lastUpdated: '' }
    }
  }

  // 本地开发时读取文件
  try {
    const fileContent = fs.readFileSync(DATA_PATH, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error('Error reading tools data:', error)
    return { tools: [], lastUpdated: '' }
  }
}

export function filterTools(
  tools: import('@/types').AITool[],
  search: string,
  category: string
) {
  return tools.filter((tool) => {
    const matchSearch =
      search === '' ||
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase()) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))

    const matchCategory = category === '' || tool.category === category

    return matchSearch && matchCategory
  })
}

export function getCategories(tools: import('@/types').AITool[]): string[] {
  const categories = new Set(tools.map((tool) => tool.category))
  return Array.from(categories).sort()
}
