import Navbar from "../components/Navbar";
import WorkoutCard from "../components/WorkoutCard";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/workouts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setWorkouts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="grid md:grid-cols-2 gap-6 p-10">
        {workouts.map((workout) => (
          <WorkoutCard key={workout._id} workout={workout} />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
