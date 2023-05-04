import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

//need to import from Components/index.js
import { NewWorkout, Mulligan, CompleteWorkout } from './Components'

function App() {

  const initialHideUnfinished = false
  const [hideUnfinished, setHideUnfinished] = useState(initialHideUnfinished)

  const [workouts, setWorkouts] = useState(initialWorkouts)



  const deleteWorkout = (workout) => {
    const newState = workouts.filter((el) => {
      if (el !== workout) {
        return workout
      } else {
        return null
      }
    })

    setWorkouts(newState)
    
    console.log("deleteWorkout:", workout)
  }

  const toggleDone = (event) => {
    const newState = event.target.checked
    setHideUnfinished(newState)
  }

    return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <NewWorkout generateWorkout={generateWorkout} setWorkouts={setWorkouts} workouts={workouts}/>
      <form onChange={toggleDone}>
        <label>Only show finished workouts</label>
        <input type='checkbox'></input>
      </form>
      <ul>

        {workouts.map((workout, index) => (
          <li key={index} style={hideUnfinished ? (workout.done ? {} : {display:'none'}) : {}}>
            {console.log(workouts)}
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            <CompleteWorkout workouts={workouts} workout={workout} setWorkouts={setWorkouts} />
            <button onClick={e=>deleteWorkout(workout)}>Delete</button>
            <Mulligan generateWorkout={generateWorkout} setWorkouts={setWorkouts} workout={workout} workouts={workouts} />
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default App
