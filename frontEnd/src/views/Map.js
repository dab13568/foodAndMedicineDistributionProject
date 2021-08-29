import React, {Component } from "react";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import { useHistory } from "react-router-dom";

import Loc from "./LocationIQ";
import "./Map.css";
import getIcon from "./MapIcons";
import LocationIQ from 'react-native-locationiq';
import {win} from "leaflet/src/core/Browser";

export default class Maps extends Component {
  state = {
    lat: 31.776674,
    lng: 35.234329,
    zoom: 14,
    locations: [],
    group: [],
    activeMark: null,
    legalAddress:false,
    didOnce:false
  };



  async addUserWithAddress()
  {
    window.alert("in add user")
    const payload = { sub:this.props.userSub,type:this.props.type,address:this.props.address,phone:this.props.phone}
    const answer=await fetch('/users/add-user', {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });

    if(answer.status == 200)
    {
      window.alert("המשתמש נוסף בהצלחה")
      window.location.href= "/"
    }
    else
      window.alert("שגיאה בהוספת המשתמש")
  }



  async componentDidUpdate(prevProps)
  {
    if ((this.props.address && this.props.address !== prevProps.address))
    {
     this.state.legalAddress=false

      await Loc.search(this.props.address).then(json =>
      {
        this.setState({
          lat: json[0].lat,
          lng: json[0].lon
        })
        window.alert(this.props.userSub+"כתובת חוקית ")
        this.state.legalAddress = true;
        this.state.didOnce=false



      }).catch(error => window.alert("error"));


    }
    if(!this.state.legalAddress && this.props.SaveAddress && !this.state.didOnce)
    {
      this.state.didOnce=true
      window.alert("please enter valid address")

    }
    if(this.props.SaveAddress && this.state.legalAddress)
    {
      this.state.didOnce=true
      await this.addUserWithAddress()
    }

  }


  render() {
    try {
      return (
          <Map center={[this.state.lat, this.state.lng]} zoom={this.state.zoom}>
            <TileLayer
                attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {this.state.locations && this.state.group.length < 1 ? (
                this.state.locations.map(item => (
                    <Marker key={item[1]} position={item[0]}/>
                ))
            ) : (
                <div/>
            )}

            {console.log("state", this.state)}
            {this.state.group.length > 0 ? (
                this.state.group.map(item => (
                    <Marker
                        key={item.key}
                        position={item.cordinate}
                        icon={getIcon(item.groupKey)}
                        onClick={() => {
                          this.setState({
                            activeMark: item
                          });
                        }}
                    />
                ))
            ) : (
                <div/>
            )}

            {this.state.activeMark && (
                <Popup
                    position={this.state.activeMark.cordinate}
                    onClose={() => {
                      this.setState({
                        activeMark: null
                      });
                    }}
                >
                  <div>
              <span>
                {this.state.activeMark.user.firstName +
                " " +
                this.state.activeMark.user.lastName}
              </span>
                  </div>
                </Popup>
            )}
          </Map>
      );
    }
    catch (error){window.alert(error)}
  }
}

