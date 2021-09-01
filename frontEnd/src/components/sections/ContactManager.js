import React, {useEffect, useState} from 'react';
import { SectionProps } from '../../utils/SectionProps';

import './AllDistributors.css';
import classNames from "classnames";
import {useAuth0} from "@auth0/auth0-react";
import {win} from "leaflet/src/core/Browser";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Button from '../../components/elements/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from 'emailjs-com';

import {
    SortableContainer,
    SortableElement,
    sortableHandle,
} from 'react-sortable-hoc';
import SummaryManager from "./SummaryManager";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";

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


const ContactManager= ({
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

    let email="";
    const { user } = useAuth0();


    useEffect(() => {
        (async () => {

            const answer=await fetch('/users/get-manager',{
                method: "POST",
                body: "",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            const data=await answer.json();

            if(data !== null)
                email=data.email
        })();
    }, []);


    let sub=""
    let m=""


    //const [name,setName]=useState("")
    // const [fromName,setfromName]=useState("nn")
    // const [message,setMessage]=useState("hello")

    function setSubject(e)
    {
        sub=e.target.value
    }
    function setMessage(e)
    {
        m=e.target.value
    }
    async function sendEmail(e)
    {
        var x=
            {
                to_Email:"shlomichi1351@gmail.com",
                fromName:user.name,
                replay_email:user.email,
                subject:sub,
                message:m

            };
        console.log(m)
        e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it
        emailjs.send('service_9b6ys5k', 'template_o7pck3g', x,"user_BsJLAEXZWpCcOPEDkMlOg")
            .then((result) => {
                window.alert(result)
                window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
            }, (error) => {
                console.log(error.text);
            });
    }






    useEffect(() => {


    }, []);




    return (
        <section
            {...props}
            className={outerClasses}
        >
            <div className="container-xs" >
                <div className="hero-content ">

                    <div style={{marginTop:70
                    }} className="container-xs">
                        <h1  className="mt-0 mb-16 " data-reveal-delay="50">
                            Have a <span className="text-color-primary"> question?</span>
                        </h1>
                        <div className="container-xs">
                            <div style={{marginLeft: 280,marginTop:80
                            }} className="contact-form" >
                                <ul style={{listStyleType: "none",width:200}}>

                                    <li>
                                        <label>Subject</label>
                                        <input onChange={setSubject} type="text" name="subject" />
                                    </li>
                                    <li>
                                        <label>Message</label>
                                        <textarea onChange={setMessage} name="html_message" />
                                    </li>
                                    <li>
                                        <Button onClick={sendEmail} >Send to manager!</Button>

                                    </li>
                                </ul>
                            </div>
                            </div>
                        </div>
                    </div>

            </div>
        </section>
    )


}













// const contactManager= ({
//                            className,
//                            topOuterDivider,
//                            bottomOuterDivider,
//                            topDivider,
//                            bottomDivider,
//                            hasBgColor,
//                            invertColor,
//                            ...props
// }) => {
//     const outerClasses = classNames(
//         'hero section center-content',
//         topOuterDivider && 'has-top-divider',
//         bottomOuterDivider && 'has-bottom-divider',
//         hasBgColor && 'has-bg-color',
//         invertColor && 'invert-color',
//         className
//     );
//
//     const innerClasses = classNames(
//         'hero-inner section-inner',
//         topDivider && 'has-top-divider',
//         bottomDivider && 'has-bottom-divider'
//     );
//
//     const [message,setMessage]=useState("")
//     const [name, setName] = useState('');
//
//     function onChange(e)
//     {
//         setMessage(e.target.value)
//     }
//     function sendEmail(e) {
//         e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it
//
//         emailjs.sendForm('service_9b6ys5k', 'template_obq55ec', e.target, 'user_BsJLAEXZWpCcOPEDkMlOg')
//             .then((result) => {
//                 window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
//             }, (error) => {
//                 console.log(error.text);
//             });
//     }
//
//     //const { user } = useAuth0();
//
//
//
//
//
//
//     return (
//         <section
//             {...props}
//             className={outerClasses}
//         >
//
//             <div className="container-sm">
//                 <div className={innerClasses}>
//                     <div className="container-xs">
//                         <MDBContainer >
//                             <MDBRow>
//                                 <MDBCol md="50">
//                                     <p className="h4 text-center mb-4">Write the daily blog</p>
//                                     <label htmlFor="defaultFormContactSubjectEx" className="grey-text">
//                                         Subject
//                                     </label>
//                                     <input type="text" id="defaultFormContactSubjectEx" className="form-control" />
//                                     <br />
//                                     <label htmlFor="defaultFormContactMessageEx" className="grey-text">
//                                         Your message
//                                     </label>
//                                     <textarea  onChange={onChange} type="text" id="defaultFormContactMessageEx" className="form-control"  />
//                                     <div style={{marginTop:20}}>
//                                         <Button oc >Send Blog!</Button>
//
//                                     </div>
//                                 </MDBCol>
//                             </MDBRow>
//                         </MDBContainer>
//                     </div>
//
//                 </div>
//             </div>
//         </section>
//
//     )
//
//
// }
// contactManager.propTypes = propTypes;
// contactManager.defaultProps = defaultProps;
 export default ContactManager;