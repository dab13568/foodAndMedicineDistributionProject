import React from 'react';
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import Testimonial from '../components/sections/Testimonial';
import Image from '../components/elements/Image'
import LogoutButton from '../components/elements/LogoutButton'
 import {useAuth0} from "@auth0/auth0-react";

const Home = () => {
    const { user,isAuthenticated } = useAuth0();

    return (
        <>
            <Hero className="illustration-section-01" />
            <FeaturesTiles />
            <Testimonial topDivider />
        </>
    );
}


export default Home;