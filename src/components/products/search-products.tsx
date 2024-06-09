import { useSideBarCarsContext } from '../../contexts/sideBar-product.context'
import '../../styles/style.css'
import { useState } from 'react'

export const SearchProducts = () => {
    const [sortValues, setSortValues] = useState('none')
    const [searchValue, setSearchvalue] = useState('')
    const { productsData, setProductsData } = useSideBarCarsContext()

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault()

        setSortValues(event.target.value)
        setProductsData({ sort: event.target.value })
    };

    const handleSearchchange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()

        setProductsData({ vehicleName: event.target.value })
    }

    return (
        <div className="search2">
            <div className="container">
                <form>
                    <input 
                        type="text" 
                        name="search" 
                        placeholder="Cari Produk" 
                        autoFocus={true}
                        value={searchValue}
                        onChange={handleSearchchange}
                    />
                    <input type="submit" name="cari" value="Cari Produk" />

                    <select 
                        value={sortValues} 
                        onChange={handleSortChange}
                    >
                        <option value="none">Recommended</option>
                        <option value="desc">Sort By Highest Price</option>
                        <option value="asc">Sort By Lowest Price</option>
                    </select>
                </form>
            </div>
        </div>
    )
}