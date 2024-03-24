import React from 'react';
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-green-500 text-yellow-500 h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-8">Bloom</h2>
      <form>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/login">
                <button className="bg-yellow-500 hover:bg-yellow-400 text-green-500 hover:text-green-600 py-2 px-4 rounded-md">Login</button>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <button className="bg-yellow-500 hover:bg-yellow-400 text-green-500 hover:text-green-600 py-2 px-4 rounded-md">Register</button>
              </Link>
            </li>
          </ul>
        </nav> 
      </form>
    </div>
  );
};

export default LandingPage;
