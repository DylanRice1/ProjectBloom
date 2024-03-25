import React, { useState, useEffect } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

import volunteer1 from './volunteer.jpg';
import volunteer2 from './volunteer2.jpg';
import volunteer3 from './volunteer3.jpg';

const CreateAccountSecondPage = () => {
  const [organisationName, setOrganisationName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+44');
  const [organisationType, setOrganisationType] = useState('');
  const [otherOrganisationType, setOtherOrganisationType] = useState('');

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [volunteer1, volunteer2, volunteer3]; 

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/org');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingData = JSON.parse(sessionStorage.getItem('createAccountData')) || {};

    const updatedData = {
      ...existingData,
      organisationName,
      phoneNumber: `${countryCode}${phoneNumber}`,
      organisationType: organisationType === 'Other' ? otherOrganisationType : organisationType,
    };

    sessionStorage.setItem('createAccountData', JSON.stringify(updatedData));

    navigate('/org_user_part3'); 
  };

  const isFormValid = organisationName.trim() !== '' && phoneNumber.trim() !== '' && (organisationType !== 'Other' || otherOrganisationType.trim() !== '');

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
            alt={`Slide ${index}`}
            className={`slideshow-image ${index === currentSlide ? 'slideshow-image-active' : ''}`}
            style={{ display: index === currentSlide ? 'block' : 'none' }} // Only display the active slide
          />
        ))}
      </div>
      <div className="right-side">
        <div className="form-wrapper">
          <h1 className="text-red-500 font-bold text-2xl mb-4 text-center">Create Account</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="label" htmlFor="organisation-name">Organisation Name</label>
              <input
                className="form-input"
                id="organisation-name"
                type="text"
                placeholder="Organisation Name"
                value={organisationName}
                onChange={(e) => setOrganisationName(e.target.value)}
              />
            </div>
            <div className="mb-4 flex">
              <div className="w-1/2 mr-2">
                <label className="label" htmlFor="phone-number-country-code">Country Code</label>
                <input
                  className="form-input"
                  id="phone-number-country-code"
                  type="text"
                  placeholder="Country Code"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                />
              </div>
              <div className="w-1/2 ml-2">
                <label className="label" htmlFor="phone-number">Phone Number</label>
                <input
                  className="form-input"
                  id="phone-number"
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="label" htmlFor="organisation-type">Organisation Type</label>
              <select
                className="form-select"
                id="organisation-type"
                value={organisationType}
                onChange={(e) => setOrganisationType(e.target.value)}
              >
                <option value="">Select an organisation type</option>
                <option value="Church">Church</option>
                <option value="School">School</option>
                <option value="University">University</option>
                <option value="Community Center">Community Center</option>
                <option value="Library">Library</option>
                <option value="Sports Center">Sports Center</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {organisationType === 'Other' && (
              <div className="mb-4">
                <label className="label" htmlFor="other-organisation-type">Other Organisation Type</label>
                <input
                  className="form-input"
                  id="other-organisation-type"
                  type="text"
                  placeholder="If other, please specify"
                  value={otherOrganisationType}
                  onChange={(e) => setOtherOrganisationType(e.target.value)}
                />
              </div>
            )}
            <div className="button-group">
              <button
                className="back-button"
                type="button"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                className={`complete-button ${isFormValid ? '' : 'opacity-50 cursor-not-allowed'}`}
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

export default CreateAccountSecondPage;