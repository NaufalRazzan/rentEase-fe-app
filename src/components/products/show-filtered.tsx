import { useEffect, useState } from "react"
import { formatCurrency } from "../../utils/formatCurrency"
import { useSideBarCarsContext } from "../../contexts/sideBar-product.context"
import { SideBarCarsProductsDto } from "../../utils/dto/sidebar-product.dto"
import { ShowProductData, ShowProductFilterInterface } from "../../utils/dto/showProduct.dto"
import { Link } from "react-router-dom"

export const ShowFilterProducts = () => {
    const [products, setProducts] = useState<ShowProductData[]>([])
    const { productsData } = useSideBarCarsContext()

    const urlConstruct = (data: SideBarCarsProductsDto) => {
        let url = `products/filterProduct/1`;

        url += (data.vehicleType) ? `/${data.vehicleType}?` : `?`;
        if(data.vehicleName) url += `vehicle_name=${data.vehicleName}&`;
        if(data.brandName && data.brandName.length > 0) url += `brandName=${data.brandName.join(',')}&`;
        if(data.transmission && data.transmission.length > 0) url += `transmission=${data.transmission.join(',')}&`;
        if(data.seatsNum && data.seatsNum.length > 0) url += `seatsNum=${data.seatsNum.join(',')}&`;
        if(data.minPrice) url += `minPrice=${data.minPrice.toString()}&`;
        if(data.maxPrice) url += `maxPrice=${data.maxPrice.toString()}&`;
        if(data.minPower) url += `minPower=${data.minPower.toString()}&`;
        if(data.maxPower) url += `maxPower=${data.maxPower.toString()}&`;
        if(data.location && data.location.length > 0) url += `location=${data.location.join(',')}&`;
        if(data.sort) url += `sort=${data.sort}`;

        return url
    }

    useEffect(() => {
        const fecthData = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URI}${urlConstruct(productsData)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                if(!res.ok){
                    throw new Error('Failed to fetch data');
                }
                const data: ShowProductFilterInterface = await res.json()
                return setProducts(data.result.data.data)
            } catch (error) {
                console.error('Error while fetching data: ', error)
            }
        }
        fecthData();
    }, [productsData])

    return (
        <div className="section2">
            <div className="container2">
                <div className="box2">
                    {!products ? (
                        <p>Loading...</p>
                    ) : products.length === 0 ? (
                        <p style={{
                            textAlign:'center',
                            fontSize: 20,
                            opacity: 50
                        }}>Tidak ada hasil</p>
                    ) : (
                        products.map((product) => (
                            <div className="col-4" key={product.product_id}>
                                <Link to={`/produk/${product.product_id}`}>
                                    <img src={`https://i.ibb.co/${product.img_path}`} style={{ width:"50%" }} alt={product.vehicleName} />
                                    <p className="lokasi">{product.location}</p>
                                    <p className="nama">{product.vehicleName}</p>
                                    <p className="harga">{formatCurrency(product.rent_cost)}</p>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}