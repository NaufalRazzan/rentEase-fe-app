import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Home } from "./pages/home"
import { Navbar } from './components/shared/navbar';
import { Footer } from './components/shared/footer';
import { DaftarMasuk } from './pages/daftarMasuk';
import { ProfilePage } from './pages/profilPage';
import { CookiesProvider, useCookies } from 'react-cookie';
import { SideBarCarsProvider } from './contexts/sideBar-product.context';
import { ProductsList } from './pages/productsLists';
import { DetailProduct } from './components/products/detail-product';
import { BookingTransactions } from './components/transactions/booking';
import { PaymentTransaction } from './components/transactions/payment';
import { PaymentProvider } from './contexts/payment.context';

const BasicLayout = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}

function App() {
  const [cookies] = useCookies(['acc_token', 'user_id'])

  return (
    <div>
      <CookiesProvider>
        <SideBarCarsProvider>
          <PaymentProvider>
            <Routes>
              <Route path='/daftar/' element={<DaftarMasuk />}></Route>
              <Route path='/' element={<BasicLayout />}>
                {!cookies.acc_token &&
                  <Route index element={<Home />} />
                }
                <Route path='/:userId/' element={<Home />}>
                  <Route path='/:userId/transaction/booking/:product_id' element={<BookingTransactions />}></Route>
                  <Route path='/:userId/transaction/payment/:product_id' element={<PaymentTransaction />}></Route>
                </Route>
                {/* <Route path='/transaction/booking/:userId/:product_id' element={<BookingTransactions />}></Route>
                <Route path='/transaction/payment/:userId/:product_id' element={<PaymentTransaction />} /> */}
                <Route path='/profil/:userId' element={<ProfilePage />} />
                <Route path='/produk' element={<ProductsList />} />
                <Route path='/produk/:product_id' element={<DetailProduct />} />
              </Route>
            </Routes>
          </PaymentProvider>
        </SideBarCarsProvider>
      </CookiesProvider>

    </div>
  );
}

export default App;
