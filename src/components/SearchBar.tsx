'use client'

import { useState } from 'react'
import { AITool } from '@/types'

interface SearchBarProps {
  onSearch?: (search: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onSearch?.(e.target.value)
  }

  return (
    <input
      type="text"
      placeholder="搜索 AI 工具..."
      value={value}
      onChange={handleChange}
      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  )
}
