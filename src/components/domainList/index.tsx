import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, ListGroup, Row, Col } from 'react-bootstrap';
import { FaSortAmountDown ,FaSortAmountUpAlt } from "react-icons/fa";
import { ImPriceTag } from "react-icons/im";
import { convertTimestampToDateString } from '../../page/auction/MyAuction';
import { ethers } from 'ethers';
import { DomainContractContext,AccoutInfoContext } from '../filedrag/dragelistener';
import { FilterContext } from '../../page/account/marktPage';
import { useNavigate } from 'react-router-dom';
import RequestDomainTransferModal from '../../page/account/RequestDomainTransferModal';

const ListComponent = () => {
  const {contractInstance} = useContext(DomainContractContext)
  const   {accoutInfo} = useContext(AccoutInfoContext)
  const {
    minPrice,
    maxPrice,
    maxLength,
    minLength,
    type
  } = useContext(FilterContext)
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('asc');
  const [domains,setDomains] = useState<any>([]);
  const [filteredDomains,setFilteredDomains] = useState<any>([])
  const [selectedDomain,setSelectedDomain] = useState<any>()
  const [show,setShow] = useState(false)
  const navigate = useNavigate();

  function isOnlyDigits(str:any) {
    return /^\d+$/.test(str);
  }
  function isOnlyLetters(str:any) {
    return /^[a-zA-Z]+$/.test(str);
  }
  useEffect(()=>{
    if(domains.length>0){
      let arr = [...domains]
      arr = arr.filter((domain: any) =>{ 
      return domain.toLowerCase().includes(search)
       && type?type==='number'?isOnlyDigits(domain):isOnlyLetters(domain):true 
       && minLength ? domain.length>=minLength:true 
       && maxLength ? domain.length<maxLength:true
      }).sort((a: any, b: any) => sort === 'asc' ? a.localeCompare(b) : b.localeCompare(a));      
      arr && setFilteredDomains(arr)
    }
    
  },[domains,search,sort,type,maxLength,minLength])
  const onHide = ()=>{
    setShow(false)
  }
  const handleRequestDomain=(dm:any)=>{
    setSelectedDomain(dm)
    setShow(true)
  }
  const addFavoriteDomain =async (domain:any)=>{
    await contractInstance.addFavoriteDomain(domain)
}
    const getDomain = async (dm:any)=>{
        return await contractInstance.getDomain(dm)
    }
    const requestDomainTransfer = async(dm:any,price:any)=>{
        return await contractInstance.requestDomainTransfer(dm,price,{value:ethers.parseEther(price.toString())})
    }
    useEffect(()=>{
        const getDos =async ()=>{
            await contractInstance.getDomainName().then((result:any)=>{                            
              setDomains(result)
            })
        }
        getDos()
    },[])
    const DomainNameInfo =({domain}:{domain:any})=>{
      const [domainName,setDomainName] = useState<any>([]) 
      
      useEffect(()=>{
          const getInfo = async ()=>{
             await getDomain(domain).then((result:any)=>{                            
              setDomainName(result)
             })
          }
          getInfo()
      },[])
      
      if(domainName.length>1 && minPrice && Number(ethers.formatEther(domainName[4])) < minPrice){
        return <></>
      }else if(domainName.length>1 && maxPrice && Number(ethers.formatEther(domainName[4])) > maxPrice){
        return <></>
      }else{
        return <ListGroup.Item key={domain}>
        { domainName.length>1 &&
        <>
         <Row>
           <Col xs={7}><strong>{domain}</strong> <strong><ImPriceTag />{ethers.formatEther(domainName[4])+' $ENS'}</strong></Col>
           <Col>
           {
             accoutInfo[3].indexOf(domain) === -1  && domainName[1] !== contractInstance.runner.address ?<Button onClick={()=>handleRequestDomain(domain)}>求购</Button>
             :<Button style={{color:'black'}} onClick={()=> navigate({ pathname: "/account/mydomain"})}>查看详情</Button>
           }
           
           </Col>
           <Col>
           {
             accoutInfo[4].indexOf(domain) === -1 ?<Button onClick={()=>addFavoriteDomain(domain)}>收藏</Button>
             :<Button style={{color:'black'}} onClick={()=>addFavoriteDomain(domain)}>已收藏</Button>
           }
           
           </Col>
         </Row>
         </>
         }
         
     </ListGroup.Item>
   }
      }
     
  return (
    <div className='DomainList'>
      <Form className='DomainList-form'>
        <Form.Control type="text" placeholder="搜索" value={search} onChange={e => setSearch(e.target.value)} />
        {sort === 'asc' ? <FaSortAmountUpAlt />:<FaSortAmountDown/>}<Form.Control className='sort' as="select" value={sort} onChange={e => setSort(e.target.value)}>
        <option value="asc">升序</option>
          <option value="desc">降序</option>
          <FaSortAmountDown/>
        </Form.Control>
      </Form>

      <ListGroup className='DomainListGroup'>
        {filteredDomains.map((domain: any, index: any) => (
          <DomainNameInfo key={index} domain={domain}/>
        ))}
      </ListGroup>
      <RequestDomainTransferModal show={show} onHide={onHide} selectDomain={selectedDomain} requestDomainTransfer={requestDomainTransfer} />
    </div>
  );
};

export default ListComponent;