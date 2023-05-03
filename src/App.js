import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [savedWorkouts, setSavedWorkouts] = useState([])

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    const newWorkoutList = workouts.map(item => item)
    newWorkoutList.push(newWorkout)
    setWorkouts(newWorkoutList)
  }

  const deleteWorkout = (workout) => {
    const newWorkoutList = workouts.filter(item => item !== workout)
    setWorkouts(newWorkoutList)
    console.log(newWorkoutList)
    console.log("deleteWorkout:", workout)
  }

  const completeWorkout = (workout) => {
    console.log("completeWorkout:", workout)
    const newWorkoutList = workouts.map(item => {
      if (item === workout) {
        return {
          ...item, done: true
        }
      } else {
        return item
      } 
    })
    setWorkouts(newWorkoutList)
  }

  const toggleDoneView = (event) => {
    console.log(event.target.checked)
    if (event.target.checked) {
      setSavedWorkouts(workouts)
      const newWorkoutList = workouts.filter(item => item.done === event.target.checked)
      setWorkouts(newWorkoutList)
    } else {
      setWorkouts(savedWorkouts)
    }  
  }

  const randomWorkout = (workout) => {
    const newWorkoutList = workouts.map(item => {
      if (item === workout) {
        let newWorkout = generateWorkout()
        return newWorkout
      } else {
        return item
      }
    })
    setWorkouts(newWorkoutList)
  }

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <label name='showDone'>Show Only Done</label>
      <input name='showDone' type='checkbox' onChange={toggleDoneView}/>
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
            <button onClick={e=>randomWorkout(workout)}>Randomize</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
