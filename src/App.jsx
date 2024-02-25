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
    const newWorkouts = workouts.filter(
      (workoutRemove) =>
        workoutRemove.exercise === workout.exercise &&
        workoutRemove.reps === workout.reps &&
        workoutRemove.rest === workout.rest &&
        workoutRemove.sets === workout.sets
    );
    setWorkouts(newWorkouts);
  };

  const completeWorkout = (workout) => {
    console.log("completeWorkout:", workout);
    const updatedWorkout = { ...workout, done: true };
    const newWorkouts = workouts.map((notDoneWorkout) => {
      if (
        notDoneWorkout.exercise === workout.exercise &&
        notDoneWorkout.reps === workout.reps &&
        notDoneWorkout.rest === workout.rest &&
        notDoneWorkout.sets === workout.sets
      )
        return updatedWorkout;
      return notDoneWorkout;
    });
    setWorkouts(newWorkouts);
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
