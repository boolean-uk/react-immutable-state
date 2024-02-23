import { useState } from "react";
import { initialWorkouts, generateWorkout } from "./Workouts.js";
import "./App.css";

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts);

  const addNewWorkout = () => {
    const newWorkout = generateWorkout();
    console.log("addNewWorkout:", newWorkout);
    const addedWorkout = [...workouts, newWorkout];
    setWorkouts(addedWorkout);
  };

  const deleteWorkout = (workout) => {
    console.log("deleteWorkout:", workout);
    const updatedWorkouts = workouts.filter(function (workouts) {
      return workouts !== workout;
    });
    setWorkouts(updatedWorkouts);
  };

  const completeWorkout = (workout) => {
    console.log("completeWorkout:", workout);
    const updatedWorkouts = workouts.map(function (workouts) {
      if (workouts === workout) {
        return { ...workouts, done: true };
      }
      return workouts;
    });
    setWorkouts(updatedWorkouts);
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
