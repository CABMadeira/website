'use client'

import React, { useState } from 'react'

import type { Theme } from './types'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'
import { MoonIcon, SunIcon } from 'lucide-react'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState('')

  const toggleTheme = () => {
    let newTheme: Theme | null = value === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    setValue(newTheme ?? 'auto')
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'auto')
  }, [])

  return (
    <div>

      <button
        type="button"
        aria-label="Toggle theme"
        onClick={toggleTheme}
        className="ml-4 flex items-center"
      >
        {value === 'dark' ? (
          <SunIcon className="w-5 text-primary" />
        ) : (
          <MoonIcon className="w-5 text-primary" />
        )}
      </button>

    </div>
  )
}
