import { useState } from "react";
import { initialWorkouts, generateWorkout } from "./Workouts.js";
import "./App.css";

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  // add state for doneWorkouts
  const [showDoneWorkouts, setShowDoneWorkouts] = useState(false);

  const addNewWorkout = () => {
    const newWorkout = generateWorkout();
    console.log("addNewWorkout:", newWorkout);
    const updatedWorkoutsArray = [...workouts, newWorkout];
    setWorkouts(updatedWorkoutsArray);
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

  const randomiseWorkout = (workout) => {
    // Description: randomiseWorkout will update the current/it's own workout with data from generateWorkout()
    // Input: workout
    // Create new Workout object
    const updatedWorkout = generateWorkout();
    // Loop through workouts state to find current workout
    const updatedWorkouts = workouts.map(function (existingWorkout) {
      if (existingWorkout === workout) {
        console.log("randomiseWorkout:", updatedWorkout);
        // If/When found, add updated workout to updatedWorkouts
        return {
          ...existingWorkout,
          exercise: updatedWorkout.exercise,
          reps: updatedWorkout.reps,
          sets: updatedWorkout.sets,
          rest: updatedWorkout.rest,
        };
      }
      // Else reset it to old workout
      return existingWorkout;
    });
    // Change state to updatedWorkouts
    setWorkouts(updatedWorkouts);
  };

  // Create an array of all "done" workouts
  const completeWorkouts = workouts.filter((workout) => workout.done);

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <input
        type="checkbox"
        id="showDone"
        checked={workouts.done}
        onChange={(event) => setShowDoneWorkouts(event.target.checked)}
      ></input>
      <label htmlFor="showDone"> Show only done</label>
      {/* Do a conditional render, if checkmark is not checked render all, if not render all "done" (Created earlier) */}
      {!showDoneWorkouts ? (
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
              <button onClick={() => randomiseWorkout(workout)}>
                Randomise
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {completeWorkouts.map((workout, index) => (
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
              <button onClick={() => randomiseWorkout(workout)}>
                Randomise
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
