import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { SideBarCarsProductsDto } from "../utils/dto/sidebar-product.dto";

type SideBarCarsContextType = {
    productsData: SideBarCarsProductsDto
    setProductsData: Dispatch<SetStateAction<SideBarCarsProductsDto>>
}

interface SidebarCarsProviderProps {
    children: ReactNode
}

const SideBarCarsContext = createContext<SideBarCarsContextType | undefined>(undefined)

export const useSideBarCarsContext = (): SideBarCarsContextType  => {
    const context = useContext(SideBarCarsContext)
    if (!context) {
        throw new Error('useSidebarCarsContext must be used within a SidebarCarsProvider');
    }
    return context;
}

export const SideBarCarsProvider: FC<SidebarCarsProviderProps> = ({children}) => {
    const [productsData, setProductsData] = useState<SideBarCarsProductsDto>({
        vehicleName: '',
        vehicleType: '',
        sort: 'none',
        brandName: [],
        transmission: [],
        seatsNum: [],
        minPrice: 0,
        maxPrice: 0,
        minPower: 0,
        maxPower: 0,
        location: [],
    });

    return (
        <SideBarCarsContext.Provider value={{ productsData, setProductsData }}>
            {children}
        </SideBarCarsContext.Provider>
    )
}