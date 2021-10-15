import React, { Component } from "react";
import ChartWrapper from "./ChartWrapper";
import PieChartWrapper from "./PieChartWrapper";
import {Container, Row, Col} from "react-bootstrap";
import GraphDropdown from "./GraphDropdown";
import "../App.css"




class ReportComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
          Assignee : "Status"
        }
}

 assigneeSelected = (assignee) => {
    this.setState({Assignee : assignee})
 }

    render(){
        return(   
                       
 <Container className="main-grid">

<Row className="show-center-grid">
    <Col xs={1} md={3}>
      <code style={{color:"black", fontSize:"14px", backgroundColor:"white", fontWeight:"540", marginBottom: "0px", marginTop: "20px"}}>{'Fiscal Quarter'}</code>
    </Col>
  </Row>

  <Row className="show-center-grid">
    <Col xs={5} md={3}>
      <code>
      <GraphDropdown assigneeSelected = {this.assigneeSelected} />
      </code>
    </Col>
    </Row>

<Row className="show-grid">
    <Col sm={8}>
    <ChartWrapper Assignee = {this.state.Assignee} />
    </Col>
    <Col sm={4}>
    <PieChartWrapper Assignee = {this.state.Assignee} />
    </Col>
  </Row>

</Container> 


        )
    }
}

export default ReportComponent