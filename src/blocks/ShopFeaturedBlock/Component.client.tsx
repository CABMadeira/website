'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LayoutGrid, List } from 'lucide-react'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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
    const [sortBy, setSortBy] = React.useState<string>("name-asc")
    const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")

    const sortedProducts = React.useMemo(() => {
        const parsed = [...products]

        const getNumericPrice = (price: string) =>
            parseFloat(price.replace(",", "."))

        switch (sortBy) {
            case "name-desc":
                return parsed.sort((a, b) => b.title.localeCompare(a.title))
            case "price-asc":
                return parsed.sort(
                    (a, b) => getNumericPrice(a.price) - getNumericPrice(b.price)
                )
            case "price-desc":
                return parsed.sort(
                    (a, b) => getNumericPrice(b.price) - getNumericPrice(a.price)
                )
            case "name-asc":
            default:
                return parsed.sort((a, b) => a.title.localeCompare(b.title))
        }
    }, [products, sortBy])

    return (
        <div className="flex flex-col items-center gap-6 w-full">
            <h2 className="text-2xl font-bold text-center text-[hsl(var(--primary))]">
                Featured Products
            </h2>

            {isCompactView ? (
                <Carousel>
                    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">

                        {/* Previous Button */}
                        <CarouselPrevious variant='default' />

                        {/* Carousel Content */}
                        <CarouselContent>
                            {products.map((product, index) => (
                                <CarouselItem
                                    key={index}
                                    className="pl-4 basis-full md:basis-1/3"
                                >
                                    <a
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
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Next Button */}
                        <CarouselNext variant='default' />
                    </div>
                </Carousel>
            ) : (
                <div className="w-full max-w-6xl flex flex-col gap-6">

                    {/* Toolbar */}
                    <div className="flex items-center justify-between border rounded-lg p-4 bg-[hsl(var(--primary))]">

                        {/* View Toggle */}
                        <div className="flex items-center gap-2">
                            <Button
                                variant={viewMode === "grid" ? "default" : "outline"}
                                size="icon"
                                onClick={() => setViewMode("grid")}
                            >
                                <LayoutGrid className="h-4 w-4" />
                            </Button>

                            <Button
                                variant={viewMode === "list" ? "default" : "outline"}
                                size="icon"
                                onClick={() => setViewMode("list")}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Sorting */}
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-[220px]">
                                <SelectValue placeholder="Order products" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="name-asc">Name (A–Z)</SelectItem>
                                <SelectItem value="name-desc">Name (Z–A)</SelectItem>
                                <SelectItem value="price-asc">Price (Low → High)</SelectItem>
                                <SelectItem value="price-desc">Price (High → Low)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Products */}
                    {viewMode === "grid" ? (
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {sortedProducts.map((product, index) => (
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
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            {sortedProducts.map((product, index) => (
                                <a
                                    key={index}
                                    href={product.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border rounded-lg p-4 hover:shadow-lg transition flex items-center gap-6 w-full max-w-3xl"
                                    style={{ backgroundColor: 'hsl(var(--secondary))' }}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-32 h-32 object-contain"
                                    />

                                    <div className="flex flex-1 items-center justify-between">
                                        <h3 className="text-base font-medium">
                                            {product.title}
                                        </h3>

                                        <p className="text-lg font-semibold whitespace-nowrap">
                                            {product.price} €
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            )}

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