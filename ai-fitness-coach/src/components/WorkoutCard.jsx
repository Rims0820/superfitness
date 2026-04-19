import { motion } from "framer-motion";
import { FaFire, FaRedo, FaLayerGroup, FaTrophy } from "react-icons/fa";

const WorkoutCard = ({ workout }) => {
  const getDifficultyColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'hard': return 'bg-red-500/20 text-red-400 border-red-500/20';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20';
      default: return 'bg-green-500/20 text-green-400 border-green-500/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="glass p-6 rounded-3xl border border-white/5 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <FaFire className="text-6xl text-primary" />
      </div>

      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold uppercase tracking-tight">{workout.name}</h3>
        <span className={`text-[10px] uppercase font-black px-2 py-1 rounded-md border ${getDifficultyColor(workout.difficulty)}`}>
          {workout.difficulty}
        </span>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-gray-400">
          <FaLayerGroup className="text-primary/60" />
          <span className="font-semibold text-white">{workout.sets}</span>
          <span className="text-xs uppercase tracking-widest font-bold">Sets</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <FaRedo className="text-secondary/60" />
          <span className="font-semibold text-white">{workout.reps}</span>
          <span className="text-xs uppercase tracking-widest font-bold">Reps</span>
        </div>
      </div>

      <button className="w-full py-3 rounded-2xl bg-white/5 hover:bg-primary transition-all font-bold uppercase text-xs tracking-tighter flex items-center justify-center gap-2">
        <FaTrophy /> Log Performance
      </button>
    </motion.div>
  );
};

export default WorkoutCard;