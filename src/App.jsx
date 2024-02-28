import { useState } from "react";
import { initialWorkouts, generateWorkout } from "./workouts.js";
import "./App.css";

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [showDoneOnly, setShowDoneOnly] = useState(false);

  const addNewWorkout = () => {
    setWorkouts([...workouts, generateWorkout()]);
  };

  const deleteWorkout = (workout) => {
    setWorkouts(workouts.filter((e) => e !== workout));
  };

  const completeWorkout = (workout) => {
    setWorkouts(
      workouts.map((e) => {
        if (e === workout) {
          return { ...e, done: true };
        }
        return e;
      })
    );
    console.log("completeWorkout:", workout);
  };

  const handleCheckbox = (e) => {
    console.log("checkbox handled")
    setShowDoneOnly(e.target.checked);
  };

  const handleReplaceWorkout = (workout) => {
    const newWorkout = generateWorkout();
    setWorkouts(
      workouts.map((e) => {
        if (e === workout) {
          return { ...e, exercise: newWorkout.exercise, reps: newWorkout.reps, sets: newWorkout.sets, rest: newWorkout.rest, done: false}
        }
        return e
      })
    )
  }

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <h3>
        Show Done Workouts Only{" "}
        <input 
            type="checkbox" 
            className="show-done-only"
            onChange={handleCheckbox}>
        </input>
      </h3>
      <ul>
        {workouts
        .filter((workout) => !showDoneOnly || workout.done)
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
            <button onClick={(e) => handleReplaceWorkout(workout)}>Replace</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
