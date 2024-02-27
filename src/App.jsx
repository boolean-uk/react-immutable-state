import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [done, setDone] = useState(false);

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    setWorkouts([...workouts, newWorkout])
    console.log("addNewWorkout:", newWorkout)
  }

  const deleteWorkout = (workout) => {
    setWorkouts( workouts.filter((e) => e !== workout))
    console.log("deleteWorkout:", workout)
  }

  const completeWorkout = (workout) => {
    setWorkouts( workouts.map((e) => 
      e === workout ? {...e, done : !e.done} : e
      ))

    console.log("completeWorkout:", workout)
  }

  const showDoneOnlyToggle = () => {
    setDone(!done)

  }
  
  const changeWorkout = (workout) => {
    const newWorkout = generateWorkout()
    setWorkouts( workouts.map((e) => 
      e === workout ? {...newWorkout} : e
      ))

  }



   return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      {done ?
            <button onClick={showDoneOnlyToggle}> 
              Show all
            </button> :
            <button onClick={showDoneOnlyToggle}> 
            Show done only
            </button>
      }

      <ul>
        {
        done ? 

        workouts.filter(e => e.done).map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done &&
              <button onClick={e=>completeWorkout(workout)}>Done</button>}
            {workout.done &&
              <p>✅</p>}
            <button onClick={e=>deleteWorkout(workout)}>Delete</button>
            <button onClick={e=>changeWorkout(workout)}>changeWorkout</button>
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
            <button onClick={e=>changeWorkout(workout)}>changeWorkout</button>

          </li>
        ))
        }
      </ul>

    </div>
  )
}

export default App
