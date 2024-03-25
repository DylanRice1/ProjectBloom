import React, { useState, useEffect } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

import volunteer1 from './volunteer.jpg';
import volunteer2 from './volunteer2.jpg';
import volunteer3 from './volunteer3.jpg';

const CreateAccount = () => {
  const [streetName, setStreetName] = useState('');
  const [doorNumber, setDoorNumber] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [volunteer1, volunteer2, volunteer3];
  const navigate = useNavigate();

  const ukCities = [
    'London', 'Birmingham', 'Glasgow', 'Liverpool', 'Belfast',
    'Manchester', 'Leeds', 'Edinburgh', 'Bristol', 'Sheffield',
    'Cardiff', 'Newcastle upon Tyne', 'Bradford', 'Nottingham',
    'Hull', 'Northampton', 'Leicester', 'Stoke-on-Trent', 'Plymouth',
    'Southampton',
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentSlide, slides.length]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      streetName,
      postalCode,
      selectedCity,
    };

    sessionStorage.setItem('createAccountData', JSON.stringify(formData));

    navigate('/org_user_partdeux'); 
  };

  const isFormValid = streetName && doorNumber && postalCode && selectedCity;

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
      <div className="right-side">
        <div className="form-wrapper">
          <h1 className="text-2xl font-bold mb-4 text-center" style={{ color: '#f56565' }}>Create Account</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="label" htmlFor="street-name">Street Name</label>
              <input
                className="form-input"
                id="street-name"
                type="text"
                placeholder="Street Name"
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="label" htmlFor="door-number">Door Number</label>
              <input
                className="form-input"
                id="door-number"
                type="text"
                placeholder="Door Number"
                value={doorNumber}
                onChange={(e) => setDoorNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="label" htmlFor="postal-code">Postal Code</label>
              <input
                className="form-input"
                id="postal-code"
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="label" htmlFor="city">City</label>
              <select
                className="form-select"
                id="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">Select a city</option>
                {ukCities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-center">
              <button
                className={`form-button ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                type="submit"
                disabled={!isFormValid}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;