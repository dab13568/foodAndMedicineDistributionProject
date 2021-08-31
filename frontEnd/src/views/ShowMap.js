import React, {Component, useState, useEffect} from "react";
import ReactTable from "react-table";
import Map from "./mapClusterize";
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
        var data = {
            data: [[32.0683607,34.8285315],[32.0701262,34.8287886],[32.0662206,34.8240212],[32.078015,34.9098324],[32.0768029,34.9088009]],// קואורדינטות של כלל המיקומים לחלוקה
            k: 2 //מספר המחלקים
        };
        const [group,setGroup] = useState([])
        const [locations,setLocations] = useState({})
        useEffect(() => {

            setLocations(data.data)
        }, []);
function usersMatch(){
    var userAddr={1:[32.0683607,34.8285315],0:[32.0781672,34.9084098]}
    //console.log("group",group)
    let temp=group.map(x=>x.locations.centroid)
    console.log("temp-group",temp)
    var data={userAddr:userAddr,distAddresses:temp}
    fetch("/clusterize/matchUsers", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }).then(res => {
        res.json().then(value => {
            console.log("value",value);

            var arr = [];
            //var index = 0;
            /*for (let index in [0,1]) {

                //console.log("user is:    ", user);
                arr.push({user: index, locations: value[index]});
                //console.log("arr after push is:", arr);

            }
            //console.log("arr is   :", arr);
            setGroup(arr)
*/
        });
    });
}
        function click(){

        fetch("/clusterize", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then(res => {
            res.json().then(value => {
                //console.log(value[0]);
                var arr = [];
                //var index = 0;
                for (let index in [0,1]) {

                        //console.log("user is:    ", user);
                        arr.push({user: index, locations: value[index]});
                        //console.log("arr after push is:", arr);

                }
                //console.log("arr is   :", arr);
                setGroup(arr)

            });
        });
        }

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

                        <Map  locations={locations}
                                        group={group} />?
                        <button onClick={click}> click on me</button>
                        <button onClick={usersMatch}> click to match user</button>
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
