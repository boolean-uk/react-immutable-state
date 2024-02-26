import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [showUncompleted, setShowUncompleted] = useState(true);

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    setWorkouts([...workouts, newWorkout])
  }

  const deleteWorkout = (workout) => {
    console.log("deleteWorkout:", workout)
    setWorkouts(workouts.filter(elm => elm != workout))
  }

  const completeWorkout = (workout) => {
    let alteredWorkouts = [...workouts];
    alteredWorkouts.forEach(elm => {if(elm == workout){elm.done = true}} )
    setWorkouts(alteredWorkouts)
  }

  const replaceWorkout = (workout) => {
    let alteredWorkouts = [...workouts];
    const index = alteredWorkouts.findIndex(elm => elm == workout)
    alteredWorkouts[index] = generateWorkout()
    setWorkouts(alteredWorkouts)
  }

  const alterShow = () => {
    setShowUncompleted(!showUncompleted)
  }

  const relevantWorkouts = () => {
    return workouts.filter(elm => showUncompleted || elm.done)
  }

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      Show only completed: <input type="checkbox" id="my-toggle" onClick={e=>alterShow()}/>
      <ul>
        {relevantWorkouts().map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done &&
              <button onClick={e=>completeWorkout(workout)}>Done</button>}
            {workout.done &&
              <button onClick={e => replaceWorkout(workout)}>✅ Replace?</button>}
            <button onClick={e=>deleteWorkout(workout)}>Delete</button>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default App
