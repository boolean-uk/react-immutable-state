import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [showDoneOnly, setShowDoneOnly] = useState(false)

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    console.log("addNewWorkout:", newWorkout)
    setWorkouts([...workouts, newWorkout]);
  }

  const deleteWorkout = (workout) => {
    console.log("deleteWorkout:", workout)
    setWorkouts(workouts.filter((w) => w !== workout));
  }

  const completeWorkout = (workout) => {
    console.log("completeWorkout:", workout)
    const updatedWorkouts = workouts.map((w) => {
      if (w === workout) {
        return { ...w, done: true };
      }
      return w;
    });
    setWorkouts(updatedWorkouts);
  };

  const replaceWorkout = (workout) => {
    const newWorkout = generateWorkout()
    const updatedWorkouts = workouts.map((w) => {
      if (w === workout) {
        return newWorkout
      }
      return w // refers to current map function parameter (current parameter) //
    })
    setWorkouts(updatedWorkouts)
  }

  const handleCheckboxChange = () => {
    setShowDoneOnly(!showDoneOnly)
  }

  const filteredWorkouts = showDoneOnly ? workouts.filter((workout) => workout.done) : workouts

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <label>
  <input type="checkbox" checked={showDoneOnly} onChange={handleCheckboxChange} />
  Show Done Only
</label>
      <ul>
      {filteredWorkouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done && 
              <button onClick={e=>completeWorkout(workout)}>Done</button>}
            {workout.done && 
             <p>✅</p>}
            <button onClick={e=>deleteWorkout(workout)}>Delete</button>
            <button onClick={() => replaceWorkout(workout)}>Replace</button>
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default App
