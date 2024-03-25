import React, { useState, useEffect } from 'react';
import './index.css'; 
import { useNavigate } from 'react-router-dom';
import interestImage1 from './volunteer.jpg';
import interestImage2 from './volunteer2.jpg';
import interestImage3 from './volunteer3.jpg';

const InterestsSkillsPage = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const skillOptions = ['Leadership', 'Communication', 'Technical', 'Management'];
  const interestOptions = ['Technology', 'Arts', 'Science', 'Sports'];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const handleSelectSkill = (event) => {
    const skill = event.target.value;
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSelectInterest = (event) => {
    const interest = event.target.value;
    if (interest && !selectedInterests.includes(interest)) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleDeleteSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const handleDeleteInterest = (interest) => {
    setSelectedInterests(selectedInterests.filter((i) => i !== interest));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected Skills:', selectedSkills);
    console.log('Selected Interests:', selectedInterests);
    navigate('/next-page'); 
  };

  const slides = [interestImage1, interestImage2, interestImage3];

  return (
    <div className="container">
      <div className="left-side">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`Slide ${index}`}
            className={`slideshow-image ${index === currentSlide ? 'slideshow-image-active' : ''}`}
          />
        ))}
      </div>
      <div className="right-side flex flex-col justify-center items-center p-6">
        <div className="form-wrapper w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Add Your Interests and Skills</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="label" htmlFor="skills">Skills:</label>
              <select id="skills" onChange={handleSelectSkill} value="" className="form-select">
                <option value="">Select a skill</option>
                {skillOptions.map((skill, index) => (
                  <option key={index} value={skill}>{skill}</option>
                ))}
              </select>
            </div>

            <div className="selected-items mb-4">
              {selectedSkills.map((skill, index) => (
                <span key={index} className="tag">
                  {skill}
                  <button type="button" onClick={() => handleDeleteSkill(skill)} className="tag-close">&times;</button>
                </span>
              ))}
            </div>

            <div className="mb-4">
              <label className="label" htmlFor="interests">Interests:</label>
              <select id="interests" onChange={handleSelectInterest} value="" className="form-select">
                <option value="">Select an interest</option>
                {interestOptions.map((interest, index) => (
                  <option key={index} value={interest}>{interest}</option>
                ))}
              </select>
            </div>

            <div className="selected-items mb-4">
              {selectedInterests.map((interest, index) => (
                <span key={index} className="tag">
                  {interest}
                  <button type="button" onClick={() => handleDeleteInterest(interest)} className="tag-close">&times;</button>
                </span>
              ))}
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={() => navigate(-1)} className="back-button">Back</button>
              <button type="submit" className="complete-button">Complete</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InterestsSkillsPage;