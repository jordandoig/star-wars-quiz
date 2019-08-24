import React from 'react';

const Footer = () => (
  <footer className='footer centeredContainer'>
    <div className='link-box'>
      <a target='_blank' href='https://swapi.co/'>Star Wars API</a>
      <a target='_blank' href='https://developers.giphy.com/docs/api/'>Giphy API</a>
    </div>
    <div className='disclaimer-box'>
      <p>All content and materials used here are for educational purposes only. The developer does not assert possession of any assets displayed here. Please see API documentation linked above for details concerning the assets found here.</p>
    </div>
  </footer>
);

export default Footer;
