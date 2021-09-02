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
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import getIcon from "../../views/MapIcons";

const AddressesManagement= ({
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
                if(addressRec.distributor!=="" && addressRec.distributor!==undefined)
                    return addressRec.address.includes(keyword)||addressRec.distributor.toLowerCase().includes(keyword) ;
                else return addressRec.address.includes(keyword)
            });
            setfoundAddresses(results);
        } else {
            setfoundAddresses(addresses);
            // If the text field is empty, show all users
        }

        setsearchInput(keyword);
    };




    const [showbutton,setShowButton]=useState(true)
    const [showAddbutton,setShowAddButton]=useState(true)

    const [showLoading,setshowLoading]=useState(false)
    const [showAddLoading,setshowAddLoading]=useState(false)


    useEffect(() => {
        (async () => {
            const answer = await fetch('/addresses/get-all-addresses', {
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
                setAddresses(data);
                setfoundAddresses(data)

                let temp = []
                for( let i in data)
                {
                    temp.push(data[i].cordinate)
                }
                var Locations = [];
                if (temp && temp.length > 0)
                {
                    temp.forEach((item, i) => {
                        Locations.push([item, i]);
                    });
                    console.log("this is:", Locations);
                }
                setLocations(Locations)

            }

        })();
    }, []);


    const animatedComponents = makeAnimated();


    const [InputAddAddress,setInputAddAddress]=useState("")
    const [name, setName] = useState('');

    function addAddressInput(e)
    {
        setInputAddAddress(e.target.value)
        setName(e.target.value)
    }


    async function AddAddressClick()
    {

        setshowAddLoading(true)
        setShowAddButton(false)
        let valid=false
        let lat=""
        let lng=""
        await Loc.search(InputAddAddress).then(json =>
        {

            if(json!==null && json!== undefined)
            {
                lat=json[0].lat
                lng=json[0].lon
            }

            valid=true
            window.alert("כתובת חוקית  ")
        }).catch(error => window.alert("כתובת לא חוקית"));
        if(valid)
        {
            const payload={address:InputAddAddress,cordinate:[lat,lng]}
            const answer=await fetch('/addresses/add-address',{
                method: "POST",
                body:JSON.stringify(payload),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            if(answer.status===200)
            {
                window.alert("The address added!")
                window.location.reload()


            }
        }
        setshowAddLoading(false)
        setShowAddButton(true)
    }
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
    const [selected, setSelected] = useState([]);
    const onChange = selectedOptions => setSelected(selectedOptions)

    const [selectedType, setselectedType] = useState(-1);
    const onChangeType = Type => setselectedType(Type)

    const [currentId, setCurrentId] = useState("");
    const [currentIdType, setcurrentIdType] = useState("");

    const [jsonUpdateDays,setjsonUpdateDays] = useState({});
    const [jsonUpdateTypes,setjsonUpdateTypes] = useState({});

    useEffect(() => {
        const daysArray = selected.filter(x => x!==undefined);
        const daysArrays = daysArray.map(x => x.value);

        if(currentId!=="")
        {
            setjsonUpdateDays(prevPersonInfo => ({...prevPersonInfo, [currentId]: daysArrays}))
        }
        if(currentIdType!=="")
        {
            setjsonUpdateTypes(prevPersonInfo => ({...prevPersonInfo, [currentIdType]: selectedType}))
        }

    }, [selected,currentId,selectedType,currentIdType]);

    async function onClick()
    {
        setShowButton(false)
        setshowLoading(true)
        if(jsonUpdateTypes!=={})
        {
            const answer=await fetch('/addresses/update-addresses-types',{
                method: "POST",
                body: JSON.stringify(jsonUpdateTypes),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });

            setShowButton(true)
            setshowLoading(false)

            if(answer.status===200)
                window.alert("The changes were made successfully!")
            else
                window.alert("Error! the changes didnt save")
        }
        if(jsonUpdateDays!=={})
        {
            const answer=await fetch('/addresses/update-addresses',{
                method: "POST",
                body: JSON.stringify(jsonUpdateDays),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });

            setShowButton(true)
            setshowLoading(false)

            if(answer.status===200)
                window.alert("The changes were made successfully!")
            else
                window.alert("Error! the changes didnt save")


        }
    }

    const [locations,setLocations]=useState([])
    const [idAddress,setIdAddress]=useState("")
    useEffect(() => {
        (async () => {
            if(idAddress!=="")
            {
                const paylod={id:idAddress}
                const answer=await fetch('/addresses/delete-address',{
                    method: "POST",
                    body:JSON.stringify(paylod),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });
                const data = await answer.json();
                if(answer.status===200)
                {
                    window.alert("The address delete!")
                    window.location.reload()

                }
                else
                    window.alert("Error! the changes didnt save")
            }

        })();
    }, [idAddress]);



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
                                {showAddbutton &&
                                <Button onClick={AddAddressClick} style={{marginRight:30,backgroundColor: "#6163ff",color: "white"}}>Add</Button>
                                }
                                {showAddLoading &&
                                <span style={{color:"white"}} >Loading... </span>
                                }
                                <input
                                    type="search"
                                    value={name}
                                    onChange={addAddressInput}
                                    className="input"
                                    placeholder="Add address"
                                    style={{marginBottom:50,padding:"11px 15px",width:"300px"}}
                                />
                            </li>

                            <li>

                                <Map center={[32.0683607, 34.8285315]} zoom={8}>
                                    <TileLayer
                                        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    {locations && locations.length > 0 ? (
                                        locations.map((item) => (
                                            <Marker key={item[1]} position={item[0]} />
                                        ))
                                    ) : (
                                        <div />
                                    )}


                                </Map>
                            </li>


                            <li>

                                {showbutton &&
                                <Button onClick={onClick} style={{marginRight:100,backgroundColor: "#6163ff",color: "white"}}>Save Changes</Button>
                                }
                                {showLoading &&
                                <span style={{color:"white"}} >Loading... </span>
                                }
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
                                                    <Button ><img style={{width:40,height:40,marginRight:300}} src={delIcon} alt={delIcon}  onClick={()=>{setIdAddress(add._id)}} /></Button>
                                                    <span style={{color:"black"}} className="user-id">  {add.address}</span>

                                                </li>
                                                <li style={{marginTop:20}}>
                                                    <span style={{color:"black"}} >Days of division: </span>
                                                    <Select style={{width:700}}
                                                            components={animatedComponents}
                                                            isMulti
                                                            defaultValue={  add.daysInWeek.map(x=>options[x])}
                                                            options={options}
                                                            isDisabled={add.distributor!==""? true:false}

                                                            onChange={(e) => {
                                                                onChange(e);
                                                                setCurrentId(add._id)
                                                            }}
                                                    />
                                                </li>

                                                <li style={{marginTop:20}}>
                                                    <span style={{color:"black"}} >type of division: </span>
                                                    <Select style={{width:700}}

                                                            defaultValue={  types[add.type]}
                                                            options={types}
                                                            isDisabled={add.distributor!==""? true:false}
                                                            onChange={(e) => {
                                                                onChangeType(e);
                                                                setcurrentIdType(add._id)
                                                            }}
                                                    />
                                                </li>

                                                <li style={{marginTop:20}}>
                                                    <span style={{color:"black"}} >Distributor: </span>
                                                    <span style={{color:"black"}} >{add.distributor} </span>

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

export default AddressesManagement;