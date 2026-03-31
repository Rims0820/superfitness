const WorkoutCard = ({ workout }) => {
  return (
    <div className="bg-white shadow-lg p-5 rounded-xl">
      <h2 className="text-xl font-bold">{workout.name}</h2>
      <p>Reps: {workout.reps}</p>
      <p>Sets: {workout.sets}</p>
      <p>Difficulty: {workout.difficulty}</p>
    </div>
  );
};

export default WorkoutCard;