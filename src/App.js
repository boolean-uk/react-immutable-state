import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    setWorkouts([...workouts, newWorkout])
    console.log("addNewWorkout:", newWorkout)
  }

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
        return {
          ...el,
          exercise: 'completed it mate',
          done: true
        }
      } else {
        return el
      }
    })
    setWorkouts(completed)
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
