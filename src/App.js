import { useState } from "react";
import { initialWorkouts, generateWorkout } from "./Workouts.js";
import "./App.css";

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [showCompleted, setShowCompleted] = useState(false);

  const addNewWorkout = () => {
    const newWorkout = generateWorkout();
    // Part 1 Adding Workouts
    // console.log("addNewWorkout:", newWorkout);
    setWorkouts([...workouts, newWorkout]);
  };

  const deleteWorkout = (workout) => {
    // Part 2 Removing Workouts
    // console.log("deleteWorkout:", workout);
    const newWorkouts = workouts.filter((workoutItem) => {
      if (workoutItem !== workout) {
        return workoutItem;
      }
    });
    setWorkouts(newWorkouts);
  };

  const completeWorkout = (workout) => {
    // Part 3 Updating Workouts
    // console.log("completeWorkout:", workout);
    const updatedWorkouts = workouts.map((item) => {
      if (item === workout) {
        return {
          ...item,
          done: true,
        };
      } else {
        return item;
      }
    });
    setWorkouts(updatedWorkouts);
  };

  const completedWorkout = workouts.filter((item) => {
    if (item.done === true) {
      return item;
    }
  });

  const filteredWorkout = showCompleted ? completedWorkout : workouts;

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <div>
        <label>
          Show Done Only
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
          />
        </label>
      </div>
      <ul>
        {filteredWorkout.map((workout, index) => (
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
              // <button onClick={completeWorkout}>Done</button>
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
