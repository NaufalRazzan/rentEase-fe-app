export interface ShowProductData {
    product_id: string
    vehicleName: string
    location: string
    rent_cost: number
    category: string
    img_path: string
    transmission: string
    seats_num: number
    power: number
}

export interface ShowProductDetailData{
    detail_product_id: string,
    milage: number,
    color: string,
    release_year: string,
    body_type: string,
    fuel_type: string,
    description: string,
    product_id: ShowProductData
}

export interface ShowProductDetailInterface{
    res: ShowProductDetailData,
    message: string
}
export interface ShowProductFilterInterface {
    result: {
        data: {
            count: number,
            data: ShowProductData[]
        },
        pagination: {
            totalCount: number,
            totalPages: number,
            currentPage: number
        }
    },
    message: string
}

export interface ShowProductHomeInterface {
    result: {
        data: ShowProductData[],
    }
}