import { useContext, useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import validate from "../../../validators/auth-validate";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

const initInput = {
    userName: '',
    password: ''
}

const initInputError = {
    userName: '',
    password: ''
}

export default function LoginForm () {


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
            const error = validate("login",userInput)
            if(error) {
                return setInputError(error)
            }

            setInputError({initInputError})

            await login(userInput)
            navigate('/')


        } catch (err) {
            setInputError({...initInputError, userName:' ','password': err.response.data.message})
            console.log(err)
        }
    }

    return (
        <form onSubmit={handleSubmitForm}
        className="flex flex-col w-96 gap-4 items-center px-4 py-8"
        >
            <h1 className="font-semibold text-xl">เข้าสู่ระบบ</h1>
            <div></div>
            <Input placeholder='ชื่อผู้ใช้งาน'
            name='userName'
            value={userInput.userName}
            onChange={handleChangeInput}
            error={inputError.userName}
             />
            <Input type='password' placeholder='รหัสผ่าน' 
            name='password'
            value={userInput.password}
            onChange={handleChangeInput}
            error={inputError.password}
            />
            <div></div>
            <Button width='full'>เข้าสู่ระบบ</Button>

        </form>
    )
}