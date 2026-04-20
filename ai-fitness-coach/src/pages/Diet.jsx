import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DietCard from "../components/DietCard";
import { motion } from "framer-motion";
import { FaUtensils, FaPlus } from "react-icons/fa";

const Diet = () => {
  const [diets, setDiets] = useState([]);

  useEffect(() => {
    const fetchDiets = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/diet`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setDiets(data);
        }
      } catch (error) {
        console.error("Failed to fetch diets", error);
      }
    };
    fetchDiets();
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
              Fuel <span className="text-primary">Plan</span> 🥗
            </motion.h1>
            <p className="text-gray-400 font-medium mt-2">Optimize your nutrition for peak performance.</p>
          </div>

          <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-transform flex items-center gap-2">
            <FaPlus /> Add Meal
          </button>
        </header>

        {diets.length === 0 ? (
          <div className="glass p-20 rounded-3xl border border-dashed border-white/10 text-center">
            <FaUtensils className="text-4xl text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 font-bold uppercase tracking-widest">No meals logged yet. Start tracking your fuel!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diets.map((meal) => (
              <DietCard key={meal._id} meal={meal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Diet;
