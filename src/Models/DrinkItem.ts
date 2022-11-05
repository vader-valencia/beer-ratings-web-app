export default interface DrinkItem{
    id: number
    name: string
    submittedBy: string
}

export interface NewDrinkItem{
    name: string
    submittedBy: string
    image: string | null
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