import React, { Component } from 'react';
import {ButtonToolbar, Dropdown, DropdownButton} from "react-bootstrap";

export default class GraphDropdown extends Component{

    render() {
        return (
    <ButtonToolbar>
    <DropdownButton
      bsSize="small"
      title="Select Assignee"
      id="dropdown-size-small"
      style={{marginTop:"0px", padding: "15px", borderRadius: "40px"}}
    >

     
      <Dropdown.Item eventKey="1" onSelect = {() => this.props.assigneeSelected("Status")}>All Status</Dropdown.Item><br/>
      <Dropdown.Item eventKey="2" onSelect = {() => this.props.assigneeSelected("Fail")}>Fail</Dropdown.Item><br/>
      <Dropdown.Item eventKey="3" onSelect = {() => this.props.assigneeSelected("Block")}>Block</Dropdown.Item><br/>
      <Dropdown.Item divider />
      <Dropdown.Item eventKey="5" onSelect = {() => this.props.assigneeSelected("Admin")}>Admin</Dropdown.Item><br/>
    </DropdownButton>
  </ButtonToolbar >

        )
    }
}