import { FormEvent } from 'react'
import '../../styles/style.css'

export const SearchBar = () => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return (
        <div className="search">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="search" placeholder="Cari Produk" />
                    <input type="submit" name="cari" value="Cari Produk" />
                </form>
            </div>
        </div>
    )
}