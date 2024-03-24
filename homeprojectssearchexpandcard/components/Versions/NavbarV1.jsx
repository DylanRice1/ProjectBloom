import React from 'react';
import { titleText, navText } from '../styling/navStyling';

export const Navbar = () => {
    let Links = [
        {name: 'Home', link: '/'},
        {name: 'About', link: '/'},
        {name: 'Explore Projects', link: '/'},
        {name: 'My Projects', link: '/'},
        {name: 'Profile', link: '/'},
    ];
  return (
    <nav className = 'flex items-center justify-between px-4 py-3' style = {{backgroundColor: '#6f5e53'}}>
        <div className = 'md:flex py-4 md:px-10 px-7'>
        <div className = 'cursor-pointer flex items-center' style = {titleText}>
            <span className = 'mr-1 pt-2'></span>
            Harvest&Help
        </div>
        </div>
        <ul className = 'md:flex md:items-center' style = {navText}>
            {Links.map((link) => (
                <li key = {link.name} className = 'md:ml-8'>
                    <a href = {link.link} className = 'hover:text-black duration-500'>{link.name}</a>
                </li>
            ))}
        </ul>
    </nav>
  );
};

export default Navbar;
