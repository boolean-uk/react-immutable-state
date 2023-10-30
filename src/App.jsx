import { useState } from "react";
import { initialWorkouts, generateWorkout } from "./Workouts.js";
import "./App.css";

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [showDoneOnly, setShowDoneOnly] = useState(false); // State for the checkbox

  const addNewWorkout = () => {
    const newWorkout = generateWorkout();
    // part one
    // Create a new array with the existing workouts and the new workout
    const updatedWorkouts = [...workouts, newWorkout];

    // Update the state with the new array
    setWorkouts(updatedWorkouts);
  };
   // part two
  const deleteWorkout = (workoutToDelete) => {
    // Create a new array that filters out the workout to be deleted
    const updatedWorkouts = workouts.filter(workout => workout !== workoutToDelete);
  
    // Update the state with the new array
    setWorkouts(updatedWorkouts);
  };

  //part three

  const completeWorkout = (workoutToComplete) => {
    // Create a new array with the updated workouts
    const updatedWorkouts = workouts.map(workout => {
      if (workout === workoutToComplete) {
        // Clone the workout object and set 'done' to true
        return { ...workout, done: true };
      }
      return workout;
    });
  
    // Update the state with the new array
    setWorkouts(updatedWorkouts);
  };

  //extenstion 1
  const toggleShowDoneOnly = () => {
    setShowDoneOnly(!showDoneOnly);
  };

  //extenstion 2
  const replaceWorkout = (workoutToReplace) => {
    const newWorkout = generateWorkout(); // Generate a new random workout
    const updatedWorkouts = workouts.map((workout) =>
      workout === workoutToReplace ? newWorkout : workout
    );
    setWorkouts(updatedWorkouts);
  };

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <label>
        <input
          type="checkbox"
          checked={showDoneOnly}
          onChange={toggleShowDoneOnly}
        />
        Show Done Only
      </label>
      <ul>
      {workouts.map((workout, index) => {
          if (showDoneOnly && !workout.done) {
            return null;
          }

          return (
            <li key={index}>
              <p>
                {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
              </p>
              {!workout.done && (
                <button onClick={() => completeWorkout(workout)}>Done</button>
              )}
              {workout.done && <p>✅</p>}

              <button onClick={() => replaceWorkout(workout)}>Replace</button>

              <button onClick={() => deleteWorkout(workout)}>Delete</button>
            </li>
          );
        })} 
        </ul>
    </div>
  );
      }


export default App;
