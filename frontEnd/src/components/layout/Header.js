import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Logo from './partials/Logo';
import Button from "../elements/Button";
import LoginButton from "../elements/LoginButton";
import LogoutButton from "../elements/LogoutButton";
import {useAuth0} from "@auth0/auth0-react";
import ReactRoundedImage from "react-rounded-image";


const propTypes = {
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool
}

const defaultProps = {
  navPosition: '',
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false
}

const Header = ({
  className,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  ...props
}) => {

  function verify(email, callback) {
    // This script should mark the current user's email address as verified in
    // your database.
    // It is executed whenever a user clicks the verification link sent by email.
    // These emails can be customized at https://manage.auth0.com/#/emails.
    // It is safe to assume that the user's email already exists in your database,
    // because verification emails, if enabled, are sent immediately after a
    // successful signup.
    //
    // There are two ways that this script can finish:
    // 1. The user's email was verified successfully
    //     callback(null, true);
    // 2. Something went wrong while trying to reach your database:
    //     callback(new Error("my error message"));
    //
    // If an error is returned, it will be passed to the query string of the page
    // where the user is being redirected to after clicking the verification link.
    // For example, returning `callback(new Error("error"))` and redirecting to
    // https://example.com would redirect to the following URL:
    //     https://example.com?email=alice%40example.com&message=error&success=false

  console.log("in header callback")
    const msg = 'dev-qoc-7zii.us.auth0.com ' +
        'at https://manage.auth0.com/#/connections/database';
    return callback(new Error(msg));
  }
  const [isActive, setIsactive] = useState(false);

  const nav = useRef(null);
  const hamburger = useRef(null);

  useEffect(() => {
    isActive && openMenu();
    document.addEventListener('keydown', keyPress);
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('keydown', keyPress);
      document.removeEventListener('click', clickOutside);
      closeMenu();
    };
  });

  const openMenu = () => {
    document.body.classList.add('off-nav-is-active');
    nav.current.style.maxHeight = nav.current.scrollHeight + 'px';
    setIsactive(true);
  }

  const closeMenu = () => {
    document.body.classList.remove('off-nav-is-active');
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  }


  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  }

  const clickOutside = (e) => {
    if (!nav.current) return
    if (!isActive || nav.current.contains(e.target) || e.target === hamburger.current) return;
    closeMenu();
  }

  const classes = classNames(
    'site-header',
    bottomOuterDivider && 'has-bottom-divider',
    className
  );
  const { loginWithRedirect,isAuthenticated,isLoading,user } = useAuth0();


  return (
    <header
      {...props}
      className={classes}
    >
      <div className="container">
        <div className={
          classNames(
            'site-header-inner',
            bottomDivider && 'has-bottom-divider'
          )}>

          {!isAuthenticated&&(
              <Logo />
          )}

          {!hideNav &&
            <>
              <button
                ref={hamburger}
                className="header-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
              >
                <span className="screen-reader">Menu</span>
                <span className="hamburger">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
              <nav
                ref={nav}
                className={
                  classNames(
                    'header-nav',
                    isActive && 'is-active'
                  )}>
                <div className="header-nav-inner">

                  {isAuthenticated&&(
                      <ul style={{marginTop: 27, marginLeft:27, top: 0,

                        left:0,
                        bottom: 0,
                        position:"absolute"}}>
                          <ReactRoundedImage  roundedColor="#ffffff" image={user.picture} roundedSize="6" imageWidth="127" imageHeight="127" />

                      </ul>


                    )}

                  <ul className={
                    classNames(
                      'list-reset text-xs',
                      navPosition && `header-nav-${navPosition}`
                    )}>
                    {!isLoading && isAuthenticated &&
                    (

                        <li>
                          <Link style={{color:"white"}} to="/ShowMap" >Future Divisions</Link>
                        </li>

                    )}
                    {!isLoading && isAuthenticated &&
                    (

                        <li>
                          <Link style={{color:"white"}} to="/SuccessfullyDistributed" onClick={closeMenu}>Successfully distributed</Link>
                        </li>

                    )}

                    {!isLoading && isAuthenticated &&
                    (

                        <li>
                          <Link style={{color:"white"}} to="/AdministrativeSummary" onClick={closeMenu}>Administrative Summary</Link>
                        </li>

                    )}

                    <li >
                      <LoginButton/>
                      <LogoutButton/>

                    </li>

                  </ul>
                </div>
              </nav>
            </>}
        </div>
      </div>

    </header>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;