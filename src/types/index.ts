export interface AITool {
  id: string
  name: string
  description: string
  category: string
  website: string
  icon: string
  tags: string[]
  updatedAt: string
}

export interface ToolsData {
  tools: AITool[]
  lastUpdated: string
}
