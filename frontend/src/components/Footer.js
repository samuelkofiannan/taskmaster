import React from 'react';
import './styles/Footer.css';

/**
 * Footer component to display the application footer.
 * @returns {JSX.Element}
 */
const Footer = () => {
  return (
    <footer className="footer">
      <p>TaskMaster. All rights reserved.</p>
      <p className="powered-by">
        <em>Powered by AfiK</em> <span className="copyright-logo">©</span>
      </p>
    </footer>
  );
};

export default Footer;
