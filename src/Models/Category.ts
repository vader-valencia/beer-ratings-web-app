export default interface Category{
    id?: number
    name: string
    submittedBy: string
}

export interface CategoryResponse{
    items: Category[]
}