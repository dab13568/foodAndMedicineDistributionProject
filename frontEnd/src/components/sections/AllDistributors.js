import React, {useEffect, useState} from 'react';
import { SectionProps } from '../../utils/SectionProps';

import './AllDistributors.css';
import classNames from "classnames";
import {useAuth0} from "@auth0/auth0-react";
import {win} from "leaflet/src/core/Browser";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Button from '../../components/elements/Button';

import {
    SortableContainer,
    SortableElement,
    sortableHandle,
} from 'react-sortable-hoc';

// This holds a list of some fiction people
// Some  have the same name but different age and id



// const USERS = [
//     { id: 1, name: 'Andy', age: 32 },
//     { id: 2, name: 'Bob', age: 30 },
//     { id: 3, name: 'Tom Hulk', age: 40 },
//     { id: 4, name: 'Tom Hank', age: 50 },
//     { id: 5, name: 'Audra', age: 30 },
//     { id: 6, name: 'Anna', age: 68 },
//     { id: 7, name: 'Tom', age: 34 },
//     { id: 8, name: 'Tom Riddle', age: 28 },
//     { id: 9, name: 'Bolo', age: 23 },
// ];


const AllDistributors= ({
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
    const [USERS,setUSERS] = useState([])

    const [name, setName] = useState('');
    const [foundUsers, setFoundUsers] = useState(USERS);

    const filter = (e) => {
        const keyword = e.target.value;

        if (keyword !== '') {
            const results = USERS.filter((User) => {
                return User.name.toLowerCase().startsWith(keyword.toLowerCase()) || User.address.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            });
            setFoundUsers(results);
        } else {
            setFoundUsers(USERS);
            // If the text field is empty, show all users
        }

        setName(keyword);
    };



    const animatedComponents = makeAnimated();

    const { user } = useAuth0();
    const [showbutton,setShowButton]=useState(true)
    const [showLoading,setshowLoading]=useState(false)


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
            setUSERS(data);
            setFoundUsers(data)
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
    const [selected, setSelected] = useState([]);
    const [currentId, setCurrentId] = useState("");
    const [jsonUpdateDays,setjsonUpdateDays] = useState({});

    const onChange = selectedOptions => setSelected(selectedOptions)

    useEffect(() => {
        const daysArray = selected.filter(x => x!==undefined);
        const daysArrays = daysArray.map(x => x.value);

        if(currentId!=="")
            setjsonUpdateDays(prevPersonInfo => ({...prevPersonInfo, [currentId]: daysArrays}))

    }, [selected,currentId]);

    async function onClick()
    {
        setShowButton(false)
        setshowLoading(true)
        if(jsonUpdateDays!=={})
        {
            const answer=await fetch('/users/update-user',{
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


    return (
        <section
            {...props}
            className={outerClasses}
        >
            <div className="container-sm">
                <div className={innerClasses}>
                    <div >
                        {showbutton &&
                        <Button onClick={onClick} style={{marginRight:100,backgroundColor: "#6163ff",color: "white"}}>Save Changes</Button>
                        }
                        {showLoading &&
                        <span style={{color:"white"}} >Loading... </span>
                        }
                        <input
                            type="search"
                            value={name}
                            onChange={filter}
                            className="input"
                            placeholder="Filter"
                        />

                        <div className="user-list">
                        {foundUsers && foundUsers.length > 0 ? (
                            foundUsers.map((User) => (
                                <ul key={User.Id} className="user">
                                    <li >
                                        <span className="user-name">{User.name}  </span>
                                    </li>
                                    <li>
                                        <span className="user-id">  {User.address}</span>
                                    </li>

                                    <li>
                                        <span style={{color:"black"}} >Days work: </span>
                                        <Select style={{width:700}}
                                                components={animatedComponents}
                                                isMulti
                                                defaultValue={  User.daysInWeek.map(x=>options[x])}
                                                options={options}
                                                onChange={(e) => {
                                                    onChange(e);
                                                    setCurrentId(User.Id)
                                                }}
                                        />
                                    </li>
                                </ul>
                            ))
                        ) : (
                            <h1>No results found!</h1>
                        )}
                    </div>
                    </div>
                </div>
            </div>
        </section>
    )


}

export default AllDistributors;