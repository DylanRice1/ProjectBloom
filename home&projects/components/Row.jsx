// Row component
import React from 'react';

const Row = ({ children }) => {
  return (
    <div style={{ display: 'flex', overflowX: 'auto', overflowY: 'hidden', whiteSpace: 'nowrap', padding: '10px'}}>
      {children}
    </div>
  );
};

export default Row;
