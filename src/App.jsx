import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [showDoneOnly, setShowDoneOnly] = useState(false)

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    setWorkouts([...workouts, newWorkout])
    console.log("addNewWorkout:", newWorkout)
  }

  const deleteWorkout = (workout) => {
    setWorkouts(workouts.filter(w => w !== workout))
    console.log("deleteWorkout:", workout)
  }

  const replaceWorkout = (workout) => {
    setWorkouts(workouts.map((w) => {
      if (w === workout) return generateWorkout()
      return w
    }))
  }

  const completeWorkout = (workout) => {
    workout.done = true
    setWorkouts([...workouts])
    console.log("completeWorkout:", workout)
  }

  const toggleFilter = () =>{
    setShowDoneOnly(!showDoneOnly)
  }

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <p>Show done only <input type="checkbox" checked={showDoneOnly} onClick={() => toggleFilter()}></input></p>
      <ul>
        {workouts.map((workout, index) => (
          (!showDoneOnly || workout.done) &&
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done &&
              <button onClick={e=>completeWorkout(workout)}>Done</button>}
            {workout.done &&
              <p>✅</p>}
            <button onClick={e=>deleteWorkout(workout)}>Delete</button>
            <button onClick={e=>replaceWorkout(workout)}>Replace</button>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default App
