import React, {Component} from "react";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import Loc from "./LocationIQ";
import "./Map.css";
import getIcon from "./MapIcons";

export default class Maps extends Component {
  state = {
    lat: 31.776674,
    lng: 35.234329,
    zoom: 14,
    locations: [],
    group: [],
    activeMark: null
  };

  componentDidMount = () => {
    /*console.log(this.props.address)
    Loc.search(this.props.address).then(json => {
      if (json[0].error ==="Unable to geocode")
         window.alert("illegal address");
      else
        this.setState({
          lat: json[0].lat,
          lng: json[0].lon
        })
            //console.log("lat: "+this.state.lat+"lng: "+this.state.lng)

    });

    var locations = [];
    console.log(this.props);
    if (this.props.locations && this.props.locations.length > 0) {
      this.props.locations.forEach((item, i) => {
        locations.push([item, i]);
      });
      console.log("this is:", locations);
    }
    this.setState({
      locations: locations
    });*/
  };

  componentDidUpdate(prevProps) {
      try {

        if (this.props.address && this.props.address !== prevProps.address) {

          Loc.search(this.props.address).then(json => {
            console.log("-------------------")
            if (json["code"] === "4")
              window.alert("illegal address");
            if (json[0].error === "Unable to geocode")
              window.alert("illegal address");
            this.setState({
              lat: json[0].lat,
              lng: json[0].lon
            })
          })
        }
      }
      catch (error){
          window.alert("illegal address")
        }


        //var arr = [];*/
      /*this.props.group.map((group, j) =>
          group.locations.cluster.forEach((item, i) => {
          arr.push({
            cordinate: item,
            key: group.locations.clusterInd[i],
            groupKey: j,
            user: group.user
          });
          return;
        })
      );*/
      /*this.setState({
        lat: this.props.lat,
        lng: this.props.lng
      });*/


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

