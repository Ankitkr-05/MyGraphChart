import React, { Component } from "react";
import D3PieChart from "./D3PieChart";
// import {connect} from 'react-redux';

// 1.
// @connect((state) => {
//     return {
//       pass: state.fiscalR.pass,
//       passIssue: state.fiscalR.passIssue,
//       block: state.fiscalR.block,
//       fail: state.fiscalR.fail,
//       NA: state.fiscalR.NA,
//       noValue: state.fiscalR.noValue,
//     }
//   })


class PieChartWrapper extends Component{
    constructor(props){
        super(props)
        this.state= {
            pass: 24,
            passIssue: 80,
            block: 30,
            fail: 96,
            NA: 50,
            noValue: 30
        }
        this.callRef = null;
        this.setCallRef = element => {
            this.callRef = element;
        };
    }

    componentDidMount() {
        const dataValue = [
            [
            {"name" : "Pass", "value" : 10},
            {"name" : "Pass Issue", "value" : 20},
            {"name" : "Block", "value" : 40},
            {"name" : "Fail", "value" : 23},
            {"name" : "N/A", "value" : 32},
            {"name" : "No Value", "value" : 30}
         ],
         [
            {"name" : "Fail1", "value" : 20},
            {"name" : "Fail2", "value" : 15},
            {"name" : "Fail3", "value" : 33},
            {"name" : "Fail4", "value" : 24},
            {"name" : "Fail5", "value" : 45},
            {"name" : "Fail6", "value" : 38}
         ],
            [
            {"name" : "Block1", "value" : 40},
            {"name" : "Block2", "value" : 30},
            {"name" : "Block3", "value" : 20},
            {"name" : "Block4", "value" : 15},
            {"name" : "Block5", "value" : 35},
            {"name" : "Block6", "value" : 47}
          ],
          [
                {"name" : "admin", "value" : 30},
                {"name" : "admin2", "value" : 12},
                {"name" : "admin3", "value" : 34},
                {"name" : "admin4", "value" : 26},
                {"name" : "admin5", "value" : 19},
                {"name" : "admin7", "value" : 49}
            ]
        ]



        if(this.callRef){
            this.setState({
                chart : new D3PieChart(this.callRef, dataValue)
            })
        }
    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        this.state.chart.updates(nextProps.Assignee)
    }
    

    render(){
        return (<div ref={this.setCallRef} style={{width:"1070px", height:"500px"}}>
                </div>)
    }
}

export default PieChartWrapper;
