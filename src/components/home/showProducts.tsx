import { useEffect, useState } from 'react';
import '../../styles/style.css'
import { ShowProductData, ShowProductInterface } from '../../utils/dto/showProduct.dto';
import { formatCurrency } from '../../utils/formatCurrency';

export const ShowProduct = () => {
    const [products, setProducts] = useState<ShowProductData[]>([])

    useEffect(() => {
        const fecthData = async () => {
            try {
                console.log(process.env.SERVER_BASE_URI)
                const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URI}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                if(!res.ok){
                    throw new Error('Failed to fetch data');
                }
                const data: ShowProductInterface = await res.json()
                return setProducts(data.result.data)
            } catch (error) {
                console.error('Error while fetching data: ', error)
            }
        }
        fecthData();
    }, [])

    return (
        <div className="section">
            <div className="container">
            <h3>REKOMENDASI SEWA</h3>
            <div className="box">
                {products && products.map((product) => (
                    <div className="col-4" key={product.id}>
                        <img src={`https://i.ibb.co/${product.img_path}`} style={{ width:"50%" }} alt={product.name} />
                        <p className="lokasi">{product.location}</p>
                        <p className="nama">{product.name}</p>
                        <p className="harga">{formatCurrency(product.rent_cost)}</p>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
}