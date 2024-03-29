import React from 'react';
import Header from '../components/layout/HeaderManager';
import Footer from '../components/layout/Footer';

const LayoutManager = ({ children }) => (

    <>
        <Header  navPosition="right" className="reveal-from-bottom" />
        <main  className="site-content">
            {children}
        </main>
        <Footer />
    </>
);

export default LayoutManager;