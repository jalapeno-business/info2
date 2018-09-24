import React from 'react';
import PropTypes from 'prop-types';
import './Hours.css';

const Hours = (props) => {
  const { day, businessHours, currDay } = props;
  const openHours = (
    <div className="hours">
      <span className="text">
        {day}
      </span>
      <span id="divider"></span>
      <span className="text">
        {businessHours[0]} - {businessHours[1]}
      </span>
    </div>
  );
  return (
    currDay === day
      ? <span id="bold">{openHours}</span>
      : openHours
  );
};

Hours.propTypes = {
  day: PropTypes.string.isRequired,
  businessHours: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currDay: PropTypes.string.isRequired,
};

export default Hours;
