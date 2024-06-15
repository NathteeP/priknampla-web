import { Link } from "react-router-dom"
import MainLogo from "../assets/mainlogo.svg"
import RegisterForm from "../features/authentication/components/RegisterForm"

export default function RegisterPage () {
    return (
        <div className="flex flex-col w-screen h-screen justify-center items-center">
            <Link to='/'>
            <img width='156px' src={MainLogo} alt='logo' />
            </Link>
            <RegisterForm />
            <p>มีบัญชีอยู่แล้ว?</p>
            <p>กรุณาลงชื่อเข้าใช้ <Link className="text-red-500" to='/login'>ที่นี่</Link></p>
            
        </div>
    )
}