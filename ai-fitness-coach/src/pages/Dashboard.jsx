import Navbar from "../components/Navbar";
import WorkoutCard from "../components/WorkoutCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlus, FaRunning, FaHistory, FaCalendarAlt } from "react-icons/fa";

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/workouts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setWorkouts(data);
        }
      } catch (error) {
        console.error("Failed to fetch workouts", error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="min-h-screen pb-20">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.h1
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic"
            >
              Your <span className="text-primary">Arena</span> 💪
            </motion.h1>
            <p className="text-gray-400 font-medium mt-2">Track your progress and crush your goals.</p>
          </div>

          <Link
            to="/add-workout"
            className="bg-primary text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-transform flex items-center gap-2"
          >
            <FaPlus /> Add Workout
          </Link>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Weekly Sessions', value: '4', icon: <FaRunning />, color: 'text-primary' },
            { label: 'Completion Rate', value: '92%', icon: <FaHistory />, color: 'text-secondary' },
            { label: 'Active Streak', value: '12 Days', icon: <FaCalendarAlt />, color: 'text-accent' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-3xl border border-white/5 flex items-center gap-5"
            >
              <div className={`p-4 rounded-2xl bg-white/5 ${stat.color} text-2xl`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-500 uppercase text-[10px] font-black tracking-widest">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <h2 className="text-2xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
           Current Routine
        </h2>

        {workouts.length === 0 ? (
          <div className="glass p-20 rounded-3xl border border-dashed border-white/10 text-center">
            <p className="text-gray-500 font-bold uppercase tracking-widest">No workouts found. Time to start grinding!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((w) => (
              <WorkoutCard key={w._id} workout={w} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;