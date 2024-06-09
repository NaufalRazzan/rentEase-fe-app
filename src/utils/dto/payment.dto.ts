export type PaymentData = {
    total_payment: number | null
    pickUpDate: Date | null
    dropOffDate: Date | null
}

export type DriverInfo = {
    first_name: string,
    last_name: string,
    contact_num: string,
    country: string,
    city: string
    postCode: string,
    isBusinessBooking: 'yes' | 'no'
}

export type CardInfo = {
    holder_name: string,
    card_num: string,
    expr_date: string
}

export type PaymentPayload = {
    total_payment: number | null
    pickUpDate: Date | null
    dropOffDate: Date | null
    card_info: CardInfo
    driver_info: {
        full_name: string
        contact_num: string,
        country: string,
        city: string
        postCode: string,
    }
}