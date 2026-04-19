import { useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data._id) {
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = "w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 focus:outline-none focus:border-primary/50 transition-colors font-medium text-white placeholder-gray-500";
  const labelStyles = "flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1";

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-8 md:p-12 rounded-[3rem] border border-white/5 shadow-2xl w-full max-w-md"
        >
          <header className="mb-10 text-center">
            <h2 className="text-4xl font-black uppercase tracking-tighter italic">Join the <span className="text-primary">Elite</span></h2>
            <p className="text-gray-400 font-medium mt-2">Start your transformation today.</p>
          </header>

          <div className="space-y-6">
            <div>
              <label className={labelStyles}>Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className={inputStyles}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className={labelStyles}>Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="athlete@fitai.com"
                  className={inputStyles}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className={labelStyles}>Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className={inputStyles}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full py-5 mt-4 sporty-gradient rounded-2xl font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              {loading ? "Creating Account..." : (
                <>
                  <FaUserPlus /> Register
                </>
              )}
            </button>

            <p className="text-center text-gray-500 font-medium text-sm">
              Already a member? <Link to="/login" className="text-primary hover:underline">Log in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;