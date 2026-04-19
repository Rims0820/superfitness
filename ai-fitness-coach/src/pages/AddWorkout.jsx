import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { FaDumbbell, FaLayerGroup, FaRedo, FaSignal, FaCheck } from "react-icons/fa";

const AddWorkout = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [loading, setLoading] = useState(false);

  const handleAddWorkout = async () => {
    if (!name || !reps || !sets) return alert("Please fill in all fields");

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/workouts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          reps: parseInt(reps),
          sets: parseInt(sets),
          difficulty,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/dashboard");
      } else {
        alert(data.message || "Failed to add workout");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = "w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary/50 transition-colors font-medium text-white placeholder-gray-500";
  const labelStyles = "flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1";

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-2xl mx-auto p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 md:p-12 rounded-[3rem] border border-white/5 shadow-2xl"
        >
          <header className="mb-10 text-center">
            <div className="w-20 h-20 sporty-gradient rounded-[2rem] flex items-center justify-center text-3xl mx-auto mb-6 shadow-xl shadow-primary/30 rotate-3">
              <FaDumbbell />
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter italic">Add New <span className="text-primary">Drill</span></h1>
            <p className="text-gray-400 font-medium mt-2">Design your workout and start the grind.</p>
          </header>

          <div className="space-y-6">
            <div>
              <label className={labelStyles}><FaDumbbell className="text-primary" /> Exercise Name</label>
              <input
                placeholder="e.g. Bench Press"
                className={inputStyles}
                onChange={(e)=>setName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={labelStyles}><FaLayerGroup className="text-secondary" /> Sets</label>
                <input
                  type="number"
                  placeholder="0"
                  className={inputStyles}
                  onChange={(e)=>setSets(e.target.value)}
                />
              </div>
              <div>
                <label className={labelStyles}><FaRedo className="text-accent" /> Reps</label>
                <input
                  type="number"
                  placeholder="0"
                  className={inputStyles}
                  onChange={(e)=>setReps(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className={labelStyles}><FaSignal className="text-yellow-500" /> Difficulty</label>
              <div className="flex gap-3">
                {['Beginner', 'Medium', 'Hard'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`flex-1 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest border transition-all ${
                      difficulty === level
                      ? 'bg-primary border-primary text-white scale-105 shadow-lg shadow-primary/20'
                      : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddWorkout}
              disabled={loading}
              className="w-full py-5 mt-4 sporty-gradient rounded-2xl font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group"
            >
              {loading ? "Registering Drill..." : (
                <>
                  <FaCheck className="group-hover:rotate-12 transition-transform" /> Save Workout
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddWorkout;