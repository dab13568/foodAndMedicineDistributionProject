import React, {Component, useState, useEffect} from "react";
import ReactTable from "react-table";
import Map from "./Map";
//import "react-table/react-table.css";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import {SectionProps} from "../utils/SectionProps";
import classNames from "classnames";

const ShowMap =
    ({
         className,
         topOuterDivider,
         bottomOuterDivider,
         topDivider,
         bottomDivider,
         hasBgColor,
         invertColor,
         ...props
     }) => {

    const outerClasses = classNames(
        'hero section center-content',
        topOuterDivider && 'has-top-divider',
        bottomOuterDivider && 'has-bottom-divider',
        hasBgColor && 'has-bg-color',
        invertColor && 'invert-color',
        className
    );

    const innerClasses = classNames(
        'hero-inner section-inner',
        topDivider && 'has-top-divider',
        bottomDivider && 'has-bottom-divider'
    );

    return(
        <section
            {...props}
            className={outerClasses}>

            <div className="container-sm">
                <div className={innerClasses}>
                    <div className="hero-content">
                        <h1 className="mt-0 mb-16 ">
                            Welcome back <span className="text-color-primary">hello!</span>
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ShowMap
/*export default class ShowMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: [], //the orginals address data
            tableaddresses: [], //the address from the data to display in the table
            users: [], //the orginals userws data
            cities: [], //the list of all the cities that include in addresses
            selectedCity: "", //the city that the user select
            locations: [], //list of the cordinate of the addresses in the selected city
            group: [] //the location in groups after k-means
        };
    }


render (){
        return(
            <div style={{marginTop:200}}>
            <Container style={{width:"700px"}}>
                <Row className="justify-content-md-center">
                <Map
                    city={this.state.selectedCity}
                    locations={this.state.locations}
                    group={this.state.group}
                />
                </Row>
            </Container>
            </div>
        )
    }

}

 */
