import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import LandingPage from "../../../pages/LandingPage";
import Header from "../../../layouts/Header";

export default function ProtectedRoute ({children}) {
    const {authUser} = useContext(AuthContext)

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