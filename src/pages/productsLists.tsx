import { Helmet } from "react-helmet"
import { NavProducts } from "../components/products/nav-products"
import { SearchProducts } from "../components/products/search-products"
import { FilterSidebar } from "../components/products/filter-sidebar"
import { ShowProduct } from "../components/home/showProducts"
import { ShowFilterProducts } from "../components/products/show-filtered"

export const ProductsList = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>RentEase</title>
                <link rel="stylesheet" type="text/css" href="styles/style.css" />
                <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
            </Helmet>
            <NavProducts />
            <SearchProducts />
            <FilterSidebar />
            <ShowFilterProducts />
        </>
    )
}