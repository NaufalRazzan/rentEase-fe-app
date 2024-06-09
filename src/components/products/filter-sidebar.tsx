import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import '../../styles/style.css'
import { useSideBarCarsContext } from '../../contexts/sideBar-product.context'
import { getSmallestLargestNumberPower, getSmallestLargestNumberPrice } from '../../utils/getSmallestLargestNumber'
import { SideBarCarsProductsDto } from '../../utils/dto/sidebar-product.dto'

type Checkbox = {
    name: string
    checked: boolean
    value: string
}

export const FilterSidebar = () => {
    const [brandsValues, setBrandsValues] = useState<Checkbox[]>([
        { name: 'merci', checked: false, value: 'Mercedes' },
        { name: 'honda', checked: false, value: 'Honda' },
        { name: 'nissan', checked: false, value: 'Nissan' },
        { name: 'mazda', checked: false, value: 'Mazda' },
        { name: 'mitsu', checked: false, value: 'Mitsubishi' },
        { name: 'vw', checked: false, value: 'Volkswagen' },
        { name: 'hyndai', checked: false, value: 'Hyundai' },
        { name: 'daihatsu', checked: false, value: 'Daihatsu' },
        { name: 'bmw3', checked: false, value: 'BMW' },
    ]);

    const [transmissionValues, setTransmissionValues] = useState<Checkbox[]>([
        { name: 'Manual M/T', checked: false, value: 'Manual' },
        { name: 'Automatic A/T', checked: false, value: 'Automatic' }
    ]);

    const [seatsValue, setSeatsValue] = useState<Checkbox[]>([
        { name: '1', checked: false, value: '1' },
        { name: '2', checked: false, value: '2' },
        { name: '3', checked: false, value: '3' },
        { name: '4', checked: false, value: '4' },
        { name: '5', checked: false, value: '5' },
        { name: '6+', checked: false, value: '6' }
    ]);

    const [priceValues, setPriceValues] = useState<Checkbox[]>([
        { name: '10.000.000 - 15.000.000', checked: false, value: '10000000 - 15000000' },
        { name: '16.000.000 - 20.000.000', checked: false, value: '16000000 - 20000000' },
        { name: '21.000.000 - 25.000.000', checked: false, value: '21000000 - 25000000' },
        { name: '26.000.000 - 30.000.000', checked: false, value: '26000000 - 30000000' },
    ]);

    const [powerValues, setPowerValues] = useState<Checkbox[]>([
        { name: '100 - 199 KW', checked: false, value: '100 - 199' },
        { name: '200 - 299 KW', checked: false, value: '200 - 299' },
        { name: '300 - 399 KW', checked: false, value: '300 - 399' },
        { name: '400 - 699 KW', checked: false, value: '400 - 699' },
        { name: '700+ KW', checked: false, value: '700 - 1000' }
    ]);

    const [locationValues, setLocationValues] = useState<Checkbox[]>([
        { name: 'JAKARTA', checked: false, value: 'Jakarta' },
        { name: 'SURABAYA', checked: false, value: 'Surabaya' },
        { name: 'BALI', checked: false, value: 'Bali' },
        { name: 'YOGYAKARTA', checked: false, value: 'Yogyakarta' },
        { name: 'BANDUNG', checked: false, value: 'Bandung' },
    ]);

    const { productsData, setProductsData } = useSideBarCarsContext()

    const handleCheckboxChange = (idx: number, setValue: Dispatch<SetStateAction<Checkbox[]>>) => {
        setValue(prevValues => {
            const updatedValues = [...prevValues]
            updatedValues[idx].checked = !updatedValues[idx].checked

            return updatedValues
        })
    };

    const getValues = (arr: Checkbox[]): string[] => {
        return arr.reduce((values: string[], item) => {
            if (item.checked) {
                values.push(item.value);
            }
            return values;
        }, []);
    };

    useEffect(() => {
        setProductsData(prevData => ({
            ...prevData,
            brandName: getValues(brandsValues),
            transmission: getValues(transmissionValues),
            seatsNum: getValues(seatsValue).map(Number),
            minPrice: getSmallestLargestNumberPrice(getValues(priceValues))[0] || 0,
            maxPrice: getSmallestLargestNumberPrice(getValues(priceValues))[1] || 0,
            minPower: getSmallestLargestNumberPower(getValues(powerValues))[0] || 0,
            maxPower: getSmallestLargestNumberPower(getValues(powerValues))[1] || 0,
            location: getValues(locationValues)
        }));
        console.log(productsData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brandsValues, transmissionValues, seatsValue, priceValues, powerValues, locationValues]);

    return (
        <section className="sidebar-container">
            <div className="sidebar fixed">
                <div className="filter-type">
                    <input type="checkbox" name="filter-type" id="filter-column" defaultChecked={true} />
                    <label htmlFor="filter-column">BRANDS</label>
                    <div className="size">
                        {brandsValues.map((checkbox, idx) => (
                            <div className='square' key={idx}>
                                <p 
                                    className='para' 
                                    onClick={() => handleCheckboxChange(idx, setBrandsValues)}
                                    style={{
                                        backgroundColor: checkbox.checked ? 'lightblue' : 'transparent',
                                        border: checkbox.checked ? '2px solid blue' : '2px solid transparent',
                                    }}
                                >
                                    <img src={`/assets/${checkbox.name.toLowerCase()}.png`} alt={checkbox.name} />
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='filter-type'>
                    <input type="checkbox" name="filter-type" id="filter-column" defaultChecked={true} />
                    <label htmlFor="filter-column">TRANSMISSION</label>
                    <ul>
                        {transmissionValues.map((checkbox, idx) => (
                            <li key={idx}>
                                <input type="checkbox" onClick={() => handleCheckboxChange(idx, setTransmissionValues)} />
                                {checkbox.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='filter-type'>
                    <input type="checkbox" name="filter-type" id="filter-column" defaultChecked={true} />
                    <label htmlFor="filter-column">SEATS</label>
                    <ul>
                        {seatsValue.map((checkbox, idx) => (
                            <li key={idx}>
                                <input type="checkbox" onClick={() => handleCheckboxChange(idx, setSeatsValue)} />
                                {checkbox.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='filter-type'>
                    <input type="checkbox" name="filter-type" id="filter-column" defaultChecked={true} />
                    <label htmlFor="filter-column">PRICE</label>
                    <ul>
                        {priceValues.map((checkbox, idx) => (
                            <li key={idx}>
                                <button 
                                    className='price-button' 
                                    onClick={() => handleCheckboxChange(idx, setPriceValues)}
                                    style={{
                                        backgroundColor: checkbox.checked ? 'lightblue' : 'transparent',
                                    }}
                                >{checkbox.name}</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='filter-type'>
                    <input type="checkbox" name="filter-type" id="filter-column" defaultChecked={true} />
                    <label htmlFor="filter-column">POWER</label>
                    <ul>
                        {powerValues.map((checkbox, idx) => (
                            <li key={idx}>
                                <input type="checkbox" onClick={() => handleCheckboxChange(idx, setPowerValues)} />
                                {checkbox.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='filter-type'>
                    <input type="checkbox" name="filter-type" id="filter-column" defaultChecked={true} />
                    <label htmlFor="filter-column">LOCATION</label>
                    <ul>
                        {locationValues.map((checkbox, idx) => (
                            <li key={idx}>
                                <button 
                                    className='price-button' 
                                    onClick={() => handleCheckboxChange(idx, setLocationValues)}
                                    style={{
                                        backgroundColor: checkbox.checked ? 'lightblue' : 'transparent',
                                    }}
                                >{checkbox.name}</button>                                
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}