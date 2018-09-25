import React from 'react';
import './Sidebar.css';
import PropTypes from 'prop-types';
import CurrentHours from './CurrentHours';

const Sidebar = (props) => {
  const { info } = props;

  return (
    <div id="Sidebar">
      <div className="sidebar-lines">
        <img style={{ marginRight: '20px' }} src={'https://s3.us-east-2.amazonaws.com/zagat-fec/webpImages/hours.webp'} alt="hours" />
        <div className="sidebar-text">
          <CurrentHours times={info.times} />
        </div>
      </div>
      <div className="sidebar-lines">
        <img style={{ marginLeft: 2 }} src={'https://s3.us-east-2.amazonaws.com/zagat-fec/webpImages/location.webp'} alt="location" />
        <div className="sidebar-text">
          {info.location ? info.location.address : 'Loading'}
          , San Francisco, CA 94112, USA
        </div>
      </div>
      <div className="sidebar-lines">
        <img src={'https://s3.us-east-2.amazonaws.com/zagat-fec/webpImages/phone.webp'} alt="phone" />
        <div className="sidebar-text">
          {info.phone ? `(${info.phone.slice(0, 3)}) ${info.phone.slice(4)}` : 'Loading'}
        </div>
      </div>
      <div className="sidebar-lines">
        <img style={{ marginRight: '20px' }} src={'https://s3.us-east-2.amazonaws.com/zagat-fec/webpImages/website.webp'} alt="website" />
        <div className="sidebar-text">
          {info.website}
        </div>
      </div>
      <div className="sidebar-lines">
        <img style={{ marginLeft: 2 }} src={'https://s3.us-east-2.amazonaws.com/zagat-fec/webpImages/directions.webp'} alt="directions" />
        <div className="sidebar-text">
          Get Directions
        </div>
      </div>
      <iframe 
        id="map" 
        src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJa2U7loWAhYARXXIPjJLMNcM&key=AIzaSyDGPFOU4mcUagfV6guERgET9DazUiwFAgo" 
        allowFullScreen>
      </iframe>

    </div>
  );
};

Sidebar.propTypes = {
  info: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    location: PropTypes.shape({
      address: PropTypes.string.isRequired,
      neighborhood: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Sidebar;
