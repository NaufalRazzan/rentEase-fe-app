import { useParams } from 'react-router-dom'
import '../../styles/bookingStyles.css'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import { ShowProductDetailData, ShowProductDetailInterface } from '../../utils/dto/showProduct.dto'
import { formatCurrency } from '../../utils/formatCurrency'
import DatePicker, { registerLocale } from 'react-datepicker'
import { id } from 'date-fns/locale/id'
import { format } from 'date-fns'
import "react-datepicker/dist/react-datepicker.css";
import { usePaymentContext } from '../../contexts/payment.context'
import Popup from 'reactjs-popup'
import '../../styles/popup.css'

registerLocale('id', id)

const formatDate = (date: Date | null) => {
    return format(date || new Date(), 'EEEE, dd MMM yyyy HH:mm', { locale: id })
}

const getDaysDiff = (date1: Date, date2: Date) => {
    return Math.round((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24))
}

export const BookingTransactions = () => {
    const { userId } = useParams<string>()
    const { product_id } = useParams<string>()
    const [cookies] = useCookies(['acc_token'])
    const [pickUpDate, setPickUpDate] = useState<Date | null>(null)
    const [dropOffDate, setDropOffDate] = useState<Date | null>(null)
    const { paymentData, setPaymentData } = usePaymentContext() 
    const [showpopup, setShowPopup] = useState(false)

    const handleContinue = () => {
        if(!pickUpDate || !dropOffDate) {
            setShowPopup(true)
            console.log('kebuka')
            return
        }

        window.location.href = `/transaction/payment/${userId}/${product_id}`
    }

    const [productFull, setProductFull] = useState<ShowProductDetailData>({
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
        detail_product_id: '',
        milage: 0,
        color: '',
        release_year: '',
        body_type: '',
        fuel_type: '',
        description: '',
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

                return setProductFull(data.res)
            } catch (error) {
                console.error('Error while fetching data: ', error)
            }
        }
        FetchProductFull()
    }, [])

    useEffect(() => {
        const daysDiff = (pickUpDate && dropOffDate) && getDaysDiff(pickUpDate, dropOffDate)
        setPaymentData({
            total_payment: daysDiff && productFull.product_id.rent_cost * daysDiff,
            pickUpDate: pickUpDate,
            dropOffDate: dropOffDate
        })
    }, [])

    return (
        <div className="container-booking">
            <div className="header-booking">
                <a href="#" className='back-link'>← Back To Menu</a>
                <h1>Booking Page</h1>
                <p>One more step to rent a car!</p>
                <p className="note">You-ll need to pick up your vehicle on schedule!</p>
            </div>
            <div className="notice">
                <p>✅ Free cancellation up to 24 hours</p>
            </div>
            <div className="car-details">
                <img src={'https://i.ibb.co/' + productFull.product_id.img_path} className='gambar-bmw'/>
                <div className="details">
                    <div className="tags">
                        <span className="tag">Top Pick</span>
                        <span className="tag">Business Purpose</span>
                    </div>
                    <h2>{productFull.product_id.vehicleName}</h2>
                    <div className="features">
                        <p>🚗 {productFull.product_id.seats_num} Seats</p>
                        <p>⚙️ {productFull.product_id.transmission}</p>
                        <p>🧳 2 Large Bags</p>
                        <p>⛽ Low KM</p>
                        <p>📺 Digital TV</p>
                        <p>🗺️ Navigation Assistance</p>
                    </div>
                    <DatePicker 
                        selected={pickUpDate} 
                        onChange={(date: Date | null) => setPickUpDate(date)}
                        showMonthDropdown
                        showYearDropdown
                        showTimeInput
                        placeholderText='Pick your pick-up date'
                        dateFormat={'dd/MM/yyyy : HH:mm'}
                        locale="id" 
                        required
                    />
                    <DatePicker 
                        selected={dropOffDate} 
                        onChange={(date: Date | null) => setDropOffDate(date)}
                        showMonthDropdown
                        showYearDropdown
                        showTimeInput
                        placeholderText='Pick your drop-off date'
                        dateFormat={'dd/MM/yyyy : HH:mm'}
                        locale="id" 
                        required
                    />
                </div>
            </div>
            <div className="reviews-pickup">
                <div className="box-booking">
                    <h2>👥 Customer Review</h2>
                    <ul>
                        <li><input type='checkbox' defaultChecked />Customer Rating 7.5/10</li>
                        <li><input type='checkbox' defaultChecked />Clean Cars</li>
                        <li><input type='checkbox' defaultChecked />Well-maintaned cars</li>
                        <li><input type='checkbox' defaultChecked />Save petrol</li>
                        <li><input type='checkbox' defaultChecked />Free-cancellation</li>
                    </ul>
                </div>
                <div className="box-booking">
                    {(pickUpDate && dropOffDate) && 
                        <>
                            <h2>Pick-up and drop-off</h2>
                            <div className="pickup">
                                <p>🗓️ {formatDate(pickUpDate)}</p>
                                <p>
                                    <strong>RentEase Rental Car & Motorcycle</strong>
                                    <br></br>Address:
                                    <br></br>Jl. Raya no. 27, RT.1/RW.3,
                                    <br></br>Kamangjaya, Kec. Palmerah, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11530
                                </p>
                            </div>
                            <div className="pickup">
                                <p>🗓️ {formatDate(dropOffDate)}</p>
                                <p>
                                    <strong>RentEase Rental Car & Motorcycle</strong>
                                    <br></br>Address:
                                    <br></br>Jl. Raya no. 27, RT.1/RW.3,
                                    <br></br>Kamangjaya, Kec. Palmerah, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11530
                                </p>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className="payment-section">
                <div className="payment-overview">
                    <h2>Total Payment Overview</h2>
                    <div className="payment-item">
                        {(pickUpDate && dropOffDate) ? 
                            getDaysDiff(pickUpDate, dropOffDate) > 1 
                            ? (
                                <>
                                    <span>Rent Car Price {getDaysDiff(pickUpDate, dropOffDate)} days:</span>
                                    <span>{formatCurrency(productFull.product_id.rent_cost * getDaysDiff(pickUpDate, dropOffDate))}</span>
                                </>
                            ) : (
                                <>
                                    <span>Rent Car Price 1 day:</span>
                                    <span>{formatCurrency(productFull.product_id.rent_cost)}</span>
                                </>
                            ) :(
                                <></>
                            )
                        }
                    </div>
                </div>
                <div className="payment-summary">
                    <div className="notice">
                        <p>✅ Price already included assurance guranteed!</p>
                    </div>
                    <div className="continue-payment">
                        <Popup 
                            open={showpopup} 
                            closeOnDocumentClick 
                            onClose={() => setShowPopup(false)}
                        >
                            <div className="popup">
                                <p>Please select both pick-up and drop-off dates</p>
                            </div>
                        </Popup>
                        <button onClick={handleContinue}>Continue to Payment</button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}