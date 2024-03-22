// CardView.js
import React from 'react';
import Row from './Row';
import Card from './Card';

const CardView = () => {
  return (
    <div>
      <Row>
        {[...Array(10)].map((_, index) => (
          <Card key={`row1_card${index}`} title={`Card ${index + 1}`} content={`Content ${index + 1}`} />
        ))}
      </Row>
      <Row>
        {[...Array(10)].map((_, index) => (
          <Card key={`row2_card${index}`} title={`Card ${index + 1}`} content={`Content ${index + 1}`} />
        ))}
      </Row>
      <Row>
        {[...Array(10)].map((_, index) => (
          <Card key={`row3_card${index}`} title={`Card ${index + 1}`} content={`Content ${index + 1}`} />
        ))}
      </Row>
    </div>
  );
};

export default CardView;
