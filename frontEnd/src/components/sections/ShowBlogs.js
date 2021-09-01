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

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';



const ShowBlogs= ({
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
        return addressRec.date.includes(keyword) || addressRec.subject.includes(keyword);
        // Use the toLowerCase() method to make it case-insensitive
      });
      setfoundAddresses(results);
    } else {
      setfoundAddresses(addresses);
      // If the text field is empty, show all users
    }

    setsearchInput(keyword);
  };



  useEffect(() => {
    (async () => {
      const answer = await fetch('/blogs/get-all-blogs', {
        method: "POST",
        body:"",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const data = await answer.json();
      console.log(data)
      if (data !== null)
      {
        setAddresses(data);
        setfoundAddresses(data)
      }

    })();
  }, []);


  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  const classes = useStyles();


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
                    <ul style={{ listStyle: "none"}}>
                      <li>
                    {foundAddresses && foundAddresses.length > 0 ? (
                        foundAddresses.map((add) => (
                            <Card style={{marginBottom:30}} className={classes.root}>
                              <CardContent>
                                <Typography variant="body2" component="p">
                                  {add.date}
                                </Typography>
                                <h2 style={{color:"dimgray"}} gutterBottom>
                                  {add.subject}
                                </h2>
                                <h4 style={{color:"dimgray"}} gutterBottom>
                                  {add.message}
                                </h4>

                              </CardContent>

                            </Card>

                            // <ul  className="user">
                            //
                            //   <li>
                            //     <Button ><img style={{width:40,height:40,marginRight:300}} src={delIcon} alt={delIcon}  onClick={()=>{setIdAddress(add._id)}} /></Button>
                            //     <span style={{color:"black"}} className="user-id">  {add.address}</span>
                            //
                            //   </li>
                            //
                            //
                            //
                            // </ul>
                        ))
                    ) : (
                        <h1>No results found!</h1>
                    )}
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>





            </div>
          </div>
        </div>
      </section>
  )


}

export default ShowBlogs;