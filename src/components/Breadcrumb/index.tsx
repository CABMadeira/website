'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export const DynamicBreadcrumb: React.FC = () => {
    const pathname = usePathname()

    // Don't show breadcrumb on home page or admin pages
    if (pathname === '/' || pathname.startsWith('/admin')) {
        return null
    }

    // Split the pathname and filter out empty strings
    const segments = pathname.split('/').filter(Boolean)

    // Generate breadcrumb items
    const breadcrumbItems = segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/')
        // Capitalize and replace hyphens with spaces for display
        const label = segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')

        return {
            href,
            label,
            isLast: index === segments.length - 1,
        }
    })

    return (
        <div className="container py-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    {breadcrumbItems.map((item, index) => (
                        <React.Fragment key={item.href}>
                            <BreadcrumbItem>
                                {item.isLast ? (
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={item.href}>{item.label}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!item.isLast && <BreadcrumbSeparator />}
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}
