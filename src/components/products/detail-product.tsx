import { Link, useParams } from "react-router-dom"
import '../../styles/style.css'
import SimpleImageSlider from "react-simple-image-slider"
import { ShowProductDetailData, ShowProductDetailInterface } from "../../utils/dto/showProduct.dto"
import { useEffect, useState } from "react"

export const DetailProduct = () => {
    const { product_id } = useParams<string>()
    const [productFull, setProductFull] = useState<ShowProductDetailData>({
        detail_product_id: '',
        milage: 0,
        color: '',
        release_year: '',
        body_type: '',
        fuel_type: '',
        description: '',
        product_id: {
            product_id: '',
            vehicleName: '',
            location: '',
            rent_cost: 0,
            category: '',
            img_path: '',
            transmission: '',
            seats_num: 0,
            power: 0
        },
    })

    useEffect(() => {
        const FetchProductFull = async () => {
            try {
                const res = await fetch(`${`${process.env.REACT_APP_SERVER_BASE_URI}`}products/fetchDetailsProduct/${product_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                if(!res.ok){
                    throw new Error('Failed to fetch data')
                }
                
                const data: ShowProductDetailInterface = await res.json()
                console.log('data from fetch: ', data)

                return setProductFull(data.res)
            } catch (error) {
                console.error('Error while fetching data: ', error)
            }
        }
        FetchProductFull()
    }, [])

    const images = [
        'https://i.ibb.co/' + productFull.product_id.img_path,
        '/assets/bmw.png',
        '/assets/bmw2.png',
        '/assets/bmw3.png'
    ]

    console.log(productFull)

    return (
        <div className="section">
            <div className="container">
                <section className="slider">
                    <div className="slider_one">
                        <div className="kol-1">
                            {
                                new Date().getFullYear() === parseInt(productFull.release_year) 
                                && <h6>brand new</h6>
                            }
                            <h5>{productFull.product_id.vehicleName}</h5>
                            <div className="rapper">
                                <SimpleImageSlider 
                                    width={900}
                                    height={500}
                                    images={images}
                                    showNavs={true}
                                    showBullets={true}
                                    
                                />
                            </div> 
                        </div>
                        <div className="kol-1">
                            <h5>Key Information</h5>
                            <div className="key-row">
                                <div className="key">
                                    <i className="bx bx-car"></i>
                                    <div className="name">
                                        <span>body type</span>
                                        <p>{productFull.body_type || <p>Lorem, ipsum dolor.</p>}</p>
                                    </div>
                                </div>
                                <div className="key">
                                    <i className="bx bx-car"></i>
                                    <div className="name">
                                        <span>Condition</span>
                                        {
                                            new Date().getFullYear() === parseInt(productFull.release_year) 
                                            ? <p>Brand New</p> 
                                            : <p>{new Date().getFullYear() - parseInt(productFull.release_year)} years</p>
                                        }
                                    </div>
                                </div>
                                <div className="key">
                                    <i className="bx bx-stopwatch"></i>
                                    <div className="name">
                                        <span>Mileage</span>
                                        <p>{productFull.milage || <p>Lorem, ipsum dolor.</p>} (MI)</p>
                                    </div>
                                </div>
                                <div className="key">
                                    <i className="bx bx-brightness"></i>
                                    <div className="name">
                                        <span>Transmission</span>
                                        <p>{productFull.product_id.transmission || <p>Lorem, ipsum dolor.</p>}</p>
                                    </div>
                                </div>
                                <div className="key">
                                    <i className="bx bx-car"></i>
                                    <div className="name">
                                        <span>Year</span>
                                        <p>{productFull.release_year || <p>Lorem, ipsum dolor.</p>}</p>
                                    </div>
                                </div>
                                <div className="key">
                                    <i className="bx bx-sidebar"></i>
                                    <div className="name">
                                        <span>Fuel Type</span>
                                        <p>{productFull.fuel_type || <p>Lorem, ipsum dolor.</p>}</p>
                                    </div>
                                </div>
                                <div className="key">
                                    <i className="bx bx-car"></i>
                                    <div className="name">
                                        <span>Color</span>
                                        <p>{productFull.color || <p>Lorem, ipsum dolor.</p>}</p>
                                    </div>
                                </div>
                                <div className="key">
                                    <i className="bx bx-car"></i>
                                    <div className="name">
                                        <span>Doors</span>
                                        <p>blom ada</p>
                                    </div>
                                </div>
                                <div className="key">
                                    <i className="bx bx-car"></i>
                                    <div className="name">
                                        <span>Cylinders</span>
                                        <p>blom ada</p>
                                    </div>
                                </div>
                                <div className="key">
                                    <i className="bx bx-car"></i>
                                    <div className="name">
                                        <span>Engine Size</span>
                                        <p>{productFull.product_id.power} (cc) || <p>Lorem, ipsum dolor.</p></p>
                                    </div>
                                </div>
                                <div className="key">
                                    <i className="bx bx-car"></i>
                                    <div className="name">
                                        <span>Power</span>
                                        <p>blom ada (HP)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="kol-1">
                            <h5>Description</h5>
                            <p className="dec">{productFull.description || <p>Lorem, ipsum dolor.</p>}</p>
                            
                            <h5>Car Features</h5>
                            <div className="features">
                                <p className="fe"><i className="bx bx-check-shield"></i>Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>
                    </div>

                    <div className="slider_two">
                        <div className="kol-2">
                            <Link to={`/transaction/booking/${product_id}`}>
                                <h3><button>RENT NOW</button></h3>
                            </Link>
                        </div>
                        <div className="kol-2">
                            <div className="customer">
                                <img src="img/com-1.png" alt="foto cs" />
                                <div className="details">
                                    <h6>Udin Bin Fulan</h6>
                                    <span>Customer Advisor</span>
                                    <i className="bx bx-facebook"></i>
                                    <i className="bx bx-instagram"></i>
                                    <i className="bx bx-twitter"></i>
                                    <i className="bx bx-whatsapp"></i>
                                </div>
                            </div>
                        </div>

                        <div className="kol-2">
                            <h6>Contact Details</h6>
                            <input type="text" placeholder="Enter Name" />
                            <input type="text" placeholder="Enter Email" />
                            <textarea cols={30} rows={6} placeholder="Write Message"></textarea>

                            <button>Send Now <i className="bx bx-right-arrow-alt"></i></button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}