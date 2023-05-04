import { useState } from "react"
import {initialWorkouts, generateWorkout } from "./Workouts.js"
import "./App.css"
import { NewWorkout, OnlyDone, WorkoutList} from './Components'

function App() {

  const initialHideUnfinished = false
  const [hideUnfinished, setHideUnfinished] = useState(initialHideUnfinished)
  const [workouts, setWorkouts] = useState(initialWorkouts)

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <NewWorkout generateWorkout={generateWorkout} setWorkouts={setWorkouts} workouts={workouts}/>
      <OnlyDone setHideUnfinished={setHideUnfinished}/>
      <WorkoutList workouts={workouts} setWorkouts={setWorkouts} generateWorkout={generateWorkout} hideUnfinished={hideUnfinished}/>
    </div>
  )
}
export default App
