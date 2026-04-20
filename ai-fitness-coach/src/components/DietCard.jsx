import { motion } from "framer-motion";
import { FaUtensils, FaFire, FaEgg } from "react-icons/fa";

const DietCard = ({ meal }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="glass p-6 rounded-3xl border border-white/5 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <FaUtensils className="text-6xl text-primary" />
      </div>

      <h2 className="text-xl font-bold uppercase tracking-tight mb-4 text-primary">
        {meal.name}
      </h2>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gray-400">
          <FaFire className="text-orange-500/60" />
          <span className="font-semibold text-white">{meal.calories}</span>
          <span className="text-xs uppercase tracking-widest font-bold">Calories</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <FaEgg className="text-secondary/60" />
          <span className="font-semibold text-white">{meal.protein}g</span>
          <span className="text-xs uppercase tracking-widest font-bold">Protein</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <FaUtensils className="text-accent/60" />
          <span className="font-semibold text-white">{meal.carbs}g</span>
          <span className="text-xs uppercase tracking-widest font-bold">Carbs</span>
        </div>
      </div>
    </motion.div>
  );
};

export default DietCard;
