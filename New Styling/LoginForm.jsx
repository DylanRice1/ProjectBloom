import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('individual');
  const [errorSigningIn, setErrorSigningIn] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      props.setSignedIn(true);
    }
  }, [props.setSignedIn]);

  const signIn = () => {
    
    const requestData = {
      email: email,
      password: password,
    };

    const encodedString = btoa(`${email}:${password}`);
    const endpoint =
      userType === 'individual'
        ? 'https://w20024779.nuwebspace.co.uk/teamcoursework/api/vtoken'
        : 'https://w20024779.nuwebspace.co.uk/teamcoursework/api/otoken';

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedString}`,
      },
      body: JSON.stringify(requestData),
    })
    .then(response => {
      if (response.status === 200) {
          console.log("Successful Login");
          return response.json(); // Parse response body as JSON
      } else {
          console.error("Error in Login");
          throw new Error(`Failed to retrieve token. Status: ${response.status}`);
      }
  })
  .then(data => {
      if ('message' in data) {
          console.log('Success Message:', data.message);
      } else {
          console.log('Login Successful');
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
    <div className={'bg-green-900 text-white p-2 text-md text-right'}>
      {!props.signedIn && (
        <div>
          <input
            type="text"
            placeholder="email"
            className={'p-1 mx-2 rounded-md text-black'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className={'p-1 mx-2 rounded-md text-black'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <label>
              <input
                type="radio"
                value="individual"
                checked={userType === 'individual'}
                onChange={() => setUserType('individual')}
              />
              Individual
            </label>
            <label>
              <input
                type="radio"
                value="organisation"
                checked={userType === 'organisation'}
                onChange={() => setUserType('organisation')}
              />
              Organisation
            </label>
          </div>
          <input
            type="submit"
            value="Sign In"
            className="py-1 px-2 mx-2 bg-green-500 hover:bg-green-600 rounded-md"
            onClick={signIn}
          />
        </div>
      )}
       <button> <Link to="/">Forgot password?</Link> </button>
       <button> <p>See the <Link to="/">Landing</Link> page</p></button>
    </div>
  );
}

export default LoginForm;