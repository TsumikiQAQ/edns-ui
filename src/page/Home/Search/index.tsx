import { Button, Col, Form, FormControl, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useContext, useEffect, useState} from "react";
import { Auction } from "../../interface";
import { FaStar } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { PiSignatureBold } from "react-icons/pi";
import { ethers } from "ethers";
import { DomainContractContext,AccoutInfoContext } from "../../../components/filedrag/dragelistener";

const SearchPage = () => {
    const {contractInstance} = useContext(DomainContractContext)
    const   {accoutInfo} = useContext(AccoutInfoContext)

    const [searchDomain,setSearchDomain] = useState<any>()
    const [searchIP,setSearchIP] = useState<any>('')
    const [domain, setDomain] = useState('');
    const navigate = useNavigate();

    const resolveDomain = (domain: string) => {
        let strArr = domain.split('/')
        if (strArr.length === 0) throw new Error('error domain')
        
        let domainAndPort = strArr[0];  // 可能包含端口号的部分
        let domainOnly = domainAndPort;
        let port = '';
    
        // 检查域名部分是否包含端口号
        if (domainAndPort.includes(':')) {
            const splitDomain = domainAndPort.split(':');
            domainOnly = splitDomain[0];
            port = splitDomain[1];
        }
    
        if (strArr.length === 1) {
            return { domain: domainOnly, port, params: '' }
        } else {
            let params = strArr.filter((item, index) => {
                return index > 0
            }).join('/')
            return { domain: domainOnly, port, params }
        }
    }
    const addFavoriteDomain =async ()=>{
        await contractInstance.addFavoriteDomain(domain)
    }
    const handleCreateClick =(name:string)=>{
        navigate({ pathname: "/auction/createAuction"},{state:name})
    }
    const handleInfoClick =(name:string)=>{
        navigate({ pathname: "/auction/auctionInfo"},{state:name})
    }
    const handleSearch = ()=>{
        const{port, params} = resolveDomain(domain)
        let url ='http://' + searchIP+":"+ port +'/'+params
        window.open(url, '_blank');
    }
    useEffect(()=>{
    const DomainSearch=async ()=>{
        let Dname = resolveDomain(domain).domain

        let dm = await contractInstance.getDomain(Dname)
        let atN = await contractInstance.getAuctionName(Dname)
        
        let at = await contractInstance.auctions(atN)
        setSearchIP(dm[2]);
        
        if(at[0] && dm[0] === ''){
            setSearchDomain({name:at[0],isAuction:true})
        }else if(dm[0]){
            setSearchDomain({name:dm[0],amout:ethers.formatEther(dm[4]),herf:dm[2],isAuction:false})
        }else{
            setSearchDomain({name:Dname,herf:'#',isAuction:false})
        }
    }
    domain && DomainSearch()
      
    },[domain])
    const debounce = (func: Function, delay: number)=>{
        let timer: NodeJS.Timeout;
        return  (...args: any[]) => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            func.apply(this, args);
          }, delay);
        };
      }
      const handleChange:React.ChangeEventHandler<HTMLInputElement> = (e)=>{
        setDomain(e.target.value);
    }
    const debouncedHandleChange = debounce(handleChange, 300);

    const Link = ({ item }: { item: any}) => {

        return domain ?  (
            <Row className="domain-Link">
                <Col > <a href={item.herf} target="blank">
                <strong>
                {item.isAuction?<>{item.name} {' (拍卖中)'}</>:<>{`${item.name}  ${item.amout?item.amout + 'ETH':'(未注册)'}`}</>}
                </strong>
                </a>
</Col>
                <Col xs={6}><Button className="Buy" onClick={()=>item.isAuction?handleInfoClick(item.name):handleCreateClick(item.name)}> {item.isAuction?<><FaMoneyBillWave />参与拍卖</> :<><PiSignatureBold />发起拍卖</>}</Button>{accoutInfo[4].indexOf(domain) ==-1 ?<Button className="Star" onClick={addFavoriteDomain}><FaStar /> 收藏</Button>:<Button className="Star" style={{color:'black'}} onClick={()=>handleCreateClick(item.name)}><FaStar /> 已收藏</Button>}</Col>
               
            </Row>
        ):<></>;
    };

    return (
        <Row className="LabelCalculator">
            <h2>搜索域名</h2>
            <Form >
                    <FormControl
                        type="text"
                        onChange={debouncedHandleChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                                handleSearch()
                            }
                        }}
                    />
            </Form>            
            <Col className="Link-List">
                {searchDomain && <Link item={searchDomain}/>}
            </Col>
        </Row>
    );
};
export default SearchPage;