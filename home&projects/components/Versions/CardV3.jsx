import React from 'react';

const Card = ({ title, location, endDate, positions }) => {
  return (
    <div style={cardStyle}>
      <h3>{title}</h3>
      <p>Location: {location}</p>
      <p>End Date: {endDate}</p>
      <p>Positions: {positions}</p>
    </div>
  );
};

export default Card;
