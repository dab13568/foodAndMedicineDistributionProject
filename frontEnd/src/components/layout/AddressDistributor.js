import React, {Component, useState, useEffect} from "react";
import ReactTable from "react-table";
import Loc from "../../views/LocationIQ";
import Map from "../../views/Map";
//import "react-table/react-table.css";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import Button from "react-bootstrap/Button";

export default class ShowMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:"",
            addresses: [], //the orginals address data
            tableaddresses: [], //the address from the data to display in the table
            users: [], //the orginals userws data
            cities: [], //the list of all the cities that include in addresses
            selectedCity: "", //the city that the user select
            locations: [], //list of the cordinate of the addresses in the selected city
            group: [] //the location in groups after k-means
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }



    render (){
        return(
            <div style={{marginTop:200}}>
                <Container style={{width:"700px"}}>
                    <Row className="justify-content-md-center">
                        <input type="text" value={this.state.value} onChange={this.handleChange} />

                    </Row>
                    <Row className="justify-content-md-center">
                        <button></button>
                    </Row>
                    {/*<Row className="justify-content-md-center">*/}
                    {/*    <Map*/}
                    {/*        address={this.state.value}*/}
                    {/*    />*/}
                    {/*</Row>*/}

                </Container>
            </div>
        )
    }

}


//////////////////////////////////



