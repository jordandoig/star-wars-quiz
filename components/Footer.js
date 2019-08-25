import React from 'react';
const SW_API_TEXT = 'Star Wars API';
const GP_API_TEXT = 'Giphy API';
const DISCLAIMER_TEXT = 'All content and materials used here are for educational purposes only. The developer does not assert possession of any assets displayed here. Please see API documentation linked above for details concerning the assets found here.';

const Footer = () => (
  <footer className='footer centeredContainer'>
    <div className='link-box'>
      <a target='_blank' href='https://swapi.co/'>{SW_API_TEXT}</a>
      <a target='_blank' href='https://developers.giphy.com/docs/api/'>{GP_API_TEXT}</a>
    </div>
    <div className='disclaimer-box'>
      <p>{DISCLAIMER_TEXT}</p>
    </div>
  </footer>
);

export default Footer;
