import { FormEvent, useEffect, useState } from 'react'
import '../../styles/style.css'
import { UserDto } from '../../utils/dto/users.dto'

type ProfileProps = {
    userId: string | undefined
}

export const ProfileComponent = ({ userId }: ProfileProps) => {
    const [user, setUser] = useState<UserDto>({
        nama_lengkap: '',
        NIK: '',
        email: '',
        no_hp: '',
        alamat: ''
    });
    const [ statusMsg, setStatusMsg ] = useState('')

    const handleUpdateProfile = async (event: FormEvent) => {
        event.preventDefault()

        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URI}profile/updateProfile/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })

            if(!res.ok){
                throw new Error('failed to update profile')
            }

            const respBody = await res.json()

            return setStatusMsg(respBody.message)
        } catch (error) {
            console.error('Error from server', error)
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URI}profile/getProfile/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                })

                if(!res.ok) throw new Error('Failed to fetch data')
                
                const data = await res.json()

                return setUser(data?.profile)
            }catch (error) {
                console.error('Error while fetching data: ', error)
            }
        }
        fetchUser()
    }, [])

    return (
        <div className='section'>
            <div className="container">
                <h3>Profil</h3>
                <div className="box">
                    <form onSubmit={handleUpdateProfile}>
                        <input type="text" defaultValue={user.nama_lengkap || ''} placeholder='Nama Lengkap' className='input-control' />
                        <input type="text" defaultValue={user.NIK || ''} placeholder='NIK' className='input-control' disabled={user.NIK ? true : false} />
                        <input type="text" defaultValue={user.email || ''} placeholder='Email' className='input-control' />
                        <input type="text" defaultValue={user.no_hp || ''} placeholder='No HP' className='input-control' />    
                        <input type="text" defaultValue={user.alamat || ''} placeholder='Alamat' className='input-control' />
                        <input type="submit" value="Simpan Profil" className='btnn' />
                        {statusMsg && 
                            <p style={{
                                color: 'green', 
                                fontSize: '14px', 
                                margin: '5px 0', 
                                fontStyle: 'italic'
                            }}>{statusMsg}</p>
                        }
                    </form>
                </div>
                <h3>Ubah Password</h3>
                <div className="box">
                    <form action="#" method="post">
                        <input type="password" name="pass1" placeholder='Password Baru' className='input-control'/>
                        <input type="password" name="pass1" placeholder='Konfirmasi Password Baru' className='input-control'/>
                        <input type="submit" value="Ubah Password" className='btnn' />
                    </form>
                </div>
            </div>
        </div>
    )
}