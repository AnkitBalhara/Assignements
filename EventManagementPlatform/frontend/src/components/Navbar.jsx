import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-blue-500 p-4 flex justify-between text-white">
    <Link to="/" className="text-xl font-bold">EventHub</Link>
    <div>
      <Link to="/login" className="mr-4">Login</Link>
      <button className="bg-slate-200 text-black px-4 py-2 rounded">Create Event</button>
    </div>
  </nav>
);

export default Navbar;
