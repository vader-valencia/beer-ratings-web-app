export default interface DrinkItem{
    id: number
    name: string
    submittedBy: string
}

export interface DrinkItems{
    drinkItems: DrinkItem[]
}

export interface SkinnyItem{
    id: number
    name: string
}

export interface SkinnyItems{
    skinnyItems: SkinnyItem[]
}