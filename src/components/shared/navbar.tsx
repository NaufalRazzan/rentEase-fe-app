import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/style.css'

export const Navbar: React.FC = () => {
    return (
        <header>
          <div className="container">
            <h1><Link to="/">RentEase</Link></h1>
            <nav>
              <ul>
                <li><Link to="/produk">Daftar</Link></li>
                <li><Link to="/profil">Profil</Link></li>
                <li><Link to="/lokasi">Lokasi</Link></li>
              </ul>
            </nav>
          </div>
        </header>
      );
}