import { useState } from "react";
import { initialWorkouts, generateWorkout } from "./Workouts.js";
import "./App.css";

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts);

  const addNewWorkout = () => {
    const newWorkout = generateWorkout();
    setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
  };

  const deleteWorkout = (workoutToDelete) => {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.filter((workout) => workout !== workoutToDelete)
    );
  };

  const completeWorkout = (workoutToComplete) => {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((workout) =>
        workout === workoutToComplete ? { ...workout, done: true } : workout
      )
    );
  };

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of{" "}
              <strong>
                {workout.reps}x{workout.exercise}
              </strong>{" "}
              with {workout.rest} seconds rest
            </p>
            {!workout.done && (
              <button onClick={() => completeWorkout(workout)}>Done</button>
            )}
            {workout.done && <p>✅</p>}
            <button onClick={() => deleteWorkout(workout)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
