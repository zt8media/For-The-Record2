import React from 'react';
import PageLayout from './PageLayout';
// import contactImage from '../assets/contact.jpg'; // Add your own image

const Contact = () => {
  return (
    <PageLayout title="Contact Us" subtitle="We'd love to hear from you!">
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <br />
        <label>
          Message:
          <textarea name="message"></textarea>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </PageLayout>
  );
};

export default Contact; 
