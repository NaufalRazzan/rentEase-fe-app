import { Helmet } from "react-helmet"
import '../styles/style.css'
import { SearchBar } from "../components/home/searchbar"
import { Banner } from "../components/home/banner"
import { Category } from "../components/home/category"
import { ShowProduct } from "../components/home/showProducts"

export const Home = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>RentEase</title>
                <link rel="stylesheet" type="text/css" href="styles/style.css" />
                <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
            </Helmet>
            <Banner />
            <SearchBar />
            <Category />
            <ShowProduct />
        </div>
    )
}