import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [done, setDone] = useState(false)

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    setWorkouts([... workouts, newWorkout]);
  }
  const replaceWorkout = (workout) => {
    const newWorkout = generateWorkout()
      setWorkouts(workouts.map((e) => e === workout ? {...newWorkout} : e))
  }

  const deleteWorkout = (workout) => {
    setWorkouts(workouts.filter((e) => e !== workout))
  }

  const completeWorkout = (workout) => {
    setWorkouts(workouts.map((e) => e === workout ? 
    {...e, done : !e.done} : e))
    console.log("completeWorkout:", workout)
  }

  const doneWorkouts = () => {
    setDone(!done)
  }

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      {done ?
            <button onClick={doneWorkouts}> 
              Show all workouts
            </button> :
            <button onClick={doneWorkouts}> 
              Show Done Only
            </button>
      }
      <ul>
        {done ?
        workouts.filter((e) => e.done).map((workout, index) => (
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
        )) 
        : 
        workouts.map((workout, index) => (
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
        ))
      }
      </ul>

    </div>
  )
}

export default App
