import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    console.log("addNewWorkout:", newWorkout)

    setWorkouts([...workouts, newWorkout])
    console.log(workouts)
  }

  const deleteWorkout = (workout) => {
    console.log("deleteWorkout:", workout)

    const filteredWorkout = workouts.filter(item => {

      if (item !== workout) {
        return workout
      }
    })
    setWorkouts(filteredWorkout)
  }

  const completeWorkout = (workout) => {
    // console.log("completeWorkout:", workout)
    const updateWorkout = workouts.map(item => {
      if (item === workout) {
        return {
          ...item,
          done: true
        }
        } else {
            return item
      }
      

    })
    setWorkouts(updateWorkout)
  }

  console.log(workouts)

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
