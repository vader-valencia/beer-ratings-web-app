export default interface DrinkItem {
    id: number
    name: string
    submittedBy: string
    description: string
    image?: string
    rating?: number
    numRatings?: number
}

export interface NewDrinkItem {
    categoryId: number
    name: string
    description: string
    submittedBy: string
    image: string | null
}

export interface DrinkItems {
    items: DrinkItem[]
}

export interface SkinnyItem {
    id: number
    name: string
}

export interface SkinnyItems {
    skinnyItems: SkinnyItem[]
}