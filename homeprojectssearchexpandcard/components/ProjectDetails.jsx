// ProjectDetails.js

import React from 'react';
import { useParams } from 'react-router-dom';

function ProjectDetails() {
  const { id } = useParams(); // Assuming each project has a unique ID

  // Fetch project details based on ID

  return (
    <div>
      {/* Display project details */}
      <h2>Project Details</h2>
      <p>Project ID: {id}</p>
      {/* Add more project details here */}
    </div>
  );
}

export default ProjectDetails;
