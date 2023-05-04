import { useState } from "react";
import { initialWorkouts, generateWorkout } from "./Workouts.js";
import "./App.css";

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts);

  const addNewWorkout = () => {
    const newWorkout = generateWorkout();
    setWorkouts([...workouts, newWorkout]);

    console.log("addNewWorkout:", newWorkout);
  };

  const deleteWorkout = (workout) => {
    const newWorkouts = workouts.filter((obj) => {
      if (obj !== workout) {
        return workout;
      }
    });
    setWorkouts(newWorkouts);
    console.log("deleteWorkout:", workout);
  };

  const completeWorkout = (workout) => {
    const newWorkouts = workouts.map((obj) => {
      if (obj === workout) {
        return {
          ...obj,
          done: true,
        };
      } else {
        return obj;
      }
    });
    setWorkouts(newWorkouts);
    console.log("completeWorkout:", workout);
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
              <button onClick={(e) => completeWorkout(workout)}>Done</button>
            )}
            {workout.done && <p>✅</p>}
            <button onClick={(e) => deleteWorkout(workout)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
