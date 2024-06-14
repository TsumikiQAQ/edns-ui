import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { Auction } from "../interface";

const AccountNavPage = ({children}:{children:any}) => {
    let logged = true
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const [selectedAuction, setSelectedAuction] = useState<Auction | null>();
    const [hidden, setHidden] = useState(true)
    const [title, setTitle] = useState('市场')
    const navigate = useNavigate();
    const handleClick =(str:string)=>{
        setTitle(str)
    }
    useEffect(() => {
        //   fetchAuctions().then(data => setAuctions(data));
        const aucArr:any = [];

        setAuctions(aucArr)
    }, []);
    useEffect(()=>{
        let url = window.location.href.split('/')
        
        if(url[4]=='market'){
            setTitle('市场')
        }else if(url[4]=='mystar'){
            setTitle('我的收藏')
        }else if(url[4]=='mydomain'){
            setTitle('我的域名')
        }else if(url[4]=='myrequest'){
            setTitle('处理求购')
        }
        
    },[window.location.href])

    return (
        <Layout logged={logged} >
            <Row>
                <Col>
                    <Container className="Account">
                    <Row>
                        <h4>市场</h4>
                    </Row>
                    <Row>
                    <Row className="Title-Nav">
                    <Col xs={3} className={title==='市场' ?'col-select':'col'} onClick={()=>handleClick('市场')}><Link to={'/account/market'}>市场</Link> </Col>
                    <Col  xs={3} className={title==='我的收藏' ?'col-select':'col'} onClick={()=>handleClick('我的收藏')}><Link to={'/account/mystar'}>我的收藏</Link></Col>
                    <Col  xs={3} className={title==='我的域名' ?'col-select':'col'}   onClick={()=>handleClick('我的域名')}><Link to={'/account/mydomain'}>我的域名</Link></Col>
                    <Col  xs={3} className={title==='处理求购' ?'col-select':'col'}   onClick={()=>handleClick('处理求购')}><Link to={'/account/myrequest'}>处理求购</Link></Col></Row>
                    {children}
                    </Row>
                    </Container>
                </Col>
            </Row>


        </Layout>

    )
}



export default AccountNavPage