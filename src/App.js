import { useState } from "react"
import {initialWorkouts, generateWorkout } from "./Workouts.js"
import "./App.css"
import { NewWorkout, Mulligan, CompleteWorkout, DeleteWorkout, OnlyDone} from './Components'

function App() {

  const initialHideUnfinished = false
  const [hideUnfinished, setHideUnfinished] = useState(initialHideUnfinished)
  const [workouts, setWorkouts] = useState(initialWorkouts)

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <NewWorkout generateWorkout={generateWorkout} setWorkouts={setWorkouts} workouts={workouts}/>
      <OnlyDone setHideUnfinished={setHideUnfinished}/>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index} style={hideUnfinished ? (workout.done ? {} : {display:'none'}) : {}}>
            {console.log(workouts)}
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            <CompleteWorkout workouts={workouts} workout={workout} setWorkouts={setWorkouts} />
            <DeleteWorkout workout={workout} workouts={workouts} setWorkouts={setWorkouts}/>
            <Mulligan generateWorkout={generateWorkout} setWorkouts={setWorkouts} workout={workout} workouts={workouts} />
          </li>
        ))}
      </ul>
      
    </div>
  )
}
export default App
