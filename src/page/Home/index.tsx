import React, { createContext, useEffect, useState } from "react"
import Layout from "../../components/Layout"
import Material from "./Material"
import SearchPage from "./Search"
import { filterLabes } from "./Search/interface"
import { Col, Row } from "react-bootstrap"
export const ClassNameContext = createContext<{ className: string, setClassName: React.Dispatch<React.SetStateAction<string>> }>({ className: 'StaticMesh', setClassName: () => { } })

export let filterLabelContext = createContext<{
    filterLabel: filterLabes;
    setFilterLabel: React.Dispatch<React.SetStateAction<filterLabes>>;
}>({
    filterLabel: {
        classLabel: [],
        descripitionLabel: []
    },
    setFilterLabel: function (value: React.SetStateAction<{}>): void {
        throw new Error("Function not implemented.")
    }
})

const HomePage = () => {
    const [className, setClassName] = useState('StaticMesh')
    const [filterLabel, setFilterLabel] = useState<filterLabes>({
        classLabel: [],
        descripitionLabel: []
    })
    let filter = { filterLabel, setFilterLabel }
    let logged = true

    return (
        <>
            <Layout logged={logged} >
                <filterLabelContext.Provider value={filter}>
                    <ClassNameContext.Provider value={{ className, setClassName }}>
                        <Row>
                            <SearchPage />
                        </Row>
                    </ClassNameContext.Provider>
                </filterLabelContext.Provider>
            </Layout>
        </>
    )
}

export default HomePage