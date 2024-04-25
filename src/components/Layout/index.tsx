import { createContext, useState } from "react"
import LoginForm from "../../page/User/login"
import { LayoutProps } from "../interface/layout"
import TopNav from "./topnav"
import { Col, Row } from "react-bootstrap"
import AssetTypeSearchPage from "../../page/Home/Search/assetTypeSearch"
export const LoginFormContext = createContext<any>('')

const Layout: React.FC<LayoutProps> = ({ logged, children }) => {
    const [hide, setHide] = useState(false)
    const HideHandle = (e: any) => {
        e.preventDefault()
        setHide(!hide)
    }
    return (
        <>
            <LoginFormContext.Provider value={{ hide, HideHandle }}>
                <TopNav logged={logged} />
                <Row className="main">
                    <Col xs={1}><AssetTypeSearchPage></AssetTypeSearchPage></Col>
                    <Col>{children}</Col>
                    <LoginForm />
                </Row>
            </LoginFormContext.Provider>
        </>
    )
}
export default Layout