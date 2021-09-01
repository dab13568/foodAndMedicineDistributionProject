import React, {useEffect, useState} from 'react';
import { SectionProps } from '../../utils/SectionProps';

import './AllDistributors.css';
import classNames from "classnames";
import {useAuth0} from "@auth0/auth0-react";
import {win} from "leaflet/src/core/Browser";
import Button from '../elements/Button';
import delIcon from '../../../src/assets/images/delIcon.png'
import Loc from "../../views/LocationIQ";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const AddressDistributor= ({
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
    const [addresses,setAddresses] = useState([])
    const [foundAddresses, setfoundAddresses] = useState(addresses);


    const [searchInput, setsearchInput] = useState('');
    const filter = (e) => {
        const keyword = e.target.value;

        if (keyword !== '') {
            const results = addresses.filter((addressRec) => {
                return addressRec.address.includes(keyword) ;
                // Use the toLowerCase() method to make it case-insensitive
            });
            setfoundAddresses(results);
        } else {
            setfoundAddresses(addresses);
            // If the text field is empty, show all users
        }

        setsearchInput(keyword);
    };




    const { user } = useAuth0();

    const payload={sub:user.sub}

    useEffect(() => {
        (async () => {
            const answer = await fetch('/users/get-user', {
                method: "POST",
                body:JSON.stringify(payload),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            const data = await answer.json();
            console.log("data: ",data.addressesForDistribution)
            if (data!==undefined)
            {
                console.log(data)
                const payload={addresses:data.addressesForDistribution}
                const answer = await fetch('/addresses/get-all-addresses-with-id', {
                    method: "POST",
                    body:JSON.stringify(payload),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });
                const dataAddresses = await answer.json();

                console.log("kuku",dataAddresses)

                let addressesData=[]
                for( let i in dataAddresses)
                {
                    addressesData.push(dataAddresses[i][0])
                }
                setAddresses(addressesData)
                setfoundAddresses(addressesData)
            }

        })();
    }, []);






    const options = [
        { value: 0, label: 'Sunday' },
        { value: 1, label: 'Monday' },
        { value: 2, label: 'Tuesday' },
        { value: 3, label: 'Wednesday' },
        { value: 4, label: 'Thursday' },
        { value: 5, label: 'Friday' }
    ]

    const types = [
        { value: 0, label: 'Food' },
        { value: 1, label: 'Medicines' },
        { value: 2, label: 'Other' }
    ]





    return (
        <section
            {...props}
            className={outerClasses}
        >
            <div className="container-sm">
                <div className={innerClasses}>
                    <div >
                        <ul style={{ listStyle: "none"}}>

                            <li>
                                <input
                                    type="search"
                                    value={searchInput}
                                    onChange={filter}
                                    className="input"
                                    placeholder="Filter"
                                    style={{padding:"5px 15px",width:"300px"}}
                                />
                            </li>
                            <li>
                                <div className="user-list">
                                    {foundAddresses && foundAddresses.length > 0 ? (
                                        foundAddresses.map((add) => (
                                            <ul  className="user">

                                                <li>
                                                    <span style={{color:"black"}} className="user-id">  {add.address}</span>

                                                </li>
                                                <li style={{marginTop:20}}>
                                                    <span style={{color:"black"}} >Days of division: </span>

                                                    <Select style={{width:700}}
                                                            isMulti
                                                            isDisabled={true}
                                                            defaultValue={  add.daysInWeek.map(x=>options[x])}
                                                            options={options}

                                                    />
                                                </li>

                                                <li style={{marginTop:20}}>
                                                    <span style={{color:"black"}} >type of division: </span>
                                                    <Select style={{width:700}}
                                                            defaultValue={  types[add.type]}
                                                            options={types}
                                                            isDisabled={true}

                                                    />
                                                </li>
                                            </ul>
                                        ))
                                    ) : (
                                        <h1>No results found!</h1>
                                    )}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddressDistributor;