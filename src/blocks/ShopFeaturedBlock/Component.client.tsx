'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


type Product = {
    title: string
    price: string
    image: string
    url: string
}

type Props = {
    products: Product[]
    isCompactView?: boolean
}

export const ShopFeatured: React.FC<Props> = ({ products, isCompactView }) => {
    return (
        <div className="flex flex-col items-center gap-6">
            {/* Reusable title */}
            <h2 className="text-2xl font-bold text-center text-[hsl(var(--primary))]">Featured Products</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <a
                        key={index}
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border rounded-lg p-4 hover:shadow-lg transition flex flex-col h-full"
                        style={{ backgroundColor: 'hsl(var(--secondary))' }}
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-48 object-contain mb-3"
                        />

                        <h3 className="text-sm font-medium mb-2">
                            {product.title}
                        </h3>

                        <p className="text-lg font-semibold mt-auto">
                            {product.price} €
                        </p>
                    </a>
                ))}
            </div>
            {isCompactView && (
                <div className="mt-6 text-center">
                    <Button asChild variant="default">
                        <Link href="/shop">View Full Shop</Link>
                    </Button>
                </div>
            )}
        </div>
    )
}