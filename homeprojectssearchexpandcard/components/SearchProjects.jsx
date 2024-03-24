import React, { useState, useEffect } from 'react';
import Card from './Card';
import ExpandedCard from './ExpandedCard';
import { projectsContainer, card, cardTitle, cardDetails, positionBadge } from './styling/searchStyle';

function SearchProjects() {
  const [projects, setProjects] = useState([]);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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
    if (Array.isArray(json)) {
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
    setExpandedCardIndex(index);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)', textAlign: 'center', padding: '0 20px' }}> {/* Added padding to the left and right */}
      <div style={{ marginBottom: '20px', width: 'calc(80% - 40px)', margin: '0 auto' }}> {/* Adjusted width and margin */}
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: '100%', padding: '5px', borderRadius: '4px' }}
        />
      </div>
      <div style={projectsContainer}>
        {filteredProjects.map((project, index) => (
          <div key={`card_${index}`} style={{ ...card, width: 'calc(33.33% - 20px)' }} onClick={() => handleCardClick(index)}>
            <h3 style={cardTitle}>{project.title}</h3>
            <div style={cardDetails}>
              <p>Location: {project.location}</p>
              <p>End Date: {project.endDate}</p>
              <p><span>{project.positions && <span style={positionBadge}>{project.positions}</span>}</span></p>
            </div>
          </div>
        ))}
      </div>
      {expandedCardIndex !== null && (
        <ExpandedCard
          project={filteredProjects[expandedCardIndex]}
          onClose={() => setExpandedCardIndex(null)}
        />
      )}
    </div>
  );
}

export default SearchProjects;