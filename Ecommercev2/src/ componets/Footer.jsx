import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const FooterContainer = styled.footer`
  background: red;
  color: #ffffff;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  width: 100%;
  text-align: left;
  padding: 55px 50px;

  @media (max-width: 880px) {
    text-align: center;
    padding: 30px 20px;
  }
`;

const FooterLeft = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 40%;

  h3 {
    color: #ffffff;
    font: normal 36px 'Open Sans', cursive;
    margin: 0;

    span {
      color: lightseagreen;
    }
  }

  .footer-links {
    color: #ffffff;
    margin: 20px 0 12px;
    padding: 0;

    a {
      display: inline-block;
      line-height: 1.8;
      font-weight: 400;
      text-decoration: none;
      color: inherit;

      &:before {
        content: "|";
        font-weight: 300;
        font-size: 20px;
        left: 0;
        color: #fff;
        display: inline-block;
        padding-right: 5px;
      }

      &.link-1:before {
        content: none;
      }
    }
  }

  .footer-company-name {
    color: black;
    font-size: 14px;
    font-weight: normal;
    margin: 0;
  }

  @media (max-width: 880px) {
    width: 100%;
    margin-bottom: 20px;

    .footer-company-name {
      display: none;
    }
  }
`;

const FooterCenter = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 35%;

  div {
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    i {
      background-color: black;
      color: #ffffff;
      font-size: 25px;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      text-align: center;
      line-height: 42px;
      margin: 10px 15px;
      vertical-align: middle;

      &.fa-envelope {
        font-size: 17px;
        line-height: 38px;
      }
    }

    p {
      display: inline-block;
      color: #ffffff;
      font-weight: 400;
      vertical-align: middle;
      margin: 0;

      span {
        display: block;
        font-weight: normal;
        font-size: 14px;
        line-height: 2;
      }

      a {
        color: lightseagreen;
        text-decoration: none;
      }
    }
  }

  @media (max-width: 880px) {
    display: none;
  }
`;

const FooterRight = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 20%;

  .footer-company-about {
    line-height: 20px;
    color: white;
    font-size: 13px;
    font-weight: normal;
    margin: 0;

    span {
      display: block;
      color: black;
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 20px;
    }
  }

  .footer-icons {
    margin-top: 25px;

    a {
      display: inline-block;
      width: 35px;
      height: 35px;
      cursor: pointer;
      background-color: white;
      border-radius: 2px;
      font-size: 20px;
      color: black;
      text-align: center;
      line-height: 35px;
      margin-right: 3px;
      margin-bottom: 5px;

      &:hover {
        background-color: black;
        color: white;
      }
    }
  }

  @media (max-width: 880px) {
    width: 100%;
    margin-top: 20px;

    .footer-company-about {
      display: none;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLeft>
        <h3>For The Record</h3>
        <p className="footer-links">
          <Link to="/" className="link-1">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/contact">Contact</Link>
        
        </p>
        <p className="footer-company-name">For The Record © 2023</p>
      </FooterLeft>

      <FooterCenter>
        <div>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <p><span>123 Vinyl St.</span> Music City, USA</p>
        </div>
        <div>
          <FontAwesomeIcon icon={faPhone} />
          <p>+1 234 567 8901</p>
        </div>
        <div>
          <FontAwesomeIcon icon={faEnvelope} />
          <p><a href="mailto:support@fortherecord.com">support@fortherecord.com</a></p>
        </div>
      </FooterCenter>

      <FooterRight>
        <p className="footer-company-about">
          <span>About For The Record</span>
          For The Record is your one-stop shop for all things vinyl. Discover the rich, warm sound of vinyl records and find your soundtrack.
        </p>
        <div className="footer-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
          <a href="https://www.github.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
        </div>
      </FooterRight>
    </FooterContainer>
  );
};

export default Footer;
