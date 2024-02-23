import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [showDone, setShowingDone] = useState(false)
  const [workoutsDone, setWorkoutsDone] = useState(initialWorkouts)

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    setWorkouts([...workouts, newWorkout])
    console.log("addNewWorkout:", newWorkout)
  }

  const deleteWorkout = (workout) => {
    const newWorkoutArr = workouts.filter((work) => work !== workout)
    setWorkouts(newWorkoutArr)
    console.log("deleteWorkout:", workout)
  }

  const completeWorkout = (workout) => {
    const updatedWorkout = {...workout, done: true}
    const newWorkoutArr = workouts.map((work) => {
      if (work === workout) return updatedWorkout
      return work
    })
    setWorkouts(newWorkoutArr)
    console.log("completeWorkout:", workout)
  }

  const ToggleDoneShowing = (event) =>
  {
    if (event.target.checked)
    {
      const newWorkoutArr = workouts.filter((work) => work.done === event.target.checked)
      setWorkoutsDone(newWorkoutArr)
      setShowingDone(true)
    }
    else
    {
      setShowingDone(false)
    }
  }

  const newWorkout = (workout) => {
    const newWorkoutArr = workouts.map((work) => {
      if (work === workout) return generateWorkout()
      return work
    })

    setWorkouts(newWorkoutArr)
  }
  
  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <div>
          <input type="checkbox" onChange={(event) => ToggleDoneShowing(event)}></input>
          <label>Show Done Only</label>
        </div>
      <ul>
        {/* When "Show Done Only" is not checked */}
        {!showDone && workouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done &&
              <button onClick={e=>completeWorkout(workout)}>Done</button>}
            {workout.done &&
              <p>✅</p>}
            <button onClick={e=>deleteWorkout(workout)}>Delete</button>
            <button onClick={e=>newWorkout(workout)}>New workout</button>
          </li>
        ))}

        {/* When "Show Done Only" is checked */}
        {showDone && workoutsDone.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
            </p>
            {!workout.done &&
              <button onClick={e=>completeWorkout(workout)}>Done</button>}
            {workout.done &&
              <p>✅</p>}
            <button onClick={e=>deleteWorkout(workout)}>Delete</button>
            <button onClick={e=>newWorkout(workout)}>New workout</button>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default App
