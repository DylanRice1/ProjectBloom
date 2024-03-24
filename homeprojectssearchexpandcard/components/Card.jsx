import React from 'react';

const Card = ({ title, location, endDate, description, type, positions, expanded, onClick }) => {
  const cardStyle = {
    minWidth: '275px',
    height: expanded ? '300px' : '200px', // Adjusted height for expanded state
    width: expanded ? '400px' : '275px', // Adjusted width for expanded state
    backgroundColor: '#f0f0f0',
    margin: '10px',
    borderRadius: '8px',
    padding: '20px',
    fontFamily: 'sora',
    position: 'relative',
    cursor: 'pointer',
  };

  return (
    <div style={cardStyle} onClick={onClick}>
      <h3 className='font-bold'>{title}</h3>
      <div className='font-light pt-5'>
        <p className='pb-2'>Location: {location}</p>
        <p className='pb-2'>End Date: {endDate}</p>
        <p className="pb-2"><span>{positions && <span>Positions left: {positions}</span>}</span></p>
        {expanded && (
          <div>
            <p className='pb-2'>Description: {description}</p>
            <p className='pb-2'>Org Type: {type}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
