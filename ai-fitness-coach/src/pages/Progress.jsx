import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { FaChartLine, FaWeight, FaFire, FaRunning, FaPlus } from "react-icons/fa";
import ProgressChart from "../components/ProgressChart";

const Progress = () => {
  const [progress, setProgress] = useState([]);
  const [weight, setWeight] = useState("");
  const [calories, setCalories] = useState("");
  const [steps, setSteps] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchProgress = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/progress`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setProgress(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  const addProgress = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ weight, calories, steps }),
      });
      // Refresh
      fetchProgress();
      setWeight("");
      setCalories("");
      setSteps("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const inputStyles = "w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-primary/50 transition-colors font-medium text-white placeholder-gray-500";
  const labelStyles = "text-xs font-black uppercase tracking-widest text-gray-500 mb-2 block ml-1";

  return (
    <div className="min-h-screen pb-20">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <header className="mb-12">
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic"
          >
            Evolution <span className="text-primary">Stats</span> 📈
          </motion.h1>
          <p className="text-gray-400 font-medium mt-2">Data-driven growth. Track every win.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 rounded-3xl border border-white/5 h-fit"
          >
            <h2 className="text-xl font-bold uppercase tracking-tight mb-6 flex items-center gap-2">
              <FaPlus className="text-primary text-sm" /> Log Entry
            </h2>
            <form onSubmit={addProgress} className="space-y-4">
              <div>
                <label className={labelStyles}>Weight (kg)</label>
                <input
                  type="number"
                  placeholder="75.5"
                  className={inputStyles}
                  value={weight}
                  onChange={(e)=>setWeight(e.target.value)}
                />
              </div>
              <div>
                <label className={labelStyles}>Calories Burnt</label>
                <input
                  type="number"
                  placeholder="2400"
                  className={inputStyles}
                  value={calories}
                  onChange={(e)=>setCalories(e.target.value)}
                />
              </div>
              <div>
                <label className={labelStyles}>Steps Taken</label>
                <input
                  type="number"
                  placeholder="10000"
                  className={inputStyles}
                  value={steps}
                  onChange={(e)=>setSteps(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 sporty-gradient rounded-xl font-black uppercase tracking-widest text-white hover:scale-[1.02] active:scale-95 transition-all mt-4 shadow-lg shadow-primary/20"
              >
                {loading ? "Saving..." : "Save Entry"}
              </button>
            </form>
          </motion.div>

          {/* History/Chart */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass p-8 rounded-3xl border border-white/5 overflow-hidden">
              <h2 className="text-xl font-bold uppercase tracking-tight mb-6 flex items-center gap-2">
                <FaChartLine className="text-secondary text-sm" /> Weight Trend
              </h2>
              <div className="w-full h-[300px] flex items-center justify-center">
                {progress.length > 0 ? (
                  <ProgressChart data={progress} />
                ) : (
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Need more data points to chart progress</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
                <FaRunning className="text-accent text-sm" /> Recent Logs
              </h2>
              {progress.slice(0, 5).map((p) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="glass p-6 rounded-2xl border border-white/5 flex justify-between items-center"
                >
                  <div className="flex gap-8">
                    <div className="flex items-center gap-2">
                      <FaWeight className="text-primary/50 text-xs" />
                      <span className="font-bold">{p.weight} <span className="text-gray-500 text-[10px] uppercase">kg</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaFire className="text-orange-500/50 text-xs" />
                      <span className="font-bold">{p.calories} <span className="text-gray-500 text-[10px] uppercase">kcal</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaRunning className="text-secondary/50 text-xs" />
                      <span className="font-bold">{p.steps} <span className="text-gray-500 text-[10px] uppercase">steps</span></span>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase text-gray-500 tracking-tighter">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
