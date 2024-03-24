import React from 'react';

export const Navbar = () => {
    let Links = [
    {name: 'Home', link: '/'},
    {name: 'About', link: '/'},
    {name: 'Explore Projects', link: '/'},
    {name: 'My Projects', link: '/'},
    {name: 'Profile', link: '/'},
    ];
  return (
    <div className = 'shadow-md w-full'>
        <div className = 'md:px-10 py-4 px-7'>
            <div className = 'flex text-2xl cursor-pointer items-center gap-2'>
                <div className = 'w-7 h-7 text-blue-600'/>
                <span className = 'font-bold'>Inscribe</span>
            </div>

            <ul classname = 'flex pl-9'>
                {
                    Links.map(link => <li><a href = '/'>{link.name}</a></li>)
                }
            </ul>

        </div>
    </div>
  );
};

export default Navbar;
