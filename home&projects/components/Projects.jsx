import React, { useState, useEffect } from 'react';
import Row from './Row';
import Card from './Card';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleResponse = (response) => {
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 204) {
      return [];
    } else {
      throw new Error("Invalid response: " + response.status);
    }
  };

  const handleJSON = (json) => {
    if (json.constructor === Array) {
      setProjects(json);
    } else {
      throw new Error("Invalid JSON: " + json);
    }
  };

  const fetchData = () => {
    fetch('https://w20016240.nuwebspace.co.uk/groupwork/testapi/projects')
      .then(response => handleResponse(response))
      .then(json => handleJSON(json))
      .catch(err => console.log(err.message));
  };

   //Filter projects based in Newcastle
   const newcastleProjects = projects.filter(project => project.location === "Newcastle");

   //First row should display only projects based in Newcastle
  const firstRowProjects = newcastleProjects.slice(0, 10); // Assuming you want only the first 10 projects

  return (
    <div>
      <Row>
        {firstRowProjects.map((project, index) => (
          <Card 
            key={`card_${index}`} 
            title={project.title} 
            location={project.location}
            endDate={project.endDate}
            positions={project.positions}
          />
        ))}
      </Row>
    </div>
  );
}

export default Projects;
