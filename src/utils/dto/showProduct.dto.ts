export interface ShowProductData {
    id: string
    name: string
    location: string,
    rent_cost: number,
    category: string,
    img_path: string
}

export interface ShowProductInterface {
    result: {
        data: ShowProductData[],
        pagination: {
            totalCount: number,
            totalPages: number,
            currentPage: number
        }
    },
    message: string
}