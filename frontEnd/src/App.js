import React, { useRef, useEffect } from 'react';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import {
    withRouter,
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import LayoutDefault from './layouts/LayoutDefault';
import LayoutManager from './layouts/LayoutManager';

import LayoutUser from './layouts/LayoutUser';

import Welcome from './views/Welcome';
import HelloUser from './components/sections/HelloUser';
import HelloManager from './components/sections/HelloManager';

import AddressDistributor from './components/layout/AddressDistributor';

import Home from './views/Home';
import AddDist from './views/addDistributor';
import ShowMap from './views/ShowMap';
import { useAuth0 } from "@auth0/auth0-react";


function App () {

  const childRef = useRef();

    useEffect(() => {
    document.body.classList.add('is-loaded')
    childRef.current.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, );


    const { isAuthenticated,user } = useAuth0();

    return (

    <ScrollReveal
      ref={childRef}
      children={() => (
          <Router>

              {isAuthenticated && (
                  <Switch>
                      <AppRoute exact path="/" component={HelloUser} layout={LayoutDefault} />
                      <AppRoute exact path="/ShowMap" component={ShowMap} layout={LayoutDefault} />
                      <AppRoute exact path="/AddAddress" component={AddressDistributor}  />
                      <AppRoute exact path="/Manager" component={HelloManager} layout={LayoutManager}  />
                  </Switch>
              )}
              {!isAuthenticated && (
                  <switch>
                      <AppRoute exact path="/" component={Welcome} layout={LayoutDefault} />
                  </switch>
              )}
          </Router>
      )} />
  );
}

export default App;