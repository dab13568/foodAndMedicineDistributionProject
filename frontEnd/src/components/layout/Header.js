import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Logo from './partials/Logo';
import Button from "../elements/Button";
import LoginButton from "../elements/LoginButton";
import LogoutButton from "../elements/LogoutButton";
import AddUserButtonTemp from "../elements/addUserTempButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
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
                      <ul style={{listStyleType: "none"}}>
                        <li>
                          <div style={{marginTop: 40, marginLeft:450, top: 0,
                            left:0,
                            bottom: 0,
                            position:"absolute"}}>
                            <Link style={{color:"white"}} to="/contactManager" >
                              <FontAwesomeIcon icon={faComment} size={"2x"} />
                            </Link>
                          </div>
                          <div style={{marginTop: 50, marginLeft:50, top: 0,
                            left:0,
                            bottom: 0,
                            position:"absolute"}}>
                            <ReactRoundedImage  roundedColor="#ffffff" image={user.picture} roundedSize="6" imageWidth="127" imageHeight="127" />
                          </div>
                        </li>
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
                          <Link style={{color:"white"}} to="/MyDistribution" onClick={closeMenu}>My distribution addresses</Link>
                        </li>
                    )}

                    {!isLoading && isAuthenticated &&
                    (
                        <li>
                          <Link style={{color:"white"}} to="/ShowBlogs" onClick={closeMenu}>Administrative Summary</Link>
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