import { Helmet } from 'react-helmet'
import '../styles/style.css'
import { LoginRegister } from '../components/auth/loginRegister'

export const DaftarMasuk = () => {
    return(
        <>
        <Helmet>
            <meta charSet='UTF-8' />
            <title>RentEase</title>
            <link rel="stylesheet" href="css/style.css" />
            <style type='text/css'>{`
                html,body{
                    display: grid;
                    height: 100%;
                    width: 100%;
                    place-items: center;
                    background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);           
                }
            `}
            </style>
        </Helmet>
        <LoginRegister />
        </>
    )
}