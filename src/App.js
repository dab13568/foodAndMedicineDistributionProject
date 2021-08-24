import React, { useRef, useEffect } from 'react';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import {
    withRouter,
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views 
import Home from './views/Home';

//Add Distributor
import AddDist from './views/addDistributor';
import { useAuth0 } from "@auth0/auth0-react";


function App () {

  const childRef = useRef();



    useEffect(() => {
    document.body.classList.add('is-loaded')
    childRef.current.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, );







    return (
    <ScrollReveal
      ref={childRef}
      children={() => (
          <Router>
            <Switch>
              <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
              <AppRoute exact path="/AddDist" component={AddDist} layout={LayoutDefault} />

            </Switch>
          </Router>
      )} />
  );
}

export default App;