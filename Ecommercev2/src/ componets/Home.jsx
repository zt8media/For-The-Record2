import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import backgroundVideo from '../assets/record-background.mp4';
import styled from 'styled-components';
import Slider from './Slider';
import Footer from './Footer';

const Showcase = styled.section`
  position: relative;
  max-width: 100%;
  min-height: 100vh;
  padding: 100px;
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: left;
  background-color: black;

  @media (max-width: 768px) {
    padding: 50px; /* Reduced padding for smaller screens */
  }
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;

  @media (max-width: 768px) {
    display: none; /* Hide video on mobile devices */
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const TextContainer = styled.div`
  z-index: 10;
`;

const Title = styled.h2`
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 100px;

  @media (max-width: 768px) {
    font-size: 60px; /* Smaller font size for mobile */
    text-align: center;
  }
  strong {
    color: red; /* Specific style for 'Your' */
  }
`;

const Subtitle = styled.h3`
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 45px;

  @media (max-width: 768px) {
    font-size: 50px; /* Smaller font size for mobile */
    text-align: center;
  }

  strong {
    color: red; /* Specific style for 'Your' */
  }
`;

const Button = styled.button`
  width: 30vh;
  height: 10vh;
  font-size: 25px;
  border-radius: 5px;
  text-decoration: none;
  background-color: #ffffffcc;
  border: none;
  box-shadow: black 4mm 4mm 4mm;
  margin: 20px;
  margin-top: 40px;
  cursor: pointer;

  &:hover {
    background-color: rgb(215, 70, 51);
  }

  &:active {
    background-color: rgb(240, 121, 105);
  }

  @media (max-width: 768px) {
    width: 90%; /* Full width buttons on mobile */
    margin: 30px auto; /* Centered and with reduced margin */
    display: block; /* Stack buttons vertically */
  }
`;

const Middlesecton = styled.section`
  background-color: ${(props) =>
    props.varient === 'middleSectionBlack' ? 'black' : 'red'};
  max-width: 100%;
  height: auto;
  padding: 40px;
`;
const HomeCard = styled.div`
  height: auto;
  width: 50%;
  padding: 10px;
  border-radius: 15px;
  border: solid black 5px;
  background-color: white;
  cursor: pointer;
  box-shadow: 14px 12px 13px 8px rgba(0, 0, 0, 0.83);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    width: 90%;
    height: auto;
  }
`;
const HomeCardContent = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  margin-top: 10px;

  @media (min-width: 769px) {
    display: block; /* Ensure content is always visible on larger screens */
  }
`;

const DisplayFlex = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  max-width: 100%;
  gap: 50px;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack items vertically */
    align-items: center;
  }
`;

const CenterHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => (props.varient === 'MainHeader' ? '60px' : '30px')};
  padding: 20px;
  margin-bottom:10px;
  color: ${(props) => (props.varient === 'White' ? '#FFFFFF' : '#000000')};
  text-decoration: ${(props) => (props.underline === 'Underlined' ? 'none': 'underline' )};
  text-underline-offset: 0.5em;
`;

const StyledParagraph = styled.p`
  font-size: 40px;
  line-height: 1.5;
  color: #333;
  font-weight: 400;
  align-items:center;
  text-align:center;
  

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Home = () => {
  const [isWhoWeAreOpen, setIsWhoWeAreOpen] = useState(false);
  const [isMissionOpen, setIsMissionOpen] = useState(false);

  return (
    <>
      <Navbar />
      <Showcase>
        <BackgroundVideo src={backgroundVideo} muted loop autoPlay />
        <Overlay />
        <TextContainer>
          <Title>For The <strong>Record</strong></Title>
          <Subtitle>
            Find <strong>Your</strong> Soundtrack.
          </Subtitle>
          <Link to="/shop">
            <Button>Shop Now</Button>
          </Link>
          <Link to="/contact">
            <Button>Contact Us</Button>
          </Link>
        </TextContainer>
      </Showcase>
      <Middlesecton>
        <CenterHeader varient="MainHeader" underline="Underlined">
          <h1>About Us</h1>
        </CenterHeader>

        <DisplayFlex>
          <HomeCard onClick={() => setIsWhoWeAreOpen(!isWhoWeAreOpen)}>
            <CenterHeader>
              <h1>Who We Are</h1>
            </CenterHeader>
            <HomeCardContent isOpen={isWhoWeAreOpen}>
              <StyledParagraph>
                At For The Record, we are passionate about vinyl records. Our
                mission is to bring the rich, warm sound of vinyl back to
                music lovers everywhere. With a curated collection of records,
                we strive to provide a nostalgic listening experience that
                digital formats just can't match.
              </StyledParagraph>
            </HomeCardContent>
          </HomeCard>

          <HomeCard onClick={() => setIsMissionOpen(!isMissionOpen)}>
            <CenterHeader>
              <h1>Mission</h1>
            </CenterHeader>
            <HomeCardContent isOpen={isMissionOpen}>
              <StyledParagraph>
                Our mission is to connect music enthusiasts with the timeless
                appeal of vinyl records. We aim to provide a diverse selection
                of albums, ensuring that every customer can find their
                soundtrack. Join us in celebrating the art of analog music.
              </StyledParagraph>
            </HomeCardContent>
          </HomeCard>
        </DisplayFlex>
      </Middlesecton>

      <Middlesecton varient="middleSectionBlack">
        <CenterHeader varient="White">
          <h1>Top Vinyls of the Week</h1>
        </CenterHeader>

        <Slider />
      </Middlesecton>

      <Footer />
    </>
  );
};

export default Home;
