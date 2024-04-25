import { Row, Col, Container } from "react-bootstrap"
import Layout from "../../components/Layout"
import { Auction } from "../interface";
import { useEffect, useState } from "react";
import { AuctionItemDetail, AuctionList, BidForm } from "../auction/AuctionNav";
import FilterComponent from "../../components/filter";
import ListComponent from "../../components/domainList";

const AccountPage = () => {
    let logged = true
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const [selectedAuction, setSelectedAuction] = useState<Auction | null>();
    const [hidden, setHidden] = useState(true)
    const [title, setTitle] = useState('市场')
    useEffect(() => {
        //   fetchAuctions().then(data => setAuctions(data));
        const aucArr = [
            {
                id: 1,
                name: "Antique Vase",
                description: "A beautiful antique vase from the Ming dynasty.",
                startPrice: 1000,
                currentBid: 1500,
                startTime: "2023-10-01T12:00:00Z",
                endTime: "2023-10-15T12:00:00Z",
                images: ["https://example.com/images/vase1.jpg", "https://example.com/images/vase2.jpg"],
                category: "Antiques",
                status: "Active",
                herf:'http://www.baidu.com'
            },
            {
                id: 2,
                name: "Vintage Rolex Watch",
                description: "A rare vintage Rolex watch from 1952.",
                startPrice: 5000,
                currentBid: 7500,
                startTime: "2023-11-01T12:00:00Z",
                endTime: "2023-11-15T12:00:00Z",
                images: ["https://example.com/images/watch1.jpg", "https://example.com/images/watch2.jpg"],
                category: "Watches",
                status: "Active",
                herf:'http://www.bing.com'
            },
            {
                id: 3,
                name: "Signed Basketball",
                description: "A basketball signed by Michael Jordan.",
                startPrice: 200,
                currentBid: 450,
                startTime: "2023-12-01T12:00:00Z",
                endTime: "2023-12-15T12:00:00Z",
                images: ["https://example.com/images/basketball1.jpg"],
                category: "Sports",
                status: "Active",
                herf:'http://www.google.com'
            }
        ];
        setAuctions(aucArr)
    }, []);
    return (
        <Layout logged={logged}>
            <Row>
                <Col>
                    <Container className="Account">
                        <Row>
                            <h4>市场</h4>
                        </Row>
                        <Row>
                            <Row className="Title-Nav"><Col  xs={3} className={title==='市场' ?'col-select':'col'}   onClick={()=>setTitle('市场')}>市场</Col><Col  xs={3} className={title==='我的收藏' ?'col-select':'col'} onClick={()=>setTitle('我的收藏')}>我的收藏</Col><Col xs={3} className={title==='我的域名' ?'col-select':'col'} onClick={()=>setTitle('我的域名')}>我的域名</Col></Row>
                            <Row>
                                <Col xs={5}>
                            <FilterComponent />
                                </Col>
                                <Col>
                                <ListComponent domains={auctions}/>
                                </Col>
                                </Row>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Layout>
    )
}
export default AccountPage

