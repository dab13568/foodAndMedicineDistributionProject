import React, { useEffect,Fragment  } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import {useAuth0} from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const SummaryManager = ({
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




  return (
      <section
          {...props}
          className={outerClasses}
      >

        <div className="container-sm">
          <div className={innerClasses}>
            <div className="container-xs">
              <MDBContainer >
                <MDBRow>
                  <MDBCol md="50">
                      <p className="h4 text-center mb-4">Write the daily blog</p>
                      <label htmlFor="defaultFormContactSubjectEx" className="grey-text">
                        Subject
                      </label>
                      <input type="text" id="defaultFormContactSubjectEx" className="form-control" />
                      <br />
                      <label htmlFor="defaultFormContactMessageEx" className="grey-text">
                        Your message
                      </label>
                      <textarea type="text" id="defaultFormContactMessageEx" className="form-control" rows="3" />
                      <div style={{marginTop:20}}>
                        <Button >Send Blog!</Button>

                      </div>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </div>

          </div>
        </div>
      </section>

  );
}

SummaryManager.propTypes = propTypes;
SummaryManager.defaultProps = defaultProps;

export default SummaryManager;