import React from 'react';

const Authorized = ({ signedIn, signOut }) => {
  console.log("inside authorized");
  const handleLogout = () => {
    signOut(); // Call signOut function from the parent component
  };

  // If not signed in, return null
  if (!signedIn) {
    return null;
  }

  return (
    <div>
      <h2>Authorized Content - Logged in!</h2>
      <form>
        <nav>
          <ul>
            <button onClick={handleLogout}>Logout</button>
          </ul>
        </nav> 
      </form>
    </div>
  );
};

export default Authorized;
