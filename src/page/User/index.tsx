import { Navigate, Route, Routes } from "react-router-dom"
import RegisterPage from "./resgiter"
import LoginPage from "./login"

const UserPage = () => {
    return (
        <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to='login' replace />} />
        </Routes>
    )
}
export default UserPage