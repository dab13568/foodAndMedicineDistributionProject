import React, { useRef, useEffect } from 'react';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import {
    withRouter,
    BrowserRouter as Router,
    Switch,

} from "react-router-dom";

import LayoutDefault from './layouts/LayoutDefault';
import LayoutManager from './layouts/LayoutManager';

import LayoutUser from './layouts/LayoutUser';

import Welcome from './views/Welcome';
import HelloUser from './components/sections/HelloUser';
import HelloManager from './components/sections/HelloManager';
import AllDistributors from './components/sections/AllDistributors';
import ContactManager from './components/sections/ContactManager';

import SummaryManager from './components/sections/SummaryManager';
import AddressesDistributor from './components/sections/AddressesDistributor';

import AddressesManagement from './components/sections/addressesManagement';
import ShowBlogs from './components/sections/ShowBlogs';
import AddressDistributor from './components/layout/AddressDistributor';



import Home from './views/Home';
import ShowMap from './views/ShowMap';

import { useAuth0 } from "@auth0/auth0-react";


function App () {

  const childRef = useRef();

    useEffect(() => {
    document.body.classList.add('is-loaded')
    childRef.current.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, );


    const { isAuthenticated } = useAuth0();


    return (

    <ScrollReveal
      ref={childRef}
      children={() => (
          <Router>

              {isAuthenticated && (
                  <Switch>
                      <AppRoute exact path="/" component={HelloUser} layout={LayoutDefault} />
                      <AppRoute exact path="/SummaryConclusionManager" component={SummaryManager} layout={LayoutManager} />
                      <AppRoute exact path="/OptimalDistribution" component={ShowMap}   layout={LayoutManager}/>
                      <AppRoute exact path="/Manager" component={HelloManager} layout={LayoutManager}  />
                      <AppRoute exact path="/DistributorsDetails" component={AllDistributors} layout={LayoutManager}  />
                      <AppRoute exact path="/AddressesDistribution" component={AddressesManagement} layout={LayoutManager}  />
                      <AppRoute exact path="/MyDistribution" component={AddressesDistributor} layout={LayoutDefault}  />
                      <AppRoute exact path="/contactManager" component={ContactManager} layout={LayoutDefault}  />
                      <AppRoute exact path="/ShowBlogs" component={ShowBlogs} layout={LayoutDefault}  />
                      <AppRoute exact path="/AddAddress" component={AddressDistributor}  />

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