import { Button, Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap"
import Layout from "../../components/Layout"
import AssetTypeSearchPage from "../Home/Search/assetTypeSearch"
import { useEffect, useState } from "react";
import { Auction } from "../interface";
import FilterComponent from "../../components/filter";
import { Link, useNavigate } from "react-router-dom";
export const AuctionTimer = ({ endTime }: { endTime: number }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const distance = endTime - Number(now);
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setTimeLeft(`${hours}小时 ${minutes}分钟 ${seconds}秒`);
            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft('已结束');
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [endTime]);

    return (
        <div>{timeLeft}</div>
    );
};

export const BidForm = ({ minBid, onPlaceBid, hidden }: { minBid: any, onPlaceBid: any, hidden: boolean }) => {
    const [bid, setBid] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        onPlaceBid(bid);
        setBid('');
    };

    return (
        <Form onSubmit={handleSubmit} hidden={hidden}>
            <Form.Group>
                <Form.Label>输入您的出价（最低: ${minBid + ')'}:</Form.Label>
                <Form.Control
                    type="number"
                    value={bid}
                    onChange={e => setBid(e.target.value)}
                    min={minBid}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                出价
            </Button>
        </Form>
    );
};
export const AuctionItemDetail = ({ auction, onBid, onBack }: { auction: any, onBid: any, onBack: any }) => (
    <Card>
        <Card.Header>{auction.name}</Card.Header>
        <Card.Body>
            <Card.Title>当前出价: ${auction.currentBid}</Card.Title>
            <Card.Text>
                结束时间: <AuctionTimer endTime={auction.endTime} />
            </Card.Text>
            <Button variant="success" onClick={onBid}>出价</Button>
            <Button variant="secondary" onClick={onBack} className="ml-2">返回列表</Button>
        </Card.Body>
    </Card>
);
export const AuctionList = ({ title, auctions, onSelect }: { title: string, auctions: any, onSelect: any }) => (
    <ListGroup className="AuctionList">
        <h2>{title}</h2>
        {auctions.map((auction: any) => (
            <ListGroup.Item key={auction.id}>
                <Col>{auction.name} - current price: ${auction.currentBid}</Col>
                <Button variant="primary" onClick={() => onSelect(auction.id)} className="float-right">
                    particulars
                </Button>
            </ListGroup.Item>
        ))}
    </ListGroup>
);
const AuctionNavPage = ({children}:{children:any}) => {
    let logged = true
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const [selectedAuction, setSelectedAuction] = useState<Auction | null>();
    const [hidden, setHidden] = useState(true)
    const [title, setTitle] = useState('我的拍卖')
    const navigate = useNavigate();
    const handleClick =(str:string)=>{
        setTitle(str)
    }
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
        <Layout logged={logged} >
            <Row>
                <Col>
                    <Container className="Auction">
                    <Row>
                        <h4>拍卖</h4>
                    </Row>
                    <Row>
                    <Row className="Title-Nav">
                    <Col xs={3} className={title==='我的拍卖' ?'col-select':'col'} onClick={()=>handleClick('我的拍卖')}><Link to={'/auction/myAuction'}>我的拍卖</Link> </Col>
                    <Col  xs={3} className={title==='创建拍卖' ?'col-select':'col'} onClick={()=>handleClick('创建拍卖')}><Link to={'/auction/createAuction'}>创建拍卖</Link></Col>
                    <Col  xs={3} className={title==='历史拍卖' ?'col-select':'col'}   onClick={()=>handleClick('历史拍卖')}><Link to={'/auction/historyAuction'}>历史拍卖</Link></Col></Row>
                    {children}
                    </Row>
                    </Container>
                </Col>
            </Row>


        </Layout>

    )
}



export default AuctionNavPage