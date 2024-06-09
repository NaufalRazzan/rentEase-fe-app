import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useState } from "react"
import { PaymentData } from "../utils/dto/payment.dto"

type PaymentContextType = {
    paymentData: PaymentData
    setPaymentData: Dispatch<SetStateAction<PaymentData>>
}

interface PaymentProviderProps {
    children: ReactNode
}

const paymentContext = createContext<PaymentContextType | undefined>(undefined)

export const usePaymentContext = (): PaymentContextType => {
    const context = useContext(paymentContext)
    if(!context){
        throw new Error('usePaymentContext must be used within a PaymentProvider')
    }

    return context
}

export const PaymentProvider: FC<PaymentProviderProps> = ({children}) => {
    const [paymentData, setPaymentData] = useState<PaymentData>({
        total_payment: 0,
        pickUpDate: new Date(),
        dropOffDate: new Date()
    })

    return (
        <paymentContext.Provider value={{ paymentData, setPaymentData }}>
            {children}
        </paymentContext.Provider>
    )
}