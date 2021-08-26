import React, { useEffect } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import {useAuth0} from "@auth0/auth0-react";

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const HelloManager = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );


  const { user } = useAuth0();


  return (
    <section
      {...props}
      className={outerClasses}
    >

      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 " data-reveal-delay="50">
              Welcome back <span className="text-color-primary">{user.name}!</span>
            </h1>
            <div className="container-xs">
              <p className="m-0 mb-32 " data-reveal-delay="50">
                As a manager, you can see the details of the distributors, place different distribution addresses, get optimal distribution areas, etc ...                </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

HelloManager.propTypes = propTypes;
HelloManager.defaultProps = defaultProps;

export default HelloManager;