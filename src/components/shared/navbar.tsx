import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/style.css'
import { useCookies } from 'react-cookie';

export const Navbar: React.FC = () => {
  const [cookies, _, removeCookie] = useCookies(['acc_token', 'user_id'])
  const navigate = useNavigate()

  const logoutRequest = async () => {
    try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URI}auth/signout/${cookies.user_id}`, {
            method: 'POST'
        })
        const respBody = await res.json()
        if(!res.ok){
            throw new Error(respBody.message)
        }
        removeCookie('acc_token', { path: '/' })
        removeCookie('user_id', { path: '/' })
        navigate('/')
    } catch (error) {
        console.error('Error from server: ', error)
    }
  }

  return (
      <header>
        <div className="container">
          <h1>
            {/* <img src='assets/logo_rentease.jpeg' alt='RentEase Logo' style={{
              width: '50px',
              float: 'left',
              margin: '10px 10px 15px 15px'
            }} /> */}
            <Link to={!cookies.user_id ? '/' : `/${cookies.user_id}`}>RentEase</Link>
          </h1>
          <nav>
            <ul>
              {cookies.acc_token ? 
                <li><Link to='/' onClick={logoutRequest}>Logout</Link></li> :
                <li><Link to='/daftar'>Daftar</Link></li>
              }
              {cookies.acc_token && (
                <li><Link to={`/profil/${cookies.user_id}`}>Profil</Link></li>
              )}
              <li><Link to="/produk">Produk</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    );
}