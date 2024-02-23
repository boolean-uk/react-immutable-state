import { useState } from "react";
import { initialWorkouts, generateWorkout } from "./Workouts.js";
import "./App.css";

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts);

  const addNewWorkout = () => {
    const newWorkout = generateWorkout();
    const newArrayOfWorkouts = [...workouts, newWorkout];
    setWorkouts(newArrayOfWorkouts);
    console.log("addNewWorkout:", newWorkout);
  };

  const deleteWorkout = (workoutToRemove) => {
    console.log("deleteWorkout:", workoutToRemove);

    const deleteWorkoutFromArray = workouts.filter(function (workout) {
      return workout !== workoutToRemove;
    });
    setWorkouts(deleteWorkoutFromArray);
  };

  const completeWorkout = (workout) => {
    console.log("completeWorkout:", workout);
    const updateWorkoutDoneStatus = { ...workout, done: !workout.done };

    const updateWorkoutArray = workouts.map((w) => {
      if (w === workout) return updateWorkoutDoneStatus;
      return w;
    });

    setWorkouts(updateWorkoutArray);
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
