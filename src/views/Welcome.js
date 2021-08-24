import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import Testimonial from '../components/sections/Testimonial';
import Image from '../components/elements/Image'
import {useAuth0} from "@auth0/auth0-react";


const Welcome = () => {
    const { user,isAuthenticated } = useAuth0();


    // {
    //     if (isAuthenticated) {
    //         return (
    //             <>
    //                 <div className="card" style="width: 18rem;">
    //                     <Image className="card-img-top" src={user.picture} alt="Card image cap"/>
    //                     <div className="card-body">
    //                         <h5 className="card-title">{user.name}</h5>
    //                         <p className="card-text">{user.email}</p>
    //                     </div>
    //                 </div>
    //             </>
    //
    //         );
    //     }
    // }
      return (
        <>
          <Hero className="illustration-section-01" />
          <FeaturesTiles />
          <Testimonial topDivider />
        </>
      );
}

export default Welcome;