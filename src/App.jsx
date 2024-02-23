import { useState } from "react";
import { initialWorkouts, generateWorkout } from "./Workouts.js";
import "./App.css";

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [workoutDone, setWorkoutDone] = useState(false);

  const addNewWorkout = () => {
    const newWorkout = generateWorkout();
    setWorkouts([...workouts, newWorkout]);
    console.log("addNewWorkout:", newWorkout);
  };

  const deleteWorkout = (workout) => {
    const deletedWorkouts = workouts.filter((w) => {
      return w !== workout;
    });
    setWorkouts(deletedWorkouts); // Remove the array brackets here
    console.log("deleteWorkout:", workout);
  };

  const completeWorkout = (workout) => {
    const updatedWorkouts = workouts.map((w) => {
      if (w === workout) {
        return { ...w, done: true }; // Create a new object with done set to true
      }
      return w; // Return the original workout if it's not the one being completed
    });
    setWorkouts(updatedWorkouts); // Update the state with the modified workouts array
    console.log("completeWorkout:", workout);
  };

  const showOnlyDone = () => {
    const filteredWorkouts = workouts.filter((w) => {
      return w.done === true;
    });
    setWorkouts(filteredWorkouts); // Remove the array brackets here
  };

  const replaceWorkout = (workout) => {
    const updatedWorkouts = workouts.map((w) => {
      if (w === workout) {
        return generateWorkout(); // Replace the workout with a new random workout
      }
      return w;
    });
    setWorkouts(updatedWorkouts);
  };

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <button onClick={showOnlyDone}> Show Only Done Workouts</button>
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
            <button onClick={() => replaceWorkout(workout)}>Replace</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
