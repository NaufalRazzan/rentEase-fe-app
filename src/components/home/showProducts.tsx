import { useEffect, useState } from 'react';
import '../../styles/style.css'
import { ShowProductData, ShowProductHomeInterface } from '../../utils/dto/showProduct.dto';
import { formatCurrency } from '../../utils/formatCurrency';
import { Link } from 'react-router-dom';

export const ShowProduct = () => {
    const [products, setProducts] = useState<ShowProductData[]>([])

    useEffect(() => {
        const fecthData = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URI}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                if(!res.ok){
                    throw new Error('Failed to fetch data');
                }
                const data: ShowProductHomeInterface = await res.json()
                return setProducts(data.result.data)
            } catch (error) {
                console.error('Error while fetching data: ', error)
            }
        }
        fecthData();
    }, [])
    console.log(products)
    return (
        <div className="section">
            <div className="container">
            <h3>REKOMENDASI SEWA</h3>
            <div className="box">
                {products === null ? (
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
    );
}