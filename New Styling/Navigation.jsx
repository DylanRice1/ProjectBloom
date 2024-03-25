import { Link } from "react-router-dom";

function Navigation() {
    return (
        <nav className="flex items-center justify-between px-4 py-3 bg-green-900">
            <div className="md:flex py-4 md:px-10 px-7">
                <div className="cursor-pointer flex items-center text-white">
                    <span className="mr-1 pt-2"></span>
                    Harvest&Help
                </div>
            </div>
            <ul className="flex justify-center md:flex-1">
                <li className="md:ml-8">
                    <Link to="/" className="text-white hover:text-black transition duration-500">Home</Link>
                </li>
                <li className="md:ml-8">
                    <Link to="/explore" className="text-white hover:text-black transition duration-500">Explore Projects</Link>
                </li>
                <li className="md:ml-8">
                    <Link to="/newpost" className="text-white hover:text-black transition duration-500">New Post</Link>
                </li>
                <li className="md:ml-8">
                    <Link to="/profile" className="text-white hover:text-black transition duration-500">Profile</Link>
                </li>
                <li className="md:ml-8">
                    <Link to="/login" className="text-white hover:text-black transition duration-500">Login</Link>
                </li>
                <li className="md:ml-8">
                    <Link to="/register" className="text-white hover:text-black transition duration-500">Register</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;