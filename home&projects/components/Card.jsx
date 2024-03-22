import React from 'react';

const Card = ({ title, location, endDate, positions }) => {
  return (
    <div style={{ minWidth: '275px', height: '200px', backgroundColor: '#f0f0f0', margin: '10px', borderRadius: '8px', padding: '20px', fontFamily: 'sora', position: 'relative'}}>
      <h3 className = 'font-bold'>{title}</h3>
      <div className = 'font-light pt-5'>
      <p className = 'pb-2'>Location: {location}</p>
      <p className = 'pb-2'>End Date: {endDate}</p>
      <p className="pb-2"><span>{positions && <span style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: 'green', color: 'white', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{positions}</span>}</span></p>

      </div>
      
    </div>
  );
};

export default Card;
