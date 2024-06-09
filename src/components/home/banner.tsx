import { Link } from 'react-router-dom'
import '../../styles/style.css'

export const Banner = () => {
    return (
        <section className="banner">
            <Link to="/about">
                <h2>SELAMAT DATANG DI RENTEASE</h2>
            </Link>
        </section>
    )
}