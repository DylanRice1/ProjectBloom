import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('individual');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Submitting registration form...');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('User Type:', userType);

    const requestData = {
      email: email,
      password: password,
    };

    const encodedString = btoa(`${email}:${password}`);
    const endpoint =
      userType === 'individual'
        ? 'https://w20024779.nuwebspace.co.uk/teamcoursework/api/vregister'
        : 'https://w20024779.nuwebspace.co.uk/teamcoursework/api/oregister';

    console.log('Sending registration request to:', endpoint);

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedString}`,
      },
      body: JSON.stringify(requestData),
    })
      .then(response => {
        console.log('Received response from server:', response);
        if (response.status === 200) {
          console.log("Successful registration");
          return response.json(); // Parse response body as JSON
        } else {
          console.error("Error in registration");
          throw new Error(`Failed to retrieve token. Status: ${response.status}`);
        }
      })
      .then(data => {
        if ('message' in data) {
          console.log('Success Message:', data.message);
        } else {
          console.log('registration Successful');
        }
        console.log('User ID:', data.userId); // Extract user ID from response data
        localStorage.setItem('token', data.token);
        navigate("/authorized"); // Navigate to "/authorized" upon successful login
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-900 text-white">
      <h2 className="text-3xl font-bold mb-8">Registration Form</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <div className="mb-4">
          <label htmlFor="email" className="block text-xl mb-2">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="p-2 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-xl mb-2">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="p-2 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl mb-2">User Type:</label>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                value="individual"
                checked={userType === 'individual'}
                onChange={handleUserTypeChange}
                className="mr-1"
              />
              Individual
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="organization"
                checked={userType === 'organization'}
                onChange={handleUserTypeChange}
                className="mr-1"
              />
              Organization
            </label>
          </div>
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white hover:text-white py-2 px-4 rounded-md w-full">
          Register
        </button>
      </form>
      <p className="mt-4">
        <Link to="/" className="text-white hover:text-white flex items-center">
          Close
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
