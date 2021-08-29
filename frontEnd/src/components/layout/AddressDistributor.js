import React, {Component, useState, useEffect} from "react";
import Map from "../../views/Map";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {useAuth0} from "@auth0/auth0-react";
import { SectionProps } from '../../utils/SectionProps';
import Button from '../elements/Button';

import classNames from "classnames";

const propTypes = {
    ...SectionProps.types
}

const defaultProps = {
    ...SectionProps.defaults
}


const ShowMap = ({
                     className,
                     topOuterDivider,
                     bottomOuterDivider,
                     topDivider,
                     bottomDivider,
                     hasBgColor,
                     invertColor,
                     ...props
                 }) =>
{
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

    const {user}=useAuth0()
    const [tempValue,settempValue] = useState("");
    const [val,setvalue] = useState("הירדן,רמת גן");
    const [searchButton,setsearchButton] = useState(false);
    const [addAddressButton,setaddAddressButton] = useState(false);

    function handleChange(event)
    {
        settempValue(event.target.value);
    }
    function clicked()
    {
        setvalue(tempValue)
    }
    function SearchButton()
    {
        setsearchButton(true)
        setaddAddressButton(false)
        setvalue(tempValue)
    }
    function AddAddressButton()
    {
        setsearchButton(false)
        setaddAddressButton(true)
        setvalue(tempValue)
    }

    return(
        <section
            {...props}
            className={outerClasses}>

            <div className="container-sm">
                <div className={innerClasses}>
                    <div className="hero-content">
                        <h1 className="mt-0 mb-16 " >
                            Hello <span className="text-color-primary">{user.name}</span>
                        </h1>
                        <div className="container-xs">
                            <p className="m-0 mb-32 " >
                                Please insert a valid distribution address:
                            </p>
                        </div>
                        <div >
                            <Container style={{width:"700px"}}>
                                <Row className="justify-content-md-center">
                                    <input type="text"  onChange={handleChange} />
                                    <button><img style={{ width:20,height:20}} src={"https://www.pngitem.com/pimgs/m/47-474460_search-button-logo-png-transparent-png.png"} onClick={SearchButton}/></button>
                                </Row>


                                <Row className="justify-content-md-center">
                                    <Map
                                        userSub={user.sub}
                                        type={"Distributor"}
                                        address={val}
                                        phone={user.phone_number}
                                        name={user.name}
                                        SaveAddress={addAddressButton}
                                        searchButton={searchButton}
                                    />
                                </Row>
                                <Row className="justify-content-md-center">
                                    <Button onClick={AddAddressButton}> Save Address</Button>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )


}
export default ShowMap
