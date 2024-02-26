import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);
  };

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    setWorkouts([...workouts, newWorkout])
  }

  const deleteWorkout = target => { setWorkouts(workouts.filter(workout => workout !== target)) }

  const completeWorkout = (workout) => {
    const updatedWorkouts = workouts.map(todo =>
      todo === workout ? { ...todo, done: !todo.done } : todo
      )
    setWorkouts(updatedWorkouts)
  }
  const replaceWorkout = (workout) => {
    const updatedWorkouts = workouts.map(todo =>
      todo === workout ? generateWorkout() : todo
      )
    setWorkouts(updatedWorkouts)
  }
   // Filter workouts based on the isChecked value
   const filteredWorkouts = isChecked
   ? workouts.filter((workout) => workout.done)
   : workouts;

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      {' Show only completed'}
      <ul>
        {filteredWorkouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done && (
              <button onClick={(e) => completeWorkout(workout)}>Done</button>
            )}
            {workout.done && <p>✅</p>}
            <button onClick={(e) => deleteWorkout(workout)}>Delete</button>
            <button onClick={(e) => replaceWorkout(workout)}>Replace</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
