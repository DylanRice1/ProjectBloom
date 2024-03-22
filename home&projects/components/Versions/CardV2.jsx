import React from 'react';

const Card = ({ title, description, location, endDate, positions, type }) => {
  return (
    <div style={{ minWidth: '275px', height: '200px', backgroundColor: '#f0f0f0', margin: '10px', borderRadius: '8px', padding: '20px' }}>
      <h3>{title}</h3>
      <p>Description: {description}</p>
      <p>Location: {location}</p>
      <p>End Date: {endDate}</p>
      <p>Positions: {positions}</p>
      <p>Type: {type}</p>
    </div>
  );
};

export default Card;
