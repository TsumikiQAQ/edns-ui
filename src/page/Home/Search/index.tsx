import { Button, Col, Form, Row } from "react-bootstrap";
import { useState} from "react";
import Material from "../Material";
import { Auction } from "../../interface";
import { FaStar } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";

const SearchPage = () => {
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
    const Link = ({ item }: { item: Auction}) => {


        return (
            <Row className="domain-Link">
                <Col > <a href={item.herf} target="blank">
                <strong>
                    {item.name}
                </strong>
                </a>
</Col>
                <Col xs={6}><Button className="Buy"> <FaMoneyBillWave />购买</Button><Button className="Star"><FaStar /> 收藏</Button></Col>
               
            </Row>
        );
    };
    function DomainSearch() {
        const [domain, setDomain] = useState('');


        return (
            <Form >
                <Form.Group controlId="formDomain">
                    <Form.Control
                        type="text"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                    />
                </Form.Group>
            </Form>
        );
    }


    return (
        <Row className="LabelCalculator">
            <h2>搜索域名</h2>
            <DomainSearch></DomainSearch>
            <Col className="Link-List">
            {aucArr.map((item)=>{
                return <Link item={item}/>
            })}
            </Col>
        </Row>
    );
};
export default SearchPage;