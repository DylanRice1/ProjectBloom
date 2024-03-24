import React, { useState, useEffect } from 'react';
import Row from '../Row';
import Card from './CardV4';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

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

  const handleCardClick = (index) => {
    setExpandedCard(index === expandedCard ? null : index);
  };

  const newcastleProjects = projects.filter(project => project.location === "Newcastle");
  const firstRowProjects = newcastleProjects.slice(0, 10);

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
            expanded={index === expandedCard}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </Row>
    </div>
  );
}

export default Projects;
