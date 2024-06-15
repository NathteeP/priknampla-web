import { useContext } from 'react'
import MainLogo from '../assets/mainlogo.svg'
import Button from '../components/Button'
import { AuthContext } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Header () {
    const {authUser, logout} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleClickLoginLogout = async () => {
        if (!authUser) navigate('/login')

        else {
            await logout()
            navigate('/')
        }
    }


    return <>
    <div className='flex justify-between px-4 h-[92px]'>
        <div className=''>
            <Link to='/'>
        <img src={MainLogo} alt='logo' />
            </Link>
        </div>
        <div className='flex items-center justify-between w-[25vw]'>
            <Button color='transparent'
            onClick={handleClickLoginLogout}>
                {authUser? 'ออกจากระบบ' : 'เข้าสู่ระบบ'}
            </Button>
            <div className='grow'></div>
            {authUser? 
            (<Button
            color='red'
            onClick={() => navigate('/favorite')}>
                เมนูโปรด
            </Button>
            ) :
            (
            <Button
            onClick={() => navigate('/register')}>
                สมัครสมาชิก
            </Button>
            )}
        </div>
    </div>
    </>
} 