import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    const newWorkoutList = workouts.map(item => item)
    newWorkoutList.push(newWorkout)
    setWorkouts(newWorkoutList)
  }

  const deleteWorkout = (workout) => {
    const newWorkoutList = workouts.filter(item => item !== workout)
    setWorkouts(newWorkoutList)
    console.log(newWorkoutList)
    console.log("deleteWorkout:", workout)
  }

  const completeWorkout = (workout) => {
    console.log("completeWorkout:", workout)
  }

  // Implement the addNewWorkout function to add the newWorkout object to the workouts state in an immutable way.

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done && 
              <button onClick={e=>completeWorkout(workout)}>Done</button>}
            {workout.done && 
             <p>✅</p>}
            <button onClick={e=>deleteWorkout(workout)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
