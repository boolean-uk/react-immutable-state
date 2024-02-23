import { useState } from "react";
import { initialWorkouts, generateWorkout } from "./Workouts.js";
import "./App.css";

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts);

  const addNewWorkout = () => {
    const newWorkout = generateWorkout();
    setWorkouts([...workouts, newWorkout]);
  };

  const deleteWorkout = (workout) => {
    const newWorkOutArray = [];

    workouts.filter((w) => {
      if (!(w === workout)) {
        newWorkOutArray.push(w);
      }
    });
    setWorkouts(newWorkOutArray);
  };

  const completeWorkout = (workout) => {
    console.log("completeWorkout:", workout);

    const newWorkOutArray = workouts.map((w) => {
      if (w === workout) {
        return { ...w, done: true };
      } else {
        return w;
      }
    });
    setWorkouts(newWorkOutArray);
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
