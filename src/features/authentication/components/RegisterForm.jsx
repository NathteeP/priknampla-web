import { useContext, useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import validate from "../../../validators/auth-validate";
import { useNavigate } from "react-router-dom";
import authApi from "../../../apis/auth";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from "sonner";

const initInput = {
    userName: '',
    displayName: '',
    password: '',
    confirmPassword: ''
}

const initInputError = {
    userName: '',
    displayName: '',
    password: '',
    confirmPassword: ''
}

const inputErrorWhiteSpace = {
    //set all value to whitespace, to let all field appear error
    userName: ' ',
    displayName: ' ',
    password: ' ',
    confirmPassword: ' '
}

export default function RegisterForm () {


    const [userInput,setUserInput] = useState(initInput)
    const [inputError,setInputError] = useState(initInputError)

    const {login} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleChangeInput = e => {
        setUserInput({...userInput, [e.target.name] : e.target.value})
    }

    const handleSubmitForm = async e => {
        try {
            e.preventDefault()
            const error = validate("register",userInput)
            if(error) {
                return setInputError(error)
            }

            setInputError({initInputError})

            await authApi.register(userInput)
            const loginCredentials = {
                userName: userInput.userName,
                password: userInput.password
            }

            await login(loginCredentials)
            toast.success('สมัครสมาชิกเรียบร้อย')

            navigate('/')


        } catch (err) {
            setInputError({...inputErrorWhiteSpace,'confirmPassword': err.response.data.message})

            console.log(err)
        }
    }

    return (
        <form onSubmit={handleSubmitForm}
        className="flex flex-col w-96 gap-4 items-center px-4 py-8"
        >
            <h1 className="font-semibold text-xl">สมัครสมาชิก</h1>
            <div></div>
            <Input placeholder='ชื่อผู้ใช้งาน'
            name='userName'
            value={userInput.userName}
            onChange={handleChangeInput}
            error={inputError.userName}
             />
            <Input placeholder='ชื่อสำหรับแสดงผลหน้าเว็บ'
            name='displayName'
            value={userInput.displayName}
            onChange={handleChangeInput}
            error={inputError.displayName}
             />
            <Input type='password' placeholder='รหัสผ่าน' 
            name='password'
            value={userInput.password}
            onChange={handleChangeInput}
            error={inputError.password}
            />         
            <Input type='password' placeholder='ยืนยันรหัสผ่าน' 
            name='confirmPassword'
            value={userInput.confirmPassword}
            onChange={handleChangeInput}
            error={inputError.confirmPassword}
            />
            <div></div>
            <Button width='full'>สมัครสมาชิก</Button>

        </form>
    )
}