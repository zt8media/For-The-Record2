import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 200px;
  background-color: black;
  color: white;
  min-height: 100vh;
 
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: auto;
  padding: 30px;
  background-color: transparent;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    width: 175%;
  }
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 5px;
  border: 3px solid red;
  background-color: transparent;
  font-size: 16px;
  color:white;
 
`;

const Textarea = styled.textarea`
  margin-bottom: 15px;
  padding: 30px;
  border-radius: 5px;
  border: 3px solid red;
  background-color: transparent;
  font-size: 16px;
  color:White;
  
`;

const SubmitButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #ffffff;
  color: black;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(215, 70, 51);
  }

  &:active {
    background-color: rgb(240, 121, 105);
  }
`;

const ErrorMessage = styled.p`
  color: blue;
  font-size: 14px;
`;

const ContactHeader = styled.h1`
  font-size: 5rem; /* Header font size */
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size:2.5rem;
    text-align:center;
   }
`;

const ContactSubheader = styled.h4`
  font-size: 1.5rem; /* Subheader font size */
  margin-bottom: 40px;
  @media (max-width: 768px) {
   font-size:1rem;
   text-align:center;
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    const phoneRegex = /^[0-9\b]+$/;
    if (!formData.number.trim() || !phoneRegex.test(formData.number)) {
      errors.number = 'Valid number is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = 'Valid email is required';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Handle form submission
      console.log('Form submitted', formData);
      // Reset form
      setFormData({
        name: '',
        number: '',
        email: '',
        message: ''
      });
    }
  };

  return (
    <>
      <Navbar />
      <ContactContainer>
        <ContactHeader>Contact Us</ContactHeader>
        <ContactSubheader>Leave a message if you have any questions!</ContactSubheader>
        <ContactForm onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          <Input
            type="text"
            name="number"
            placeholder="Phone Number"
            value={formData.number}
            onChange={handleChange}
            required
          />
          {errors.number && <ErrorMessage>{errors.number}</ErrorMessage>}
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          <Textarea
            name="message"
            placeholder="Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />
          {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
          <SubmitButton type="submit">Submit</SubmitButton>
        </ContactForm>
      </ContactContainer>
      <Footer />
    </>
  );
};

export default Contact;
