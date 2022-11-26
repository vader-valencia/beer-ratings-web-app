export default interface Category{
    name: string
    submittedBy: string
}

export interface CategoryResponse{
    items: Category[]
}