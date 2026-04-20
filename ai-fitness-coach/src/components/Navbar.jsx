import { Link, useLocation } from "react-router-dom";
import { FaDumbbell, FaChartLine, FaRobot, FaUtensils } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: "/dashboard", name: "Dashboard", icon: <FaChartLine /> },
    { path: "/diet", name: "Diet", icon: <FaUtensils /> },
    { path: "/progress", name: "Progress", icon: <FaChartLine /> },
    { path: "/chat", name: "AI Coach", icon: <FaRobot /> },
  ];

  return (
    <nav className="sticky top-0 z-50 glass px-6 py-4 flex justify-between items-center mx-4 mt-4 rounded-2xl">
      <Link to="/" className="flex items-center gap-2 group">
        <motion.div
          whileHover={{ rotate: 15 }}
          className="bg-primary p-2 rounded-lg"
        >
          <FaDumbbell className="text-white text-xl" />
        </motion.div>
        <h1 className="text-2xl font-black tracking-tighter uppercase">
          Fit<span className="text-primary">AI</span>
        </h1>
      </Link>

      <div className="hidden md:flex space-x-8 text-gray-300 font-semibold uppercase text-sm tracking-widest">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-2 transition-colors hover:text-primary ${
              location.pathname === link.path ? "text-primary" : ""
            }`}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-primary px-5 py-2 rounded-xl text-sm font-bold uppercase tracking-wider hover:scale-105 transition-transform"
        >
          Join
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;