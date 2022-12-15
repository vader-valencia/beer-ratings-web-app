export default interface Category{
    id?: number
    name: string
    submittedBy: string
}

export interface CategoryResponse{
    items: Category[]
}

export interface CategoryIdResponse{
    id: number
}