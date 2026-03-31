import Navbar from "../components/Navbar";
import DietCard from "../components/DietCard";
import { useEffect, useState } from "react";

const Diet = () => {
  const [diets, setDiets] = useState([]);

  useEffect(() => {
    const fetchDiets = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/diet", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setDiets(data);
      } catch (error) {
        console.log(error);
      }
    };
    const DietCard = ({ meal }) => {
  return (
    <div className="bg-white shadow-lg p-5 rounded-xl">
      <h2 className="text-xl font-bold">{meal.name}</h2>
      <p>Calories: {meal.calories}</p>
      <p>Protein: {meal.protein}g</p>
      <p>Carbs: {meal.carbs}g</p>
    </div>
  );
};

    fetchDiets();
  }, []);

  return (
    <>
      <Navbar />
      <div className="grid md:grid-cols-2 gap-6 p-10">
        {diets.map((meal) => (
          <DietCard key={meal._id} meal={meal} />
        ))}
      </div>
    </>
  );
};

export default Diet;
