import { useState } from "react";
import { initialWorkouts, generateWorkout } from "./Workouts.js";
import "./App.css";

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [isFiltered, setIsFiltered] = useState(false);

  const addNewWorkout = () => {
    const newWorkout = generateWorkout();
    console.log("addNewWorkout:", newWorkout);
    setWorkouts([...workouts, newWorkout]);
  };

  const deleteWorkout = (workout) => {
    console.log("deleteWorkout:", workout);
    const newWorkouts = workouts.filter((w) => w !== workout);
    setWorkouts(newWorkouts);
  };

  const completeWorkout = (workout) => {
    console.log("completeWorkout:", workout);
    const updatedWorkouts = workouts.map((w) =>
      w === workout ? { ...w, done: !w.done } : w
    );
    setWorkouts(updatedWorkouts);
  };

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <label htmlFor="doneFilter">Show Done Only</label>
      <input
        type="checkbox"
        name="doneFilter"
        onClick={() => setIsFiltered(!isFiltered)}
      />
      <ul>
        {workouts
          .filter((w) => {
            if (isFiltered) {
              return w.done === true;
            } else {
              return w;
            }
          })
          .map((workout, index) => (
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
