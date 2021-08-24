import React from 'react';
import Header from '../components/layout/Header';
import HeaderUser from '../components/layout/HeaderUser';
import Footer from '../components/layout/Footer';

const LayoutUser = ({ children }) => (

  <>

    <HeaderUser navPosition="right" className="reveal-from-bottom site-content" />
    <main   >
      {children}
    </main>
    <Footer />
  </>
);

export default LayoutUser;