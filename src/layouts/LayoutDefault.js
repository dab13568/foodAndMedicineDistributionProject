import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const LayoutDefault = ({ children }) => (
  <>
    <Header style={{backgroundColor:"#151719"}} navPosition="right" className="reveal-from-bottom" />
    <main style={{marginTop:50,marginBottom:40}}  className="site-content">
      {children}
    </main>
    <Footer style={{backgroundColor:"#151719"}} />
  </>
);

export default LayoutDefault;  