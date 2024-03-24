import React from 'react';
import { expandedCardContent, expandedCardOverlay } from './styling/expandedCardStyle';

const ExpandedCard = ({ project, onClose }) => {
  return (
    <div>
      <div style={expandedCardOverlay} onClick={onClose}></div>
      <div style={expandedCardContent}>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <p>Location: {project.location}</p>
        <p>End Date: {project.endDate}</p>
        <button style={{ marginTop: '20px' }} onClick={onClose}>Apply</button>
      </div>
    </div>
  );
};

export default ExpandedCard;
