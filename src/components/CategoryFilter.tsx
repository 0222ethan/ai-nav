'use client'

import { useState } from 'react'

interface CategoryFilterProps {
  categories: string[]
  onFilter?: (category: string) => void
}

export default function CategoryFilter({ categories, onFilter }: CategoryFilterProps) {
  const [selected, setSelected] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelected(value)
    onFilter?.(value)
  }

  return (
    <select
      value={selected}
      onChange={handleChange}
      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    >
      <option value="">全部分类</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  )
}
