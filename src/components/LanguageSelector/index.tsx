'use client'

import React, { useState, useEffect } from 'react'
import { Globe } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const LANGUAGE_STORAGE_KEY = 'site-language'

const languages = [
    { code: 'pt', label: 'Português', flag: '🇵🇹' },
    { code: 'en', label: 'English', flag: '🇺🇸' }
]

export const LanguageSelector: React.FC = () => {
    const [language, setLanguage] = useState<string>('pt')

    useEffect(() => {
        const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
        if (saved) {
            setLanguage(saved)
        }
    }, [])

    const handleLanguageChange = (newLang: string) => {
        setLanguage(newLang)
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang)
        // You can add additional logic here to change the actual language
        // For example: i18n.changeLanguage(newLang)
    }

    return (
        <div className="flex justify-center">
            <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[180px] h-10 border bg-background hover:bg-blue-100 dark:hover:bg-blue-900/30 outline outline-0 hover:outline-2 outline-black dark:outline-white transition-colors">
                    <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        <SelectValue />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                            <div className="flex items-center gap-2">
                                <span>{lang.flag}</span>
                                <span>{lang.label}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
