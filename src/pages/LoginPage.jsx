import { Link } from "react-router-dom"
import MainLogo from "../assets/mainlogo.svg"
import LoginForm from "../features/authentication/components/LoginForm"

export default function LoginPage() {
    return (
        <div className="flex flex-col w-screen h-screen justify-center items-center">
            <img width='156px' src={MainLogo} alt='logo' />
            <LoginForm />
            <p>ยังไม่มีบัญชี?</p>
            <p>สมัครสมาชิก <Link className="text-red-500" to='/login'>ที่นี่</Link></p>
        </div>
    )
}