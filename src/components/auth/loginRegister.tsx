import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import '../../styles/style.css'
import { NewUserDto } from '../../utils/dto/new-user.dto'
import { SignInDto } from '../../utils/dto/signin-user.dto'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

export const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true) // isLogin = true -> login page
    const [errorMsg, setErrorMsg] = useState('')
    const [userId, setUserId] = useState('')
    const [_, setCookies] = useCookies(['acc_token', 'user_id'])
    const navigate = useNavigate()
    const [formDataRegister, setFormDataRegister] = useState<NewUserDto>({
        nama_lengkap: '',
        email: '',
        password: '',
        ulangi_password: ''
    });
    const [formDataLogin, setFormDataLogin] = useState<SignInDto>({
        email: '',
        password: ''
    })

    const changeIsLogin = () => {
        setIsLogin(!isLogin)
    }

    const handleFormInputRegister = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        setFormDataRegister({
            ...formDataRegister,
            [name]: value
        });
    }

    const handleFormInputLogin = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        setFormDataLogin({
            ...formDataLogin,
            [name]: value
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            if(!isLogin && formDataRegister.password !== formDataRegister.ulangi_password){
                setErrorMsg('not same password')
            }

            const resp = await fetch(`${process.env.REACT_APP_SERVER_BASE_URI}auth/${isLogin ? 'signin' : 'signup'}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(isLogin ? formDataLogin : formDataRegister)
            })

            const respBody = await resp.json()
            switch(resp.status){
                case 200:
                    setUserId(respBody?.result?.user_id)
                    break;
                case 400:
                    setErrorMsg(respBody.message);
                    break;
                case 401:
                    setErrorMsg(respBody.message)
                    break;
                case 409:
                    setErrorMsg('name already exists')
                    break;
                case 500:
                    alert('please try again');
                    break;
                default:
                    throw new Error(respBody.message)
            }
            setCookies('acc_token', respBody?.result?.acc_token, {
                path: '/',
                maxAge: 300,
            })
            setCookies('user_id', respBody?.result?.user_id, {
                path: '/',
                maxAge: 300,
            })
        } catch (error) {
            console.error('Error from server: ', error)
        }
    }

    useEffect(() => {
        if (isLogin) {
            setFormDataRegister({
                nama_lengkap: '',
                email: '',
                password: '',
                ulangi_password: ''
            });
        } else {
            setFormDataLogin({
                email: '',
                password: ''
            });
        }
        if(userId) navigate(`/${userId}`)
    }, [isLogin, userId]);

    return(
        <div className="wrapper">
            <div className="title-text">
                <div className={`title ${isLogin ? 'login' : 'signup'}`}>{isLogin ? 'Login' : 'Registrasi'}</div>
            </div>
            <div className='form-container'>
                <div className='slide-controls'>
                    <input type="radio" name="slide" id="login" checked={isLogin} onChange={changeIsLogin} />
                    <input type="radio" name="slide" id="signup" checked={!isLogin} onChange={changeIsLogin} />
                    <label htmlFor="login" className='slide login'>Login</label>
                    <label htmlFor="signup" className='slide signup'>Daftar</label>
                    <div className='slider-tab'></div>
                </div>

                <div className='form-inner'>
                    <form className={isLogin ? 'login' : 'signup'} onSubmit={handleSubmit}>
                        <div className='field'>
                            <input 
                                type="text" 
                                placeholder='Masukan Email' 
                                name='email'
                                value={isLogin ? formDataLogin.email : formDataRegister.email}
                                required={true} 
                                onChange={isLogin ? handleFormInputLogin : handleFormInputRegister} 
                            />
                        </div>
                        {!isLogin && (
                            <div className="field">
                                <input 
                                    type="text" 
                                    placeholder='Masukan Nama Lengkap' 
                                    name='nama_lengkap'
                                    required={true} 
                                    onChange={handleFormInputRegister} 
                                />
                            </div>
                        )}
                        <div className='field'>
                            <input 
                                type="password" 
                                placeholder='Masukan Password' 
                                name='password'
                                value={isLogin ? formDataLogin.password : formDataRegister.password}
                                required={true} 
                                onChange={isLogin ? handleFormInputLogin : handleFormInputRegister} 
                            />
                        </div>
                        {!isLogin && (
                            <div className='field'>
                                <input 
                                    type="password" 
                                    placeholder='Ulangi Password' 
                                    name='ulangi_password'
                                    required={true} 
                                    onChange={handleFormInputRegister} 
                                />
                            </div>
                        )}
                        {isLogin && (
                            <div className="pass-link"><a href="#">Pikun?</a></div>
                        )}
                        {errorMsg && (
                            <p style={{
                                color: 'red', 
                                fontSize: '14px', 
                                margin: '5px 0', 
                                fontStyle: 'italic'
                            }}>{errorMsg}</p>
                        )}
                        <div className="field btn">
                            <div className="btn-layer"></div>
                            <input type="submit" value={isLogin ? 'Login' : 'Daftar'} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}