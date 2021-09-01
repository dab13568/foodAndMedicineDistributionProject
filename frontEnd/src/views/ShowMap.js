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
import data from "bootstrap/js/src/dom/data";

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
        const [addressesData,setAddressesData]=useState([])
        const [users,setUsers] = useState([])
        const [group,setGroup] = useState([])
        const [locations,setLocations] = useState({})


        useEffect(() => {
            (async () => {
                const answer = await fetch('/users/get-all-users', {
                    method: "POST",
                    body:"",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });
                const data = await answer.json();
                if (data !== null)
                {
                    setUsers(data)
                }
                const answer1 = await fetch('/addresses/get-all-addresses', {
                    method: "POST",
                    body:"",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });

                const data1 = await answer1.json();
                if (data1 !== null)
                {
                    setAddressesData(data1)
                    setLocations(data1.map(x=>x.cordinate))
                }
            })();
        }, []);


async function usersMatch(){
    //var userAddr={1:[32.0683607,34.8285315],0:[32.0781672,34.9084098]}
    console.log("group",group)
    let temp=group.map(x=>[x.locations.centroid,x.locations.cluster])

    var dataCentroid={users:users,distAddresses:temp}
    fetch("/clusterize/matchUsers", {
        method: "POST",
        body: JSON.stringify(dataCentroid),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }).then(res => {
        res.json().then(value => {

            console.log("value", data);
            fetch("/users/updateUsersAddresses", {
                method: "POST",
                body: JSON.stringify(value),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }).then(res => {
                res.json().then(value => {
                    window.alert("user updated")
                })
            })

        })});


}
        function click(){
        console.log("locations",locations)
        var data={data: locations,k:users.length}
        console.log("cordinates",data)
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
                //console.log("group",arr)
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
