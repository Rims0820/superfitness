import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { FaBolt, FaBrain, FaTrophy } from "react-icons/fa";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 px-6 text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20">
            <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase italic leading-tight">
              Level Up Your <br />
              <span className="sporty-text-gradient">Fitness Game</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-medium">
              Experience the future of personal training. AI-powered workouts,
              precision nutrition, and a coach that never sleeps.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/signup"
                className="px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
              >
                Start Training Now
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 glass text-white rounded-2xl font-bold text-lg hover:bg-white/10 active:scale-95 transition-all uppercase tracking-widest border border-white/10"
              >
                View Demo
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {[
              {
                icon: <FaBolt className="text-3xl" />,
                title: "Adaptive Training",
                desc: "Workouts that evolve with your progress and intensity.",
              },
              {
                icon: <FaBrain className="text-3xl" />,
                title: "AI Analysis",
                desc: "Real-time feedback and smart adjustment of your sets and reps.",
              },
              {
                icon: <FaTrophy className="text-3xl" />,
                title: "Goal Tracking",
                desc: "Visualise your gains with advanced analytics and milestones.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glass p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-colors group text-center"
              >
                <div className="w-16 h-16 sporty-gradient rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
