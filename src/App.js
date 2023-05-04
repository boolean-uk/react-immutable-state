import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

//need to import from Components/index.js
import { NewWorkout } from './Components'
import {Mulligan } from './Components'


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

  const completeWorkout = (workout) => {
    console.log("completeWorkout:", workout)
    console.log('workout.done', workout.done)
    const completed = workouts.map(el => {
      if (el === workout) {
        el.done = true
      } 
      return el
    })
    setWorkouts(completed)
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
            {!workout.done && 
              <button onClick={e=>completeWorkout(workout)}>Done</button>}
            {workout.done && 
             <p>✅</p>}
            <button onClick={e=>deleteWorkout(workout)}>Delete</button>
            <Mulligan generateWorkout={generateWorkout} setWorkouts={setWorkouts} workout={workout} workouts={workouts} generateWorkout={generateWorkout}/>
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default App
