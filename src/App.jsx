import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)

  const addNewWorkout = () => {
    const newWorkout = [...workouts]
    newWorkout.push(generateWorkout())
    setWorkouts(newWorkout)
    console.log("addNewWorkout:", newWorkout)
  }

  const deleteWorkout = (workout) => {
    const workoutsWithoutRemoved =  workouts.filter(function(workouts) {
      return workouts !== workout
    })
    setWorkouts(workoutsWithoutRemoved)
    console.log("deleteWorkout:", workout)
  }

  const completeWorkout = (target) => {
    const updatedWorkouts = workouts.map(function(workout) {
      if (workout === target) {
        return {...workout, done: !target.done}
      }
      return workout
    })
    setWorkouts(updatedWorkouts)
    console.log("completeWorkout:", target)
  }

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
