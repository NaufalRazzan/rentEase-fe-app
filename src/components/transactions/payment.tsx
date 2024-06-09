import { useParams } from "react-router-dom"
import '../../styles/paymentStyles.css'
import { FormEvent, useEffect, useState } from "react"
import { ShowProductDetailData, ShowProductDetailInterface } from "../../utils/dto/showProduct.dto"
import { usePaymentContext } from "../../contexts/payment.context"
import { formatCurrency } from "../../utils/formatCurrency"
import { DriverInfo, PaymentData, PaymentPayload } from "../../utils/dto/payment.dto"

export const PaymentTransaction = () => {
    const { userId } = useParams<string>()
    const { product_id } = useParams<string>()
    const { paymentData } = usePaymentContext()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [contactNum, setContactNum] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [postCode, setpostCOde] = useState('')
    const [isBusinessBooking, setIsBusinessBooking] = useState<'yes' | 'no'>('no')
    const [holderName, setHolderName] = useState('')
    const [cardNum, setcardNum] = useState('')
    const [exprDate, setexprDate] = useState('')

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

    console.log(paymentData)

    if(paymentData.total_payment && isBusinessBooking === 'yes') paymentData.total_payment *= 1.5

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

    const handlePaymentSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    
        const payload: PaymentPayload = {
            card_info: {
                holder_name: holderName,
                card_num: cardNum,
                expr_date: exprDate
            },
            driver_info: {
                full_name: firstName + lastName,
                contact_num: contactNum,
                country: country,
                city: city,
                postCode: postCode
            },
            total_payment: paymentData.total_payment || null,
            pickUpDate: paymentData.pickUpDate || null,
            dropOffDate: paymentData.dropOffDate || null
        }

        try {
            const resp = await fetch(`${`${process.env.REACT_APP_SERVER_BASE_URI}`}transactions/payment/${userId}/${product_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if(!resp.ok){
                throw new Error(`Request failed with status ${resp.status}`)
            }
            alert('payment success')
        } catch (error) {
            console.error('Error submitting form:', error)
        }
    }

    return (
        <div className="container-bayar">
            <div className="header-bayar">
                <a href="#" className="back-menu">Back To Menu</a>
                <div className="checkout-status">
                    <span>Checkout</span>
                    <span> You almost finished</span>
                    <span className="schedule-warning"> You'll need to pick up your vehicle on schedule!</span>
                </div>
            </div>
            <div className="refund-policy">
                <img src="/assets/check.png" width={50} height={50} />
                <div>
                    <span>What if my plans changes?</span>
                    <p>You'll get a full refund if you cancel at least 24 hours before pick-up</p>
                </div>
            </div>
            <div className="car-details">
                <img src={'https://i.ibb.co/' + productFull.product_id.img_path} width={250} height={260} />
                <div className="car-info">
                    <span className="tag top-pick">Top Pick</span>
                    <span className="tag business-purpose">Business Purpose</span>
                    <h1>{productFull.product_id.vehicleName}</h1>
                    <ul className="features">
                        <li>🚗 {productFull.product_id.seats_num} Seats</li>
                        <li>⚙️ {productFull.product_id.transmission}</li>
                        <li>🧳 2 Large Bags</li>
                        <li>⛽ Low KM</li>
                        <li>📺 Digital TV</li>
                        <li>🗺️ Navigation Assistance</li>
                    </ul>
                </div>
            </div>
            <form className="checkout-form" onSubmit={handlePaymentSubmit}>
                <div className="driver-details">
                    <h2>Driver Details ID</h2>
                    <label>First Name</label>
                    <input type="text" name="first-name" required onChange={(event) => setFirstName(event.target.value)} />

                    <label>Last Name</label>
                    <input type="text" name="last-name" required onChange={(event) => setLastName(event.target.value)}/>

                    <label>Contact Number</label>
                    <input type="text" name="contact-number" required onChange={(event) => setContactNum(event.target.value)}/>

                    <label>Country</label>
                    <input type="text" name="country" required onChange={(event) => setCountry(event.target.value)}/>

                    <label>City</label>
                    <input type="text" name="city" required onChange={(event) => setCity(event.target.value)}/>

                    <label>Postcode</label>
                    <input type="text" name="postcode" required onChange={(event) => setpostCOde(event.target.value)}/>

                    <label>Is this a business booking?</label>
                    <div className="business-booking">
                        <div className="radio-group">
                            <input type="radio" name="business-booking" required id="yes" value="yes" onChange={() => setIsBusinessBooking('yes')}/>
                            <label htmlFor="yes">Yes</label>
                        </div>
                        <div className="radio-group">
                            <input type="radio" name="business-booking" required id="no" value="no" onChange={() => setIsBusinessBooking('no')}/>
                            <label htmlFor="no">No</label>
                        </div>
                    </div>
                </div>
                <div className="payment-method">
                    <h2>Payment Method</h2>
                    <label>Cardholder's name</label>
                    <input type="text" name="cardholder-name" required={true} onChange={(event) => setHolderName(event.target.value)} />
                    <label>Card Number</label>
                    <input type="text" name="card-number" required={true} onChange={(event) => setcardNum(event.target.value)} />
                    <label>Expiration Date</label>
                    <input type="text" name="expiration-date" placeholder="MM/YY" required={true} onChange={(event) => setexprDate(event.target.value)} />
                </div>
                {paymentData.total_payment &&
                    <div className="payment-overview">
                        <h2>Total Payment Overview</h2>
                        <p>Rent Car Price: {formatCurrency(paymentData.total_payment)}</p>
                        <p className="discount-info">This car cost you just IDR {paymentData.total_payment} - a fantastic deal...</p>
                    </div>
                }
                <button type="submit" className="book-now">Book Now!</button>
            </form>
        </div>
    )
}