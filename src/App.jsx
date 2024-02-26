import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [showDoneOnly, setShowDoneOnly] = useState(false)

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    setWorkouts(prevWorkouts => [...prevWorkouts, newWorkout]);
    //console.log("addNewWorkout:", newWorkout)
  }

  const deleteWorkout = (workoutToDelete) => {
    setWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout !== workoutToDelete));
    //console.log("deleteWorkout:", workout)
  }

  const completeWorkout = (workoutToComplete) => {
    const updatedWorkouts = workouts.map(workout =>
      workout === workoutToComplete ? { ...workout, done: true } : workout
    );
    // Update the workouts state immutably
    setWorkouts(updatedWorkouts);
  }

  const toggleShowDoneOnly = () => {
    setShowDoneOnly(prevShowDoneOnly => !prevShowDoneOnly);
  };

  const filteredWorkouts = showDoneOnly ? workouts.filter(workout => workout.done) : workouts;

  const replaceWorkout = (workoutToReplace) => {
    const newWorkout = generateWorkout();
    const updatedWorkouts = workouts.map(workout =>
      workout === workoutToReplace ? newWorkout : workout
    );
    setWorkouts(updatedWorkouts);
  };

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <label>
        <input type="checkbox" checked={showDoneOnly} onChange={toggleShowDoneOnly} />
        Show Done Only
      </label>
      <ul>
        {filteredWorkouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done &&
              <button onClick={() => completeWorkout(workout)}>Done</button>}
            {workout.done &&
              <p>✅</p>}
            <button onClick={() => deleteWorkout(workout)}>Delete</button>
            <button onClick={() => replaceWorkout(workout)}>Replace</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
