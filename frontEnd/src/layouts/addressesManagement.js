import React, {Component, useState, useEffect} from "react";
import ReactTable from "react-table";
import Loc from "../../views/LocationIQ";
import Map from "../../views/Map";
//import "react-table/react-table.css";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import {useAuth0} from "@auth0/auth0-react";
import {useHistory} from "react-router";

