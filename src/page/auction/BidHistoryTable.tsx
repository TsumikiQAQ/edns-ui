import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { convertTimestampToDateString } from "./MyAuction";

const BidHistoryTable = ({ bidHistory }: { bidHistory: any }) => {
  return (
    <Container className="BidHistoryInfoList">
        <Card className="BidHistoryInfoList-title">
        <Row>
              <Col xs={2}>出价顺序</Col>
              <Col xs={4}>出价日期</Col>
              <Col xs={2}> 竞标金额</Col>
              <Col xs={2}>出价账户</Col>
        </Row>
        </Card>
        <Row className="BidHistoryInfos">
        <Col className="BidHistoryInfosList">

        {bidHistory.map((bid: any, index: any) => (
          <Row>
          <Card className="BidHistoryInfo" key={index}>
          <Card.Body>
            <Row>
              <Col xs={2}>{index + 1}</Col>
              <Col xs={4}>{convertTimestampToDateString(Number(bid[2]))}</Col>
              <Col xs={2}>{Number(bid[1])} ETH</Col>
              <Col xs={2}>{bid[0].substring(0,7)}</Col>
            </Row>
          </Card.Body>
        </Card>
          </Row>
        
      ))}
                </Col>

        </Row>
      
    </Container>
  );
};

export default BidHistoryTable;
