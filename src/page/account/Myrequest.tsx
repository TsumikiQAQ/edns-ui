import React, { useContext, useEffect, useState } from 'react';
import {Row,Col, Card, Button } from 'react-bootstrap';
import { DomainContractContext } from '../../components/filedrag/dragelistener';

const MyrequestPage = ()=>{
    const {contractInstance} = useContext(DomainContractContext)
    const [transferRequests,setTransferRequests] = useState<any>()
    const respondToTransferRequest= async (index:any)=>{
        await contractInstance.respondToTransferRequest(index,true)
    }
    useEffect(()=>{
        const getRequestInfo = async ()=>{
            await contractInstance.getMyTransferRequests().then((result:any)=>{
                setTransferRequests(result);
            })
        }
        contractInstance && getRequestInfo()
    },[contractInstance])
    function TransferRequestCard({ transferRequest }:{transferRequest:any}) {
        return (
          <Card className='TransferRequestCard'>
                <Card.Title>求购列表</Card.Title>
                <Col xs={12} className='TransferRequestCardList'>
                {
                transferRequest.map((item:any,index:any)=>{
                    return <Row><Card.Body className='TransferRequestCardBody' key={index}>
                        <Row>
                            <Col xs={10}>
                            <h3>求购域名: {item[0]}</h3>
                    <Card.Text>
                      求购人: {item[1]}
                      <br />
                      求购价格: {Number(item[2])} ETH
                      <br />
                    </Card.Text>
                            </Col>
                            <Col>
                    <Button onClick={()=>respondToTransferRequest(index)} variant="primary">
                        接受
                    </Button>
                    </Col>
                        </Row>
                    
                    
                  </Card.Body>
                  </Row>
                })
            }
                </Col>
           
            
          </Card>
        );
      }
    return(
        <>
        {transferRequests && <TransferRequestCard transferRequest={transferRequests} />}
        </>
        
    )
}

export default MyrequestPage