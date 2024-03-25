import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import slide1 from './volunteer.jpg';
import slide2 from './volunteer2.jpg';
import slide3 from './volunteer3.jpg';
import defaultProfilePic from './defaultProfilePic.png';

const BiodataPage = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [profilePic, setProfilePic] = useState(defaultProfilePic);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slides = [slide1, slide2, slide3];
  const ukCities = [
    'London', 'Birmingham', 'Glasgow', 'Liverpool', 'Belfast',
    'Manchester', 'Leeds', 'Edinburgh', 'Bristol', 'Sheffield',
    'Cardiff', 'Newcastle upon Tyne', 'Bradford', 'Nottingham',
    'Hull', 'Northampton', 'Leicester', 'Stoke-on-Trent', 'Plymouth',
    'Southampton',
  ];
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); 
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/volunteer_user_partdeux', { state: { name, phoneNumber } });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (file && validImageTypes.includes(file.type)) {
      setProfilePic(URL.createObjectURL(file));
    } else {
      alert('Only image files are allowed.');
    }
  };


  const AboutTooltip = () => (
    <div className="group absolute top-0 right-0 p-4">
      <span className="text-2xl cursor-help">❓</span>
      <div className="absolute w-64 p-4 bg-gray-700 text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mt-1 mr-8 hidden group-hover:block">
        <p>About this form:</p>
        <p>Fill in your details and upload a profile picture to complete your volunteer profile.</p>
      </div>
    </div>
  );

  return (
    <div className="container flex">
      <div className="left-side w-1/2">
        <div className="slideshow-container">
          {slides.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index}`}
              className={`slideshow-image ${index === currentSlideIndex ? 'slideshow-image-active' : ''}`}
            />
          ))}
        </div>
      </div>
      <div className="right-side w-1/2 relative">
        <AboutTooltip />

        <div className="form-wrapper mt-16">
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
              <img className="rounded-full w-24 h-24 object-cover mx-auto" src={profilePic} alt="Profile" />
              <input 
                type="file" 
                id="profile-pic" 
                className="form-input mb-4" 
                onChange={handleImageChange}
                accept="image/png, image/jpeg, image/gif" 
              />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="label">Name</label>
              <input type="text" id="name" className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-4 flex">
              <span className="country-code">+44</span>
              <input type="tel" id="phone-number" className="form-input" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="label">Location</label>
              <select id="location" className="form-select" value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="">Select a location</option>
                {ukCities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="form-button">Next</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BiodataPage;