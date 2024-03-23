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

  return (
    <div>
      <Row>
        {projects.map((project, index) => (
          <Card 
            key={`card_${index}`} 
            title={project.title} 
            description={project.description}
            location={project.location}
            endDate={project.endDate}
            positions={project.positions}
            type={project.type}
          />
        ))}
      </Row>
    </div>
  );
}

export default Projects;