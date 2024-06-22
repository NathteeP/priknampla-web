import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import LandingPage from "../../../pages/LandingPage";
import Header from "../../../layouts/Header";
import { useEffect } from "react";

export default function ProtectedRoute ({children}) {
    const {authUser, fetchUser} = useContext(AuthContext)
    useEffect(() => {
        fetchUser() 
    },[])

    if (!authUser) return (
    <>
    <Header />
    <LandingPage />
    </>
    )
    return <>
    {children}
    </>
}