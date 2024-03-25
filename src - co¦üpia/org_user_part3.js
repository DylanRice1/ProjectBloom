import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

import volunteer1 from './volunteer.jpg';
import volunteer2 from './volunteer2.jpg';
import volunteer3 from './volunteer3.jpg';
import defaultProfilePic from './defaultProfilePic.png';

const SkillsInterestsPage = () => {
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [otherSkill, setOtherSkill] = useState('');
  const [otherInterest, setOtherInterest] = useState('');
  const [showOtherSkillInput, setShowOtherSkillInput] = useState(false);
  const [showOtherInterestInput, setShowOtherInterestInput] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePreview, setProfilePreview] = useState(defaultProfilePic);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [volunteer1, volunteer2, volunteer3]; 

  const predefinedSkills = ['Cleaning', 'Mowing', 'Gardening'];
  const predefinedInterests = ['Allotments', 'Gardens', 'Roses'];

  const navigate = useNavigate();

  const handleSkillChange = (e) => {
    const value = e.target.value;
    setShowOtherSkillInput(value === 'Other');
    if (value && value !== 'Other' && !skills.includes(value)) {
      setSkills([...skills, value]);
    }
  };

  const handleInterestChange = (e) => {
    const value = e.target.value;
    setShowOtherInterestInput(value === 'Other');
    if (value && value !== 'Other' && !interests.includes(value)) {
      setInterests([...interests, value]);
    }
  };

  const addOtherSkill = () => {
    if (otherSkill && !skills.includes(otherSkill)) {
      setSkills([...skills, otherSkill]);
      setOtherSkill('');
    }
  };

  const addOtherInterest = () => {
    if (otherInterest && !interests.includes(otherInterest)) {
      setInterests([...interests, otherInterest]);
      setOtherInterest('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const removeInterest = (interestToRemove) => {
    setInterests(interests.filter(interest => interest !== interestToRemove));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePic(null);
      setProfilePreview(defaultProfilePic);
    }
  };

  // Function to handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  // Retrieve existing data from sessionStorage
  const existingData = JSON.parse(sessionStorage.getItem('createAccountData')) || {};

  const formData = new FormData();
  formData.append('orgName', existingData.organisationName);
  formData.append('location', existingData.location); // Assuming 'location' was set in a previous step
  formData.append('typeID', existingData.organisationType); // Assuming 'typeID' refers to the organisation type
  formData.append('phoneNumber', existingData.phoneNumber);

  // Skills and Interests (assuming these are arrays of IDs not names)
  skills.forEach(skill => formData.append('skills[]', skill));
  interests.forEach(interest => formData.append('interests[]', interest));

  // Other skill or interest
  if (otherSkill) formData.append('otherSkill', otherSkill);
  if (otherInterest) formData.append('otherInterest', otherInterest);

  // Profile picture
  if (profilePic) formData.append('profilePic', profilePic);

  // Include the token with your request
  const token = 'your-token-here'; // Retrieve your actual token

  try {
    const response = await fetch('/your-api-endpoint', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      // Handle successful submission
      navigate('/complete'); // Replace with your actual success route
    } else {
      // Handle errors
      console.error('Submission failed', data);
    }
  } catch (error) {
    console.error('An error occurred', error);
  }
};

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); 

    return () => clearTimeout(timer); 
  }, [currentSlide, slides.length]);

  return (
    <div className="container">
      <div className="left-side">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`Volunteer ${index + 1}`}
            className={`slideshow-image ${index === currentSlide ? 'slideshow-image-active' : ''}`}
          />
        ))}
      </div>
      <div className="right-side">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            {/* Profile Picture */}
            <div className="mb-4 flex flex-col items-center">
              <img
                src={profilePreview}
                alt="Profile Preview"
                className="rounded-full w-24 h-24 object-cover mb-4"
              />
              <input
                type="file"
                onChange={handleProfilePicChange}
                className="form-input"
                id="profile-pic"
                accept="image/*"
              />
            </div>

            {/* Skills */}
            <div className="mb-4">
              <label htmlFor="skills" className="label">Skills</label>
              <select
                id="skills"
                onChange={handleSkillChange}
                className="form-select"
                value=""
              >
                <option value="">Select a skill</option>
                {predefinedSkills.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
                <option value="Other">Other</option>
              </select>
              {showOtherSkillInput && (
                <div className="mt-4">
                  <input
                    type="text"
                    value={otherSkill}
                    onChange={(e) => setOtherSkill(e.target.value)}
                    placeholder="Enter other skill"
                    className="form-input"
                  />
                  <button
                    type="button"
                    onClick={addOtherSkill}
                    className="form-button"
                  >
                    Add Skill
                  </button>
                </div>
              )}
            </div>

            {/* Skill Tags */}
            <div className="mb-4">
              {skills.map((skill, index) => (
                <span key={index} className="tag">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="tag-close"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>

            {/* Interests */}
            <div className="mb-4">
              <label htmlFor="interests" className="label">Interests</label>
              <select
                id="interests"
                onChange={handleInterestChange}
                className="form-select"
                value=""
              >
                <option value="">Select an interest</option>
                {predefinedInterests.map(interest => (
                  <option key={interest} value={interest}>{interest}</option>
                ))}
                <option value="Other">Other</option>
              </select>
              {showOtherInterestInput && (
                <div className="mt-4">
                  <input
                    type="text"
                    value={otherInterest}
                    onChange={(e) => setOtherInterest(e.target.value)}
                    placeholder="Enter other interest"
                    className="form-input"
                  />
                  <button
                    type="button"
                    onClick={addOtherInterest}
                    className="form-button"
                  >
                    Add Interest
                  </button>
                </div>
              )}
            </div>

            {/* Interest Tags */}
            <div className="mb-4">
              {interests.map((interest, index) => (
                <span key={index} className="tag">
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                    className="tag-close"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="button-group">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="back-button"
              >
                Back
              </button>
              <button
                type="submit"
                className="complete-button"
              >
                Complete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SkillsInterestsPage;